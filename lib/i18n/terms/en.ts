// Game vocabulary. The probability tables in lib/data/*.json keep their
// original English strings (they are the join keys against Nexon's
// disclosure), so display names are looked up here instead of being
// translated in the data.
//
// English is the identity map and defines the `Terms` type — a missing key
// in another locale is a compile error, and any term that arrives from the
// data without an entry falls back to English rather than rendering blank.

const en = {
  /**
   * Flame options read "{a} scales with {b}". Only the two atoms are
   * translated, so the 35 flame lines need ~12 terms instead of 35.
   */
  scalesWith: "{a} scales with {b}",

  stats: {
    // Flame atoms
    "PHY ATK": "PHY ATK",
    "MAG ATK": "MAG ATK",
    "PHY DEF": "PHY DEF",
    "MAG DEF": "MAG DEF",
    "Crit Rate": "Crit Rate",
    "Crit DMG": "Crit DMG",
    "Max HP": "Max HP",
    "Max MP": "Max MP",
    "EXP▲": "EXP▲",
    "Boss ATK": "Boss ATK",
    "Final DMG Increase": "Final DMG Increase",
    "DEF Ignore Rate": "DEF Ignore Rate",

    // Cube options
    "Crit ATK": "Crit ATK",
    ACC: "ACC",
    EVD: "EVD",
    "EXP Increase": "EXP Increase",
    "Item Drop Rate Increase": "Item Drop Rate Increase",
    "Meso Acquisition Increase": "Meso Acquisition Increase",
    "Meso Acquisition Rate Increase": "Meso Acquisition Rate Increase",
    "Crit DMG (%)": "Crit DMG (%)",
    "Crit DMG RES": "Crit DMG RES",
    "Crit Decrease": "Crit Decrease",
    "Boss DEF Increase": "Boss DEF Increase",
    "Boss ATK Increase": "Boss ATK Increase",
    "Boss ATK Increase (%)": "Boss ATK Increase (%)",
    "PHY DMG Increase": "PHY DMG Increase",
    "MAG DMG Increase": "MAG DMG Increase",
    "PHY ATK Increase": "PHY ATK Increase",
    "MAG ATK Increase": "MAG ATK Increase",
    "PHY ATK(%)": "PHY ATK(%)",
    "MAG ATK(%)": "MAG ATK(%)",
    "PHY DEF Increase": "PHY DEF Increase",
    "MAG DEF Increase": "MAG DEF Increase",
    "PHY DMG Reduction": "PHY DMG Reduction",
    "MAG DMG Reduction": "MAG DMG Reduction",
    "SPD Increase": "SPD Increase",
    "HP Recovery Increase": "HP Recovery Increase",
    "MP Recovery Increase": "MP Recovery Increase",
  },

  /** Equipment parts — union of the cube parts and the flame slots. */
  parts: {
    Weapon: "Weapon",
    "Secondary Weapon": "Secondary Weapon",
    Signet: "Signet",
    Hat: "Hat",
    Outfit: "Outfit",
    Top: "Top",
    Bottom: "Bottom",
    Gloves: "Gloves",
    Shoes: "Shoes",
    Shoulder: "Shoulder",
    Shoulders: "Shoulders",
    Belt: "Belt",
    Cape: "Cape",
    "Mechanical Heart": "Mechanical Heart",
    Pendant: "Pendant",
    Ring: "Ring",
    Earrings: "Earrings",
    Pocket: "Pocket",
    Android: "Android",
  },

  ranks: {
    Rare: "Rare",
    Epic: "Epic",
    Unique: "Unique",
    Legendary: "Legendary",
    Mythic: "Mythic",
  },

  cubeNames: {
    "Occult Cube / Red Cube": "Occult Cube / Red Cube",
    "Black Cube / Choice Cube": "Black Cube / Choice Cube",
    "Bonus Mystical Cube / Bonus Potential Cube":
      "Bonus Mystical Cube / Bonus Potential Cube",
    "Bonus Bright Cube / Bonus Choice Cube":
      "Bonus Bright Cube / Bonus Choice Cube",
  },

  foods: {
    "Fruity Yogurt": "Fruity Yogurt",
    "Buckwheat Jelly": "Buckwheat Jelly",
    "Grape Juice": "Grape Juice",
    "Buttery Roasted Squid": "Buttery Roasted Squid",
    "Boss Rush Boost Potion": "Boss Rush Boost Potion",
    "Fried Shrimp": "Fried Shrimp",
    "Baby Chick Cookie": "Baby Chick Cookie",
    "Candy Basket": "Candy Basket",
    "Pumpkin Pieces": "Pumpkin Pieces",
    "Candy Cane": "Candy Cane",
    "Pure Water": "Pure Water",
    "Carrot Juice": "Carrot Juice",
    "Very Special Sundae": "Very Special Sundae",
    Chestnut: "Chestnut",
    "Rice Cake Soup": "Rice Cake Soup",
    "Cold Jellyfish Salad": "Cold Jellyfish Salad",
    Escargot: "Escargot",
    "Noodle Soup With Mushroom": "Noodle Soup With Mushroom",
    "Stir-Fried Pork": "Stir-Fried Pork",
  },

  /** Stat granted by a food buff, as shown on the food card. */
  foodEffects: {
    "Phys Att": "Phys Att",
    "Mag Att": "Mag Att",
    "Boss Att": "Boss Att",
    "Phys Dmg": "Phys Dmg",
    "Mag Dmg": "Mag Dmg",
    "Crit Rate": "Crit Rate",
    "Crit Dmg": "Crit Dmg",
  },
} as const;

export default en;

export type Terms = {
  scalesWith: string;
  stats: Record<keyof (typeof en)["stats"], string>;
  parts: Record<keyof (typeof en)["parts"], string>;
  ranks: Record<keyof (typeof en)["ranks"], string>;
  cubeNames: Record<keyof (typeof en)["cubeNames"], string>;
  foods: Record<keyof (typeof en)["foods"], string>;
  foodEffects: Record<keyof (typeof en)["foodEffects"], string>;
};
