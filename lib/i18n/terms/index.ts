import { fill } from "../format";
import type { Terms } from "./en";

export type { Terms };

/**
 * Looks a data string up in one of the term maps, falling back to the
 * original. The tables are ported verbatim from Nexon, so an option that
 * gains a new name upstream still renders — just untranslated.
 */
function lookup<K extends string>(
  map: Record<K, string>,
  value: string,
): string {
  return (map as Record<string, string>)[value] ?? value;
}

export const partName = (terms: Terms, part: string) =>
  lookup(terms.parts, part);

export const rankName = (terms: Terms, rank: string) =>
  lookup(terms.ranks, rank);

export const cubeName = (terms: Terms, cube: string) =>
  lookup(terms.cubeNames, cube);

export const foodName = (terms: Terms, food: string) =>
  lookup(terms.foods, food);

export const statName = (terms: Terms, stat: string) =>
  lookup(terms.stats, stat);

/** "+50% Phys Att" — the percentage stays leading in every locale. */
export const foodEffectLabel = (terms: Terms, range: string, effect: string) =>
  `+${range} ${lookup(terms.foodEffects, effect)}`;

/**
 * Flame options are either a standalone stat ("Final DMG Increase") or a
 * "{a} scales with {b}" pair. The source data is inconsistent about the
 * space in "EXP ▲" vs "EXP▲", so atoms are normalised before lookup.
 */
export function flameOptionName(terms: Terms, option: string): string {
  const normalise = (atom: string) =>
    atom.replace(/\s+/g, " ").trim().replace("EXP ▲", "EXP▲");
  const parts = option.split(" scales with ");
  if (parts.length !== 2) return statName(terms, normalise(option));
  const [a, b] = parts.map(normalise);
  return fill(terms.scalesWith, {
    a: statName(terms, a),
    b: statName(terms, b),
  });
}

/** Cube option names are flat strings in the shared option table. */
export const cubeOptionName = (terms: Terms, option: string) =>
  statName(terms, option);
