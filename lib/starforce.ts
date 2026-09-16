// Star Force enhancement costs.
//
// starforce.json holds one row per star: the meso cost of a tap from the
// previous star, and the four outcomes of that tap in percent — success,
// keep the star, drop one star, break. A break keeps the star but the item
// must be repaired before the next tap, so it costs `repairCost` extra.
//
// The expected cost to climb one star is solved exactly rather than
// simulated. Let E(n) be the expected mesos to first reach star n from
// star n-1. One tap costs c(n) (+ repair with chance b). On a success you are
// done; on a keep or a break you are back where you started and owe E(n)
// again; on a drop you are at n-2 and owe E(n-1) + E(n). So
//
//   E(n) = c(n) + b·repair + (m + b)·E(n) + d·(E(n-1) + E(n))
//   E(n) = (c(n) + b·repair + d·E(n-1)) / s
//
// and the same recursion with c = 1 counts taps, or with c = 0 and the
// repair term replaced by b counts breaks. These are the formulas the source
// spreadsheet uses, and its published numbers fall out of them exactly.
//
// A mean hides how skewed the climb is — one bad drop streak can double a
// run — so simulatePath draws real runs from the same table to give the
// median and the unlucky tail.

import starforceJson from "./data/starforce.json";

export interface StarRow {
  /** The star this tap reaches; the tap starts from `star - 1`. */
  star: number;
  /** Mesos per tap. */
  cost: number;
  /** Outcome chances in percent. The four sum to 100. */
  success: number;
  maintain: number;
  degrade: number;
  break: number;
}

type RawDoc = {
  source: string;
  sourceLabel: string;
  updated: string;
  repairCost: number;
  minigameMultiplier: number;
  notes: string[];
  stars: StarRow[];
};

const doc = starforceJson as RawDoc;

export const STARFORCE_SOURCE = doc.source;
export const STARFORCE_SOURCE_LABEL = doc.sourceLabel;
export const STARFORCE_UPDATED = doc.updated;
export const STARFORCE_NOTES = doc.notes;
export const DEFAULT_REPAIR_COST = doc.repairCost;
export const MINIGAME_MULTIPLIER = doc.minigameMultiplier;
export const STAR_ROWS: readonly StarRow[] = doc.stars;
export const MAX_STAR = doc.stars.length;

export interface StarOptions {
  /** Whether every tap lands the timing minigame, multiplying success by 1.05. */
  minigame: boolean;
  /** Mesos to repair a broken item. 0 leaves breaks free (a Shielding Ward). */
  repairCost: number;
}

export const DEFAULT_OPTIONS: StarOptions = {
  minigame: false,
  repairCost: DEFAULT_REPAIR_COST,
};

/** Outcome chances as fractions, after the minigame bonus if enabled. */
export interface Rates {
  success: number;
  maintain: number;
  degrade: number;
  break: number;
}

/**
 * The minigame bonus is multiplicative — 30% becomes 31.5%, not 35% — and
 * the extra success comes out of the keep-star chance, never out of the drop
 * or break chance. Clamped so a 100% row stays at 100%.
 */
export function stepRates(row: StarRow, minigame: boolean): Rates {
  const base = row.success / 100;
  const success = minigame
    ? Math.min(1, base * MINIGAME_MULTIPLIER)
    : base;
  const bonus = success - base;
  return {
    success,
    maintain: Math.max(0, row.maintain / 100 - bonus),
    degrade: row.degrade / 100,
    break: row.break / 100,
  };
}

export interface StarStep {
  star: number;
  cost: number;
  rates: Rates;
  /** Expected mesos to climb from `star - 1` to `star`, repairs included. */
  expectedCost: number;
  expectedAttempts: number;
  expectedBreaks: number;
  /** Running totals from the `from` star passed to expectedPath. */
  cumulativeCost: number;
  cumulativeAttempts: number;
  cumulativeBreaks: number;
}

/**
 * Expected cost, taps and breaks for every single-star climb in the table.
 *
 * Independent of where a player starts: a drop from star 12 always costs
 * the same E(12) to recover, whether the run began at 0 or at 11.
 */
export function expectedSteps(options: StarOptions = DEFAULT_OPTIONS) {
  const steps: Omit<
    StarStep,
    "cumulativeCost" | "cumulativeAttempts" | "cumulativeBreaks"
  >[] = [];
  let prevCost = 0;
  let prevAttempts = 0;
  let prevBreaks = 0;
  for (const row of STAR_ROWS) {
    const rates = stepRates(row, options.minigame);
    const { success: s, degrade: d, break: b } = rates;
    const expectedCost =
      (row.cost + b * options.repairCost + d * prevCost) / s;
    const expectedAttempts = (1 + d * prevAttempts) / s;
    const expectedBreaks = (b + d * prevBreaks) / s;
    steps.push({
      star: row.star,
      cost: row.cost,
      rates,
      expectedCost,
      expectedAttempts,
      expectedBreaks,
    });
    prevCost = expectedCost;
    prevAttempts = expectedAttempts;
    prevBreaks = expectedBreaks;
  }
  return steps;
}

