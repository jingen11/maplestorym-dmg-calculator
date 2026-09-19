import type { Terms } from "./en";

// Japanese. Follows the vocabulary of the Japanese client
// (メイプルストーリーM): 潜在能力 / アディショナル潜在能力 for potential /
// bonus potential, and メル — not メソ — for mesos, as Japanese MapleStory
// has always called them.

const ja: Terms = {
  scalesWith: "{b}に比例した{a}",

  stats: {
    "PHY ATK": "物理攻撃力",
    "MAG ATK": "魔法攻撃力",
    "PHY DEF": "物理防御力",
    "MAG DEF": "魔法防御力",
    "Crit Rate": "クリティカル率",
    "Crit DMG": "クリティカルダメージ",
    "Max HP": "最大HP",
    "Max MP": "最大MP",
    "EXP▲": "経験値▲",
    "Boss ATK": "ボス攻撃力",
    "Final DMG Increase": "最終ダメージ増加",
    "DEF Ignore Rate": "防御率無視",

    "Crit ATK": "クリティカル攻撃力",
    ACC: "命中",
    EVD: "回避",
    "EXP Increase": "経験値増加",
    "Item Drop Rate Increase": "アイテムドロップ率増加",
    "Meso Acquisition Increase": "メル獲得量増加",
    "Meso Acquisition Rate Increase": "メル獲得率増加",
    "Crit DMG (%)": "クリティカルダメージ (%)",
    "Crit DMG RES": "クリティカルダメージ耐性",
    "Crit Decrease": "クリティカル減少",
    "Boss DEF Increase": "ボス防御力増加",
    "Boss ATK Increase": "ボス攻撃力増加",
    "Boss ATK Increase (%)": "ボス攻撃力増加 (%)",
    "PHY DMG Increase": "物理ダメージ増加",
    "MAG DMG Increase": "魔法ダメージ増加",
    "PHY ATK Increase": "物理攻撃力増加",
    "MAG ATK Increase": "魔法攻撃力増加",
    "PHY ATK(%)": "物理攻撃力(%)",
    "MAG ATK(%)": "魔法攻撃力(%)",
    "PHY DEF Increase": "物理防御力増加",
    "MAG DEF Increase": "魔法防御力増加",
    "PHY DMG Reduction": "物理ダメージ減少",
    "MAG DMG Reduction": "魔法ダメージ減少",
    "SPD Increase": "移動速度増加",
    "HP Recovery Increase": "HP回復量増加",
    "MP Recovery Increase": "MP回復量増加",
  },

  parts: {
    Weapon: "武器",
    "Secondary Weapon": "サブ武器",
    Signet: "エンブレム",
    Hat: "帽子",
    Outfit: "全身",
    Top: "上衣",
    Bottom: "下衣",
    Gloves: "手袋",
    Shoes: "靴",
    Shoulder: "肩飾り",
    Shoulders: "肩飾り",
    Belt: "ベルト",
    Cape: "マント",
    "Mechanical Heart": "メカニカルハート",
    Pendant: "ペンダント",
    Ring: "指輪",
    Earrings: "イヤリング",
    Pocket: "ポケットアイテム",
    Android: "アンドロイド",
  },

  ranks: {
    Rare: "レア",
    Epic: "エピック",
    Unique: "ユニーク",
    Legendary: "レジェンダリー",
    Mythic: "ミスティック",
  },

  cubeNames: {
    "Occult Cube / Red Cube": "怪しいキューブ / レッドキューブ",
    "Black Cube / Choice Cube": "ブラックキューブ / チョイスキューブ",
    "Bonus Mystical Cube / Bonus Potential Cube":
      "怪しいアディショナルキューブ / アディショナルキューブ",
    "Bonus Bright Cube / Bonus Choice Cube":
      "ブライトアディショナルキューブ / チョイスアディショナルキューブ",
  },

  foods: {
    "Fruity Yogurt": "フルーツヨーグルト",
    "Buckwheat Jelly": "そばゼリー",
    "Grape Juice": "ぶどうジュース",
    "Buttery Roasted Squid": "イカのバター焼き",
    "Boss Rush Boost Potion": "ボスラッシュブーストポーション",
    "Fried Shrimp": "エビフライ",
    "Baby Chick Cookie": "ひよこクッキー",
    "Candy Basket": "キャンディバスケット",
    "Pumpkin Pieces": "カットかぼちゃ",
    "Candy Cane": "キャンディケイン",
    "Pure Water": "純水",
    "Carrot Juice": "にんじんジュース",
    "Very Special Sundae": "スペシャルサンデー",
    Chestnut: "栗",
    "Rice Cake Soup": "お雑煮",
    "Cold Jellyfish Salad": "クラゲの冷菜",
    Escargot: "エスカルゴ",
    "Noodle Soup With Mushroom": "きのこヌードルスープ",
    "Stir-Fried Pork": "豚肉炒め",
  },

  foodEffects: {
    "Phys Att": "物理攻撃力",
    "Mag Att": "魔法攻撃力",
    "Boss Att": "ボス攻撃力",
    "Phys Dmg": "物理ダメージ",
    "Mag Dmg": "魔法ダメージ",
    "Crit Rate": "クリティカル率",
    "Crit Dmg": "クリティカルダメージ",
  },
};

export default ja;
