// Food buffs: each grants one stat bonus while active. Regular foods are
// mutually exclusive (eating one replaces the other); the stackable ones
// can be active alongside the regular buff and each other.

import type { ModifiableStat } from "./damage";
import foodJson from "./data/food.json";

export interface FoodItem {
  name: string;
  imagePath: string;
  /** Effect code from food.json: PA, MA, BA, PD, MD, CR, CD */
  effect: string;
  stat: ModifiableStat;
  percent: number;
  effectLabel: string;
  stackable: boolean;
}

const EFFECTS: Record<string, { stat: ModifiableStat; label: string }> = {
  PA: { stat: "atkPercent", label: "Phys Att" },
  MA: { stat: "atkPercent", label: "Mag Att" },
  BA: { stat: "bossAtkPercent", label: "Boss Att" },
  PD: { stat: "dmgPercent", label: "Phys Dmg" },
  MD: { stat: "dmgPercent", label: "Mag Dmg" },
  CR: { stat: "critRatePercent", label: "Crit Rate" },
  CD: { stat: "critDmgPercent", label: "Crit Dmg" },
};

const STACKABLE_FOODS = new Set([
  "Boss Rush Boost Potion",
  "Noodle Soup With Mushroom",
  "Stir-Fried Pork",
  "Escargot",
  "Cold Jellyfish Salad",
]);

export const FOOD_ITEMS: FoodItem[] = Object.entries(foodJson).map(
  ([name, def]) => {
    const effect = EFFECTS[def.effect];
    return {
      name,
      imagePath: def.imagePath,
      effect: def.effect,
      stat: effect.stat,
      percent: parseFloat(def.range),
      effectLabel: `+${def.range} ${effect.label}`,
      stackable: STACKABLE_FOODS.has(name),
    };
  },
);

export const EXCLUSIVE_FOODS = FOOD_ITEMS.filter((item) => !item.stackable);
export const STACKABLE_FOOD_ITEMS = FOOD_ITEMS.filter(
  (item) => item.stackable,
);