/** The climb from `from` to `to`, one step per star reached, with running totals. */
export function expectedPath(
  from: number,
  to: number,
  options: StarOptions = DEFAULT_OPTIONS,
): StarStep[] {
  const steps = expectedSteps(options);
  const path: StarStep[] = [];
  let cost = 0;
  let attempts = 0;
  let breaks = 0;
  for (let star = from + 1; star <= to; star++) {
    const step = steps[star - 1];
    if (!step) break;
    cost += step.expectedCost;
    attempts += step.expectedAttempts;
    breaks += step.expectedBreaks;
    path.push({
      ...step,
      cumulativeCost: cost,
      cumulativeAttempts: attempts,
      cumulativeBreaks: breaks,
    });
  }
  return path;
}

/* ------------------------------------------------------------- simulation */

/** Injectable so a caller can seed a deterministic run; defaults to Math.random. */
export type Rng = () => number;

/**
 * mulberry32 — a small seeded generator, so the worked example and FAQ
 * figures rendered at build time come out the same on every build instead
 * of shifting a few percent with each deploy.
 */
export function seededRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Total taps a batch may spend. About 4 million simple steps keeps the run
 * under ~50ms in a browser, which is what lets the chart re-simulate on
 * every input change instead of behind a button.
 */
const SIM_BUDGET = 4_000_000;
const SIM_MIN_RUNS = 300;
const SIM_MAX_RUNS = 2_000;

export interface SimPlan {
  /** Highest star the batch will simulate to; below `to` when the climb is too long. */
  simTo: number;
  runs: number;
}

/**
 * How far a batch can afford to simulate.
 *
 * Past 20★ the expected taps explode (tens of thousands, then millions per
 * star), so the plan stops at the last star that still fits SIM_MIN_RUNS
 * runs in the budget rather than freezing the page. The expected values
 * above still cover every star.
 */
export function simulationPlan(
  from: number,
  to: number,
  options: StarOptions = DEFAULT_OPTIONS,
): SimPlan {
  const path = expectedPath(from, to, options);
  let simTo = from;
  let runs = 0;
  for (const step of path) {
    const affordable = Math.floor(SIM_BUDGET / step.cumulativeAttempts);
    if (affordable < SIM_MIN_RUNS) break;
    simTo = step.star;
    runs = Math.min(SIM_MAX_RUNS, affordable);
  }
  return { simTo, runs };
}

export interface SimStar {
  star: number;
  /** Mesos spent when each run first reached this star, sorted ascending. */
  costs: Float64Array;
}

/**
 * Plays out `runs` climbs from `from` to `to` against the table, recording
 * the mesos spent the first time each star was reached.
 *
 * Drops can take a run below its starting star — that is real, and it is
 * what the recursion above prices in — so a run keeps tapping from wherever
 * it lands until it reaches `to`.
 */
export function simulatePath(
  from: number,
  to: number,
  options: StarOptions = DEFAULT_OPTIONS,
  runs: number,
  rng: Rng = Math.random,
): SimStar[] {
  const rates = STAR_ROWS.map((row) => stepRates(row, options.minigame));
  const span = to - from;
  if (span <= 0 || runs <= 0) return [];

  const costs = Array.from({ length: span }, () => new Float64Array(runs));

  for (let run = 0; run < runs; run++) {
    let star = from;
    let spent = 0;
    let best = from;
    while (star < to) {
      const row = STAR_ROWS[star];
      const r = rates[star];
      spent += row.cost;
      const roll = rng();
      if (roll < r.success) {
        star++;
        if (star > best) {
          best = star;
          costs[star - from - 1][run] = spent;
        }
      } else if (roll < r.success + r.maintain) {
        // keep the star
      } else if (roll < r.success + r.maintain + r.degrade) {
        if (star > 0) star--;
      } else {
        spent += options.repairCost;
      }
    }
  }

  return costs.map((arr, i) => ({ star: from + i + 1, costs: arr.sort() }));
}

/** Nearest-rank percentile of a sorted array; `p` in 0–100. */
export function percentile(sorted: Float64Array, p: number): number {
  if (sorted.length === 0) return NaN;
  const rank = Math.min(
    sorted.length - 1,
    Math.max(0, Math.ceil((p / 100) * sorted.length) - 1),
  );
  return sorted[rank];
}
