// Roll simulation for the cube and flame tables.
//
// The probability tables answer "how likely is this?"; this answers "what
// would actually have happened?" — draw real lines from the same pools, so
// a player can watch the variance instead of reading a percentage.
//
// Nexon rounds every published entry to two decimals, so a pool never totals
// exactly 100%. Sampling normalises by the pool's own total rather than
// assuming 100 — otherwise the rounding drift would leave a dead zone (or an
// unreachable draw) at the top of the range.

import {
  getLines,
  lineKey,
  type CubeKind,
  type CubeLine,
  type CubePicks,
  type Pool,
  type Rank,
} from "./cubes";
import {
  getRolls,
  rollKey,
  type FlamePicks,
  type FlameRoll,
  type Rarity,
} from "./flames";
import type { MatchMode } from "./probability";

/**
 * Whether the slots that matched satisfy the player's target.
 *
 * In "any" mode one match is enough. In "all" mode every selected line has to
 * be present as many times as it was picked — two slots can carry the same
 * attribute, so both "two different stats" and "this one stat twice" are
 * reachable targets rather than contradictions.
 */
function isHit(
  mode: MatchMode,
  matched: string[],
  required: ReadonlyMap<string, number>,
): boolean {
  if (mode === "any") return matched.length > 0;
  if (required.size === 0) return false;
  const seen = new Map<string, number>();
  for (const key of matched) seen.set(key, (seen.get(key) ?? 0) + 1);
  for (const [key, need] of required) if ((seen.get(key) ?? 0) < need) return false;
  return true;
}

/** Injectable so a caller can seed a deterministic run; defaults to Math.random. */
export type Rng = () => number;

/** A pool flattened into cumulative weights, so one draw is a binary search. */
interface Deck<T> {
  items: T[];
  /** cumulative[i] = summed probability through items[i]. */
  cumulative: number[];
  total: number;
}

function buildDeck<T>(items: T[], weight: (item: T) => number): Deck<T> {
  const cumulative: number[] = [];
  let total = 0;
  for (const item of items) {
    total += weight(item);
    cumulative.push(total);
  }
  return { items, cumulative, total };
}

function draw<T>(deck: Deck<T>, rng: Rng): T | null {
  if (deck.total <= 0) return null;
  const target = rng() * deck.total;
  let lo = 0;
  let hi = deck.cumulative.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (deck.cumulative[mid] <= target) lo = mid + 1;
    else hi = mid;
  }
  return deck.items[lo];
}

/* ------------------------------------------------------------------ cubes */

export interface CubeRoll {
  /** Lines the cube produced, in slot order — index 0 is the 1st line. */
  lines: CubeLine[];
  /** Whether any line matched the player's selection. */
  hit: boolean;
  /** Slot indexes that matched, for highlighting the winning line(s). */
  hitSlots: number[];
}

export interface CubeRoller {
  roll(rng?: Rng): CubeRoll;
  /** False when the tables are empty for this part/rank — nothing to draw. */
  ready: boolean;
}

/**
 * Prepares a cube for repeated rolling.
 *
 * The decks are built once because a bulk run draws tens of thousands of
 * times, and `getLines` rebuilds its array on every call.
 *
 * Line 1 draws from the `first` pool and lines 2-3 from the `second` pool,
 * matching `cubeChance` in lib/cubes.ts. Like that function, this assumes
 * the lines are drawn independently — Nexon does not disclose whether one
 * line can repeat another, so a roll here can produce duplicates.
 *
 * `mode` decides what counts as a hit: any wanted line, or every wanted
 * stat on the item at once.
 */
