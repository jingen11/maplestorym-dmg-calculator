// Stat efficiency: "if I gain +N of this stat, how much more damage do I
// actually do?" — the question behind the spreadsheet's emblem comparator,
// asked one stat at a time.
//
// Every answer is computed by re-running the real damage formula with the
// stat bumped, never by a shortcut rule of thumb: the brackets multiply
// each other, so a stat's worth depends on everything else you already
// have (and Crit Rate's worth collapses to zero once you hit the cap).

import {
  calculateDamage,
  MODIFIABLE_STATS,
  type DamageInputs,
  type ModifiableStat,
} from "./damage";

/**
 * The stats worth comparing. The additive ones, plus stat-window Def
 * Ignore Rate — it does nothing to mobs, but on a boss it is often the
 * strongest line on the board, so leaving it out would mislead.
 */
export const EFFICIENCY_STATS = [
  ...MODIFIABLE_STATS,
  "statDefIgnoreRatePercent",
] as const;

export type EfficiencyStat = ModifiableStat | "statDefIgnoreRatePercent";

export type StatSteps = Record<EfficiencyStat, number>;

/** One point of each percent stat; flat Atk gets a step you'd notice. */
export const DEFAULT_STEPS: StatSteps = {
  physAtk: 100,
  atkPercent: 1,
  dmgPercent: 1,
  bossAtkPercent: 1,
  critRatePercent: 1,
  critDmgPercent: 1,
  finalDmgPercent: 1,
  statDefIgnoreRatePercent: 1,
};

export interface StatGain {
  stat: EfficiencyStat;
  /** How much of the stat was added to produce this gain. */
  step: number;
  /** % increase in the average hit against a normal monster. */
  mobPercent: number;
  /** % increase in the average hit against a boss. */
  bossPercent: number;
}

const gain = (base: number, bumped: number) =>
  base > 0 ? (bumped / base - 1) * 100 : 0;

const expected = (inputs: DamageInputs, targetIsBoss: boolean) =>
  calculateDamage({ ...inputs, targetIsBoss }).expectedExact;

/**
 * Damage gain per stat, in the order of EFFICIENCY_STATS.
 *
 * `inputs` should be the stat-window values *before* hyper skill and food:
 * the question this answers is what a cube or flame reroll buys, and a
 * reroll moves the stat window, not the buffs stacked on top of it. Buffs
 * would also mask the answer — food alone can push Crit Rate to the cap
 * and make it look worthless to roll.
 */
export function statEfficiency(
  inputs: DamageInputs,
  steps: StatSteps,
): StatGain[] {
  const mobBase = expected(inputs, false);
  const bossBase = expected(inputs, true);

  return EFFICIENCY_STATS.map((stat) => {
    const step = steps[stat];
    const bumped: DamageInputs = { ...inputs, [stat]: inputs[stat] + step };
    return {
      stat,
      step,
      mobPercent: gain(mobBase, expected(bumped, false)),
      bossPercent: gain(bossBase, expected(bumped, true)),
    };
  });
}
