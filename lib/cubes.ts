// Cube and Bonus Potential option tables, ported from Nexon's official
// probability disclosure (one source page per equipment part).
//
// cubes.json interns option names into a shared string table and stores
// each line as [optionIndex, value, probability%] to keep the payload
// small. `value` stays a string because the source mixes units — flat
// stats ("420") and percentages ("2.70%") appear in the same column.

import cubesJson from "./data/cubes.json";

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
  const table = kind === "bonus" ? doc.parts[part]?.bonus : doc.parts[part]?.potential;
  const rows = table?.[rank]?.[pool] ?? [];
  return rows.map(([index, value, prob]) => ({
    option: doc.options[index],
    value,
    prob,
  }));
}

/** Stable id for a line across pools, so picks survive a pool switch. */
export const lineKey = (line: CubeLine) => `${line.option}@@${line.value}`;

export function selectedChance(lines: CubeLine[], picked: Set<string>): number {
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

/** Cubes needed for a cumulative `target`% shot at a `chance`% per cube. */
export function cubesFor(chance: number, target: number): number | null {
  const p = chance / 100;
  if (p <= 0) return null;
  if (p >= 1) return 1;
  return Math.ceil(Math.log(1 - target / 100) / Math.log(1 - p));
}
