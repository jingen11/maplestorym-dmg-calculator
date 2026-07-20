// MapleStory M damage model, ported from the community
// "Damage & Emblem Calculator" spreadsheet (see docs/calculator-spec.md).
// Pure functions so the math is easy to test and extend (buffs, damage
// cap) without touching UI code.

import defenseRatings from "./data/defenseRatings.json";

export interface DamageInputs {
  /** Phys Atk (flat, from the stat window) */
  physAtk: number;
  /** Phys/Mag Atk % (e.g. 120.5 for +120.5%) */
  atkPercent: number;
  /** Phys/Mag Dmg % */
  dmgPercent: number;
  /** Boss Atk % — only applies when target is a boss */
  bossAtkPercent: number;
  /** Crit Rate %, capped at 100 */
  critRatePercent: number;
  /** Crit Dmg % */
  critDmgPercent: number;
  /** Final Dmg % from the stat window */
  finalDmgPercent: number;
  /** Def Ignore Rate % from the stat window — stacks multiplicatively with node DIR sources */
  statDefIgnoreRatePercent: number;
  /** Skill % of the skill line being tested (e.g. 230 for a 230% skill) */
  skillPercent: number;
  /** Final Dmg % from the skill's enhancement — stacks additively with finalDmgPercent */
  skillFinalDmgPercent: number;
  /** Node IED: grants 15% Def Ignore Rate */
  nodeIed: boolean;
  /** Defense Smash 4 node: grants 25% Def Ignore Rate */
  defenseSmash4: boolean;
  /** Boss PDR % — how much damage the boss's defense removes before IED */
  bossPdrPercent: number;
  /** Character level — drives the level-difference damage reduction */
  characterLevel: number;
  /** Monster level — drives the level-difference damage reduction (bosses only) */
  monsterLevel: number;
  /** Monster Crit Resistance % — subtracts from Crit Rate before the 100% cap (bosses only) */
  monsterCritResPercent: number;
  targetIsBoss: boolean;
}

export interface DamageLine {
  nonCritHit: number;
  /** Crit line at the midpoint (+25%) of the random 0–50% crit roll */
  critHit: number;
  /** Lowest crit: +0% roll */
  critHitMin: number;
  /** Highest crit: +50% roll */
  critHitMax: number;
  /** Average damage per hit weighted by crit rate */
  expectedHit: number;
}

export interface DamageResult extends DamageLine {
  /**
   * Boss pipeline broken out per stage, mirroring the spreadsheet's
   * three blocks: raw formula, after level modifier, after IED.
   * Absent for normal monsters (neither stage applies to them).
   */
  stages?: {
    preLevel: DamageLine;
    postLevel: DamageLine;
    postIed: DamageLine;
  };
}

export const DEFAULT_INPUTS: DamageInputs = {
  physAtk: 36779,
  atkPercent: 120.5,
  dmgPercent: 126.1,
  bossAtkPercent: 100.8,
  critRatePercent: 69.6,
  critDmgPercent: 272.9,
  finalDmgPercent: 50.8,
  statDefIgnoreRatePercent: 2.4,
  skillPercent: 230,
  skillFinalDmgPercent: 0,
  nodeIed: false,
  defenseSmash4: false,
  bossPdrPercent: 20,
  characterLevel: 222,
  monsterLevel: 200,
  monsterCritResPercent: 0,
  targetIsBoss: false,
};

const NODE_IED_DIR = 0.15;
const DEFENSE_SMASH_4_DIR = 0.25;

/**
 * Final Def Ignore Rate. DIR sources stack multiplicatively:
 * dir = 1 − (1 − source1)(1 − source2)…
 */
export function finalDefIgnoreRate(
  statDefIgnoreRatePercent: number,
  nodeIed: boolean,
  defenseSmash4: boolean,
): number {
  const statDir =
    Math.min(Math.max(statDefIgnoreRatePercent, 0), 100) / 100;
  return (
    1 -
    (1 - statDir) *
      (nodeIed ? 1 - NODE_IED_DIR : 1) *
      (defenseSmash4 ? 1 - DEFENSE_SMASH_4_DIR : 1)
  );
}

// Datamined per-level defense ratings ("DMG REDUC (data mined)" sheet):
// levels 1–250 are real values, 251–300 linearly extrapolated.
const DEFENSE_RATINGS = defenseRatings as Record<string, number>;
const MAX_TABLE_LEVEL = 300;