export function cubeRoller(
  part: string,
  kind: CubeKind,
  rank: Rank,
  lineCount: number,
  picked: CubePicks,
  mode: MatchMode = "any",
): CubeRoller {
  const deckFor = (pool: Pool) =>
    buildDeck(getLines(part, kind, rank, pool), (l) => l.prob);
  const decks: Record<Pool, Deck<CubeLine>> = {
    first: deckFor("first"),
    second: deckFor("second"),
  };
  const slots = Math.min(Math.max(lineCount, 1), 3);

  return {
    ready: decks.first.total > 0,
    roll(rng: Rng = Math.random): CubeRoll {
      const lines: CubeLine[] = [];
      const hitSlots: number[] = [];
      const matched: string[] = [];
      for (let slot = 0; slot < slots; slot++) {
        const line = draw(decks[slot === 0 ? "first" : "second"], rng);
        if (!line) break;
        const key = lineKey(line);
        if (picked.has(key)) {
          hitSlots.push(lines.length);
          matched.push(key);
        }
        lines.push(line);
      }
      return { lines, hit: isHit(mode, matched, picked), hitSlots };
    },
  };
}

/* ----------------------------------------------------------------- flames */

export interface FlameRollResult {
  /** The one or two options the flame produced. */
  options: FlameRoll[];
  hit: boolean;
  /** Indexes into `options` that matched the selection. */
  hitSlots: number[];
}

export interface FlameRoller {
  roll(rng?: Rng): FlameRollResult;
  ready: boolean;
}

/**
 * Prepares a flame for repeated rolling.
 *
 * A flame rolls one option, or two with probability `twoOptionPct` (100 for
 * an Eternal Rebirth Flame). As in `atLeastOneChance`, the second option is
 * assumed to be an independent draw from the same pool, so it can repeat the
 * first — Nexon does not disclose otherwise.
 *
 * `mode` decides what counts as a hit: any wanted option, or every wanted
 * option on the same flame.
 */
export function flameRoller(
  slot: string,
  rarity: Rarity,
  twoOptionPct: number,
  picked: FlamePicks,
  mode: MatchMode = "any",
): FlameRoller {
  const deck = buildDeck(getRolls(slot, rarity), (r) => r.prob);
  const twoChance = Math.min(Math.max(twoOptionPct, 0), 100) / 100;

  return {
    ready: deck.total > 0,
    roll(rng: Rng = Math.random): FlameRollResult {
      const count = rng() < twoChance ? 2 : 1;
      const options: FlameRoll[] = [];
      const hitSlots: number[] = [];
      const matched: string[] = [];
      for (let i = 0; i < count; i++) {
        const option = draw(deck, rng);
        if (!option) break;
        const key = rollKey(option.option, option.grade);
        if (picked.has(key)) {
          hitSlots.push(options.length);
          matched.push(key);
        }
        options.push(option);
      }
      return { options, hit: isHit(mode, matched, picked), hitSlots };
    },
  };
}

/* ------------------------------------------------------------- bulk runs */

export interface RunResult<T> {
  /** Rolls actually spent. */
  attempts: number;
  hits: number;
  /** The first winning roll, for showing what finally landed. */
  first: T | null;
  /** Which attempt the first hit came on (1-based), or null if none did. */
  firstAt: number | null;
  /** True when the run stopped on `limit` rather than on a hit. */
  exhausted: boolean;
}

const EMPTY = { attempts: 0, hits: 0, first: null, firstAt: null, exhausted: false };

/**
 * Rolls until the first hit, or until `limit` rolls have been spent.
 *
 * The limit is a guard, not a pity counter: at a low enough per-roll chance
 * a run genuinely can go this long, and the caller should say so rather than
 * present the cap as a result.
 */
export function runUntilHit<T extends { hit: boolean }>(
  roll: () => T,
  limit = 100_000,
): RunResult<T> {
  for (let attempt = 1; attempt <= limit; attempt++) {
    const result = roll();
    if (result.hit) {
      return { attempts: attempt, hits: 1, first: result, firstAt: attempt, exhausted: false };
    }
  }
  return { ...EMPTY, attempts: limit, exhausted: true };
}

/** Rolls exactly `count` times, counting every hit along the way. */
export function runBatch<T extends { hit: boolean }>(
  roll: () => T,
  count: number,
): RunResult<T> {
  let hits = 0;
  let first: T | null = null;
  let firstAt: number | null = null;
  for (let attempt = 1; attempt <= count; attempt++) {
    const result = roll();
    if (!result.hit) continue;
    hits++;
    if (first === null) {
      first = result;
      firstAt = attempt;
    }
  }
  return { attempts: count, hits, first, firstAt, exhausted: false };
}
