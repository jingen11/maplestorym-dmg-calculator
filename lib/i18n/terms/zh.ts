import type { Terms } from "./en";

// Simplified Chinese. Stat abbreviations that MapleStory M's client shows in
// English (PHY ATK, Crit DMG…) are kept in English so the table still matches
// the in-game stat window; descriptive terms are translated.

const zh: Terms = {
  scalesWith: "{a} 随 {b} 提升",

  stats: {
    "PHY ATK": "物理攻击力",
    "MAG ATK": "魔法攻击力",
    "PHY DEF": "物理防御力",
    "MAG DEF": "魔法防御力",
    "Crit Rate": "暴击率",
    "Crit DMG": "暴击伤害",
    "Max HP": "最大 HP",
    "Max MP": "最大 MP",
    "EXP▲": "经验值▲",
    "Boss ATK": "BOSS 攻击力",
    "Final DMG Increase": "最终伤害增加",
    "DEF Ignore Rate": "无视防御率",

    "Crit ATK": "暴击攻击力",
    ACC: "命中",
    EVD: "回避",
    "EXP Increase": "经验值增加",
    "Item Drop Rate Increase": "道具掉落率增加",
    "Meso Acquisition Increase": "金币获得量增加",
    "Meso Acquisition Rate Increase": "金币获得率增加",
    "Crit DMG (%)": "暴击伤害 (%)",
    "Crit DMG RES": "暴击伤害抗性",
    "Crit Decrease": "暴击减少",
    "Boss DEF Increase": "BOSS 防御力增加",
    "Boss ATK Increase": "BOSS 攻击力增加",
    "Boss ATK Increase (%)": "BOSS 攻击力增加 (%)",
    "PHY DMG Increase": "物理伤害增加",
    "MAG DMG Increase": "魔法伤害增加",
    "PHY ATK Increase": "物理攻击力增加",
    "MAG ATK Increase": "魔法攻击力增加",
    "PHY ATK(%)": "物理攻击力(%)",
    "MAG ATK(%)": "魔法攻击力(%)",
    "PHY DEF Increase": "物理防御力增加",
    "MAG DEF Increase": "魔法防御力增加",
    "PHY DMG Reduction": "物理伤害减免",
    "MAG DMG Reduction": "魔法伤害减免",
    "SPD Increase": "移动速度增加",
    "HP Recovery Increase": "HP 恢复量增加",
    "MP Recovery Increase": "MP 恢复量增加",
  },

  parts: {
    Weapon: "武器",
    "Secondary Weapon": "副武器",
    Signet: "纹章",
    Hat: "帽子",
    Outfit: "套装",
    Top: "上衣",
    Bottom: "裤子",
    Gloves: "手套",
    Shoes: "鞋子",
    Shoulder: "肩甲",
    Shoulders: "肩甲",
    Belt: "腰带",
    Cape: "披风",
    "Mechanical Heart": "机械心脏",
    Pendant: "项链",
    Ring: "戒指",
    Earrings: "耳环",
    Pocket: "口袋道具",
    Android: "机器人",
  },

  ranks: {
    Rare: "稀有",
    Epic: "史诗",
    Unique: "独特",
    Legendary: "传说",
    Mythic: "神话",
  },

  cubeNames: {
    "Occult Cube / Red Cube": "神秘方块 / 红色方块",
    "Black Cube / Choice Cube": "黑色方块 / 自选方块",
    "Bonus Mystical Cube / Bonus Potential Cube":
      "附加神秘方块 / 附加潜能方块",
    "Bonus Bright Cube / Bonus Choice Cube": "附加光明方块 / 附加自选方块",
  },

  foods: {
    "Fruity Yogurt": "水果酸奶",
    "Buckwheat Jelly": "荞麦凉粉",
    "Grape Juice": "葡萄汁",
    "Buttery Roasted Squid": "黄油烤鱿鱼",
    "Boss Rush Boost Potion": "BOSS 突袭强化药水",
    "Fried Shrimp": "炸虾",
    "Baby Chick Cookie": "小鸡饼干",
    "Candy Basket": "糖果篮",
    "Pumpkin Pieces": "南瓜块",
    "Candy Cane": "拐杖糖",
    "Pure Water": "纯净水",
    "Carrot Juice": "胡萝卜汁",
    "Very Special Sundae": "特制圣代",
    Chestnut: "栗子",
    "Rice Cake Soup": "年糕汤",
    "Cold Jellyfish Salad": "凉拌海蜇",
    Escargot: "焗蜗牛",
    "Noodle Soup With Mushroom": "蘑菇面汤",
    "Stir-Fried Pork": "炒猪肉",
  },

  foodEffects: {
    "Phys Att": "物理攻击力",
    "Mag Att": "魔法攻击力",
    "Boss Att": "BOSS 攻击力",
    "Phys Dmg": "物理伤害",
    "Mag Dmg": "魔法伤害",
    "Crit Rate": "暴击率",
    "Crit Dmg": "暴击伤害",
  },
};

export default zh;