const defenseRatingFor = (level: number) => {
  const clamped = Math.min(Math.max(Math.round(level), 1), MAX_TABLE_LEVEL);
  return DEFENSE_RATINGS[String(clamped)];
};

/**
 * Level-difference damage reduction: the share of damage that survives
 * the target's defense, from the datamined formula
 * DamageReduction = TargetDefense / (YourDefenseRating + TargetDefense).
 */
export function levelModifier(
  characterLevel: number,
  monsterLevel: number,
): number {
  const yours = defenseRatingFor(characterLevel);
  const target = defenseRatingFor(monsterLevel);
  return 1 - target / (yours + target);
}

/** Stats that can receive extra additive modifiers (buffs, food, emblems). */
export const MODIFIABLE_STATS = [
  "physAtk",
  "atkPercent",
  "dmgPercent",
  "bossAtkPercent",
  "critRatePercent",
  "critDmgPercent",
  "finalDmgPercent",
] as const;

export type ModifiableStat = (typeof MODIFIABLE_STATS)[number];

/** Extra stats stacked additively on top of the stat-window values. */
export type StatModifiers = Record<ModifiableStat, number>;

export const ZERO_MODIFIERS: StatModifiers = {
  physAtk: 0,
  atkPercent: 0,
  dmgPercent: 0,
  bossAtkPercent: 0,
  critRatePercent: 0,
  critDmgPercent: 0,
  finalDmgPercent: 0,
};

export function applyModifiers(
  inputs: DamageInputs,
  mods: StatModifiers,
): DamageInputs {
  const merged = { ...inputs };
  for (const key of MODIFIABLE_STATS) merged[key] += mods[key];
  return merged;
}

export function calculateDamage(inputs: DamageInputs): DamageResult {
  // Monster crit resistance subtracts from crit rate before the 100% cap
  // (spreadsheet: N6 = ... - B25). It belongs to the target, so it only
  // applies on the boss pipeline.
  const critRes = inputs.targetIsBoss ? inputs.monsterCritResPercent : 0;
  const critRate =
    Math.min(Math.max(inputs.critRatePercent - critRes, 0), 100) / 100;
  const atkPct = inputs.atkPercent / 100;
  const bossPct = inputs.bossAtkPercent / 100;
  const skill = inputs.skillPercent / 100;

  const dmgPct = inputs.dmgPercent / 100;
  const finalPct = (inputs.finalDmgPercent + inputs.skillFinalDmgPercent) / 100;

  // Boss Atk % is scaled by Skill % and lands in the Atk % bracket — a
  // quirk of the game verified by community testing, not a typo.
  const atkBracket = 1 + atkPct + (inputs.targetIsBoss ? skill * bossPct : 0);

  // In-game crits add a random 0–50% on top of Crit Dmg %; 25% is the
  // midpoint the spreadsheet uses as its headline value, with the +0%
  // and +50% rolls as the min/max.
  const critPct = inputs.critDmgPercent / 100;
  const critFactor = 1 + 0.25 + critPct;

  const toLine = (nonCrit: number): DamageLine => {
    const crit = nonCrit * critFactor;
    return {
      nonCritHit: Math.floor(nonCrit),
      critHit: Math.floor(crit),
      critHitMin: Math.floor(nonCrit * (1 + critPct)),
      critHitMax: Math.floor(nonCrit * (1 + 0.5 + critPct)),
      expectedHit: Math.floor(nonCrit * (1 - critRate) + crit * critRate),
    };
  };

  const rawNonCrit =
    inputs.physAtk * (1 + dmgPct) * atkBracket * skill * (1 + finalPct);

  // Normal monsters skip the level and IED stages, matching the
  // spreadsheet's damage calculator section.
  if (!inputs.targetIsBoss) return toLine(rawNonCrit);

  const levelBracket = levelModifier(
    inputs.characterLevel,
    inputs.monsterLevel,
  );

  // Boss defense removes PDR % of your damage; Def Ignore Rate shrinks
  // that reduction.
  const dir = finalDefIgnoreRate(
    inputs.statDefIgnoreRatePercent,
    inputs.nodeIed,
    inputs.defenseSmash4,
  );
  const iedBracket = 1 - (inputs.bossPdrPercent / 100) * (1 - dir);

  const postLevelNonCrit = rawNonCrit * levelBracket;
  const postIedNonCrit = postLevelNonCrit * iedBracket;

  return {
    ...toLine(postIedNonCrit),
    stages: {
      preLevel: toLine(rawNonCrit),
      postLevel: toLine(postLevelNonCrit),
      postIed: toLine(postIedNonCrit),
    },
  };
}
