// Rebirth Flame option tables, ported from Nexon's official probability
// disclosure. flames.json stores each grade as a 5-slot array in RARITIES
// order, holding [value%, probability%] — or null where the option cannot
// roll at that rarity (Final DMG / DEF Ignore are Legendary+ only).

import flamesJson from "./data/flames.json";

export type Rarity = "Rare" | "Epic" | "Unique" | "Legendary" | "Mythic";

/** Flame item used. Every rarity doubles as a value column; Eternal does not. */
export type FlameItem = Rarity | "Eternal";

type RawCell = [number, number] | null;
type RawDoc = {
  source: string;
  sourceLabel: string;
  updated: string;
  rarities: Rarity[];
  notes: string[];
  twoOptionChance: Record<FlameItem, number>;
  slots: Record<string, { option: string; grades: RawCell[][] }[]>;
};

const doc = flamesJson as unknown as RawDoc;

export const RARITIES = doc.rarities;
export const FLAME_SOURCE = doc.source;
export const FLAME_SOURCE_LABEL = doc.sourceLabel;
export const FLAME_UPDATED = doc.updated;
export const FLAME_NOTES = doc.notes;
export const TWO_OPTION_CHANCE = doc.twoOptionChance;
export const FLAME_SLOTS = Object.keys(doc.slots);

/**
 * One rollable line: an option at one of its (up to 4) value grades.
 *
 * Within an option the four grades always share the same probability, so
 * each value is equally likely. Source order is value-descending for most
 * options but ascending for Final DMG Increase and DEF Ignore Rate — sort
 * by `value` for display rather than trusting `grade` to mean "best".
 */
export interface FlameRoll {
  option: string;
  /** Position in the source table. Stable id for a line; not a ranking. */
  grade: number;
  value: number;
  prob: number;
}

/** Every line that can roll for a slot at a rarity, source order preserved. */
export function getRolls(slot: string, rarity: Rarity): FlameRoll[] {
  const index = RARITIES.indexOf(rarity);
  const entries = doc.slots[slot] ?? [];
  const rolls: FlameRoll[] = [];
  for (const entry of entries) {
    entry.grades.forEach((grade, i) => {
      const cell = grade[index];
      if (!cell) return;
      const [value, prob] = cell;
      if (value === null || prob === null) return;
      rolls.push({ option: entry.option, grade: i + 1, value, prob });
    });
  }
  return rolls;
}

/** Distinct option names available for a slot at a rarity. */
export function getOptions(slot: string, rarity: Rarity): string[] {
  return [...new Set(getRolls(slot, rarity).map((r) => r.option))];
}

/** Summed probability of the selected lines — the per-option-slot hit rate. */
export function selectionChance(
  rolls: FlameRoll[],
  isSelected: (roll: FlameRoll) => boolean,
): number {
  return rolls.reduce((sum, r) => (isSelected(r) ? sum + r.prob : sum), 0);
}

/**
 * Chance a single flame yields at least one of the wanted lines.
 *
 * A flame rolls one option, or two with probability `twoOptionChance`. Nexon
 * does not disclose whether the two options are drawn independently, so this
 * assumes they are — the standard reading, and the UI says so.
 */
export function atLeastOneChance(perOption: number, twoOptionPct: number): number {
  const q = Math.min(Math.max(perOption, 0), 100) / 100;
  const t = Math.min(Math.max(twoOptionPct, 0), 100) / 100;
  const miss = 1 - q;
  const combined = (1 - t) * (1 - miss) + t * (1 - miss * miss);
  return combined * 100;
}

/** Expected flames needed for a ~50% and ~90% cumulative shot. */
export function attemptsFor(chancePct: number, targetPct: number): number | null {
  const p = chancePct / 100;
  if (p <= 0) return null;
  if (p >= 1) return 1;
  return Math.ceil(Math.log(1 - targetPct / 100) / Math.log(1 - p));
}
