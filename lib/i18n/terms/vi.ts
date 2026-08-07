import type { Terms } from "./en";

// Vietnamese. Stat abbreviations that MapleStory M shows in English
// (PHY ATK, Crit DMG…) are kept as-is so the table matches the in-game stat
// window; descriptive terms and item names are translated.

const vi: Terms = {
  scalesWith: "{a} tăng theo {b}",

  stats: {
    "PHY ATK": "PHY ATK",
    "MAG ATK": "MAG ATK",
    "PHY DEF": "PHY DEF",
    "MAG DEF": "MAG DEF",
    "Crit Rate": "Crit Rate",
    "Crit DMG": "Crit DMG",
    "Max HP": "HP tối đa",
    "Max MP": "MP tối đa",
    "EXP▲": "EXP▲",
    "Boss ATK": "Boss ATK",
    "Final DMG Increase": "Tăng Final DMG",
    "DEF Ignore Rate": "Tỷ lệ bỏ qua phòng thủ",

    "Crit ATK": "Crit ATK",
    ACC: "Chính xác (ACC)",
    EVD: "Né tránh (EVD)",
    "EXP Increase": "Tăng EXP",
    "Item Drop Rate Increase": "Tăng tỷ lệ rơi vật phẩm",
    "Meso Acquisition Increase": "Tăng meso nhận được",
    "Meso Acquisition Rate Increase": "Tăng tỷ lệ meso nhận được",
    "Crit DMG (%)": "Crit DMG (%)",
    "Crit DMG RES": "Kháng Crit DMG",
    "Crit Decrease": "Giảm chí mạng",
    "Boss DEF Increase": "Tăng Boss DEF",
    "Boss ATK Increase": "Tăng Boss ATK",
    "Boss ATK Increase (%)": "Tăng Boss ATK (%)",
    "PHY DMG Increase": "Tăng PHY DMG",
    "MAG DMG Increase": "Tăng MAG DMG",
    "PHY ATK Increase": "Tăng PHY ATK",
    "MAG ATK Increase": "Tăng MAG ATK",
    "PHY ATK(%)": "PHY ATK(%)",
    "MAG ATK(%)": "MAG ATK(%)",
    "PHY DEF Increase": "Tăng PHY DEF",
    "MAG DEF Increase": "Tăng MAG DEF",
    "PHY DMG Reduction": "Giảm sát thương vật lý",
    "MAG DMG Reduction": "Giảm sát thương phép",
    "SPD Increase": "Tăng tốc độ",
    "HP Recovery Increase": "Tăng hồi phục HP",
    "MP Recovery Increase": "Tăng hồi phục MP",
  },

  parts: {
    Weapon: "Vũ khí",
    "Secondary Weapon": "Vũ khí phụ",
    Signet: "Ấn ký",
    Hat: "Nón",
    Outfit: "Bộ đồ",
    Top: "Áo",
    Bottom: "Quần",
    Gloves: "Găng tay",
    Shoes: "Giày",
    Shoulder: "Giáp vai",
    Shoulders: "Giáp vai",
    Belt: "Thắt lưng",
    Cape: "Áo choàng",
    "Mechanical Heart": "Tim máy",
    Pendant: "Dây chuyền",
    Ring: "Nhẫn",
    Earrings: "Bông tai",
    Pocket: "Vật phẩm túi",
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
    "Fruity Yogurt": "Sữa chua trái cây",
    "Buckwheat Jelly": "Thạch kiều mạch",
    "Grape Juice": "Nước nho",
    "Buttery Roasted Squid": "Mực nướng bơ",
    "Boss Rush Boost Potion": "Thuốc tăng lực Boss Rush",
    "Fried Shrimp": "Tôm chiên",
    "Baby Chick Cookie": "Bánh quy gà con",
    "Candy Basket": "Giỏ kẹo",
    "Pumpkin Pieces": "Miếng bí ngô",
    "Candy Cane": "Kẹo gậy",
    "Pure Water": "Nước tinh khiết",
    "Carrot Juice": "Nước cà rốt",
    "Very Special Sundae": "Kem sundae đặc biệt",
    Chestnut: "Hạt dẻ",
    "Rice Cake Soup": "Canh bánh gạo",
    "Cold Jellyfish Salad": "Gỏi sứa",
    Escargot: "Ốc sên bơ tỏi",
    "Noodle Soup With Mushroom": "Canh mì nấm",
    "Stir-Fried Pork": "Thịt heo xào",
  },

  foodEffects: {
    "Phys Att": "Phys Att",
    "Mag Att": "Mag Att",
    "Boss Att": "Boss Att",
    "Phys Dmg": "Phys Dmg",
    "Mag Dmg": "Mag Dmg",
    "Crit Rate": "Crit Rate",
    "Crit Dmg": "Crit Dmg",
  },
};

export default vi;
