// Cube and Bonus Potential option tables, ported from Nexon's official
// probability disclosure (one source page per equipment part).
//
// cubes.json interns option names into a shared string table and stores
// each line as [optionIndex, value, probability%] to keep the payload
// small. `value` stays a string because the source mixes units — flat
// stats ("420") and percentages ("2.70%") appear in the same column.

import cubesJson from "./data/cubes.json";
import { requirementChance } from "./probability";

export type Rank = "Rare" | "Epic" | "Unique" | "Legendary";
/** First potential line vs the second/third lines — different option pools. */
export type Pool = "first" | "second";
/** Regular potential vs bonus potential — separate tables and cubes. */
export type CubeKind = "potential" | "bonus";

type RawLine = [number, string, number];
type RawPools = Partial<Record<Rank, Partial<Record<Pool, RawLine[]>>>>;
type RawPart = { pageId: number; potential: RawPools; bonus?: RawPools };
type RawDoc = {
  source: string;
  sourceLabel: string;
  ranks: Rank[];
  rankUp: Record<CubeKind, Record<string, number>>;
  notes: string[];
  options: string[];
  parts: Record<string, RawPart>;
};

const doc = cubesJson as unknown as RawDoc;

export const RANKS = doc.ranks;
export const CUBE_PARTS = Object.keys(doc.parts);
export const CUBE_SOURCE_LABEL = doc.sourceLabel;
export const CUBE_NOTES = doc.notes;
export const RANK_UP = doc.rankUp;

/** Source page for a part, so the UI can cite the exact disclosure. */
export function sourceUrl(part: string): string {
  const id = doc.parts[part]?.pageId;
  return `https://m.nexon.com/probability/${id}?language=en`;
}

/** Bonus potential does not exist on Pendant, Ring or Pocket. */
export function hasBonus(part: string): boolean {
  return Boolean(doc.parts[part]?.bonus);
}

export interface CubeLine {
  option: string;
  value: string;
  prob: number;
}

export function getLines(
  part: string,
  kind: CubeKind,
  rank: Rank,
  pool: Pool,
): CubeLine[] {
  const table =
    kind === "bonus" ? doc.parts[part]?.bonus : doc.parts[part]?.potential;
  const rows = table?.[rank]?.[pool] ?? [];
  return rows.map(([index, value, prob]) => ({
    option: doc.options[index],
    value,
    prob,
  }));
}

/** Stable id for a line across pools, so picks survive a pool switch. */
export const lineKey = (line: CubeLine) => `${line.option}@@${line.value}`;

/**
 * The player's selection: line key → how many lines of it they want.
 *
 * A count above 1 means the same line has to appear that many times on the
 * item. "Any" mode ignores the counts; only "all" mode reads them.
 */
export type CubePicks = ReadonlyMap<string, number>;

export function selectedChance(lines: CubeLine[], picked: CubePicks): number {
  return lines.reduce(
    (sum, line) => (picked.has(lineKey(line)) ? sum + line.prob : sum),
    0,
  );
}

/**
 * Chance a single cube leaves at least one wanted line on the item.
 *
 * Line 1 draws from the `first` pool and lines 2-3 from the `second` pool,
 * so the miss chances multiply: 1 − (1−q1)(1−q2)^(lines−1). Nexon does not
 * state whether the lines are drawn independently; this assumes they are.
 */
export function cubeChance(
  firstChance: number,
  secondChance: number,
  lines: number,
): number {
  const clamp = (n: number) => Math.min(Math.max(n, 0), 100) / 100;
  const q1 = clamp(firstChance);
  const q2 = clamp(secondChance);
  const miss = (1 - q1) * Math.pow(1 - q2, Math.max(0, lines - 1));
  return (1 - miss) * 100;
}

/** One selected line, with its hit rate in each pool. */
export interface CubeGroup {
  key: string;
  option: string;
  value: string;
  /** % chance the 1st line rolls exactly this line. */
  first: number;
  /** % chance a 2nd/3rd line does. */
  second: number;
  /** How many lines of it the player asked for. */
  need: number;
}

/**
 * The selection as individual requirements, for the "all" reading.
 *
 * Each selected line stands on its own: picking two values of the same stat
 * asks for both of them on the item, not either. An item can carry the same
 * attribute on two lines, so that is a real target rather than a dead one —
 * and a pick counted twice asks for that one line on two of them.
 *
 * A line is keyed by option+value, so the same line appearing in both pools
 * is one requirement that either slot can satisfy.
 */
export function selectedGroups(
  firstLines: CubeLine[],
  secondLines: CubeLine[],
  picked: CubePicks,
): CubeGroup[] {
  const groups = new Map<string, CubeGroup>();
  const add = (lines: CubeLine[], pool: Pool) => {
    for (const line of lines) {
      const key = lineKey(line);
      const need = picked.get(key);
      if (!need) continue;
      let group = groups.get(key);
      if (!group) {
        group = {
          key,
          option: line.option,
          value: line.value,
          first: 0,
          second: 0,
          need,
        };
        groups.set(key, group);
      }
      group[pool] += line.prob;
    }
  };
  add(firstLines, "first");
  add(secondLines, "second");
  return [...groups.values()];
}

/**
 * Chance a single cube leaves *every* wanted line on the item at once.
 *
 * The 1st line draws from the `first` pool and lines 2-3 from the `second`
 * one, so each requirement gets a per-slot probability vector and the slots
 * are assumed independent, exactly as in `cubeChance`. Wanting more lines
 * than the item has is impossible, and comes back as 0.
 */
export function cubeAllChance(groups: CubeGroup[], lines: number): number {
  const slots = Math.max(0, lines);
  if (slots === 0) return 0;
  const clamp = (n: number) => Math.min(Math.max(n, 0), 100) / 100;
  return (
    requirementChance(
      groups.map((g) => ({
        probs: [
          clamp(g.first),
          ...Array<number>(slots - 1).fill(clamp(g.second)),
        ],
        need: g.need,
      })),
    ) * 100
  );
}

/**
 * Chance at least `need` of the item's lines are drawn from the selection.
 *
 * The "group" reading: "any" asks for one line out of the selection and "all"
 * for a named set of them at once, but neither says "three lines of attack,
 * whichever ones" — the question a player actually asks about a weapon. Here
 * the selection is one group, the individual values stop mattering, and only
 * how many lines fell inside it does.
 *
 * The group's pooled chance is what each slot draws against — `firstChance`
 * for line 1, `secondChance` for lines 2-3, the same split and the same
 * independence assumption as `cubeChance`.
 *
 * That is one requirement wanting `need` copies of itself: the walk in
 * `requirementChance` advances one slot at a time and lets draws past the cap
 * pass through, which is exactly "at least `need` of the slots landed in the
 * group". `need` is clamped to the lines available, so this never reports the
 * impossible-by-construction 0% that "all" mode uses to flag an overfull pick.
 */
export function cubeGroupChance(
  firstChance: number,
  secondChance: number,
  lines: number,
  need: number,
): number {
  const slots = Math.max(0, lines);
  if (slots === 0) return 0;
  const clamp = (n: number) => Math.min(Math.max(n, 0), 100) / 100;
  return (
    requirementChance([
      {
        probs: [
          clamp(firstChance),
          ...Array<number>(slots - 1).fill(clamp(secondChance)),
        ],
        need: Math.min(Math.max(need, 1), slots),
      },
    ]) * 100
  );
}

/** Cubes needed for a cumulative `target`% shot at a `chance`% per cube. */
export function cubesFor(chance: number, target: number): number | null {
  const p = chance / 100;
  if (p <= 0) return null;
  if (p >= 1) return 1;
  return Math.ceil(Math.log(1 - target / 100) / Math.log(1 - p));
}
