import type { Terms } from "./en";

// Stat abbreviations (PHY ATK, Crit DMG…) are kept in English: MapleStory M's
// Thai client shows the same English stat labels, so translating them would
// make the table stop matching what players see in game. Surrounding words
// are Thai.

const th: Terms = {
  scalesWith: "{a} เพิ่มตาม {b}",

  stats: {
    "PHY ATK": "PHY ATK",
    "MAG ATK": "MAG ATK",
    "PHY DEF": "PHY DEF",
    "MAG DEF": "MAG DEF",
    "Crit Rate": "Crit Rate",
    "Crit DMG": "Crit DMG",
    "Max HP": "HP สูงสุด",
    "Max MP": "MP สูงสุด",
    "EXP▲": "EXP▲",
    "Boss ATK": "Boss ATK",
    "Final DMG Increase": "เพิ่ม Final DMG",
    "DEF Ignore Rate": "อัตราเจาะเกราะ (DEF Ignore)",

    "Crit ATK": "Crit ATK",
    ACC: "ความแม่นยำ (ACC)",
    EVD: "การหลบหลีก (EVD)",
    "EXP Increase": "เพิ่ม EXP",
    "Item Drop Rate Increase": "เพิ่มอัตราดรอปไอเทม",
    "Meso Acquisition Increase": "เพิ่มการได้รับเมโซ",
    "Meso Acquisition Rate Increase": "เพิ่มอัตราการได้รับเมโซ",
    "Crit DMG (%)": "Crit DMG (%)",
    "Crit DMG RES": "ต้านทาน Crit DMG",
    "Crit Decrease": "ลดคริติคอล",
    "Boss DEF Increase": "เพิ่ม Boss DEF",
    "Boss ATK Increase": "เพิ่ม Boss ATK",
    "Boss ATK Increase (%)": "เพิ่ม Boss ATK (%)",
    "PHY DMG Increase": "เพิ่ม PHY DMG",
    "MAG DMG Increase": "เพิ่ม MAG DMG",
    "PHY ATK Increase": "เพิ่ม PHY ATK",
    "MAG ATK Increase": "เพิ่ม MAG ATK",
    "PHY ATK(%)": "PHY ATK(%)",
    "MAG ATK(%)": "MAG ATK(%)",
    "PHY DEF Increase": "เพิ่ม PHY DEF",
    "MAG DEF Increase": "เพิ่ม MAG DEF",
    "PHY DMG Reduction": "ลดความเสียหายกายภาพ",
    "MAG DMG Reduction": "ลดความเสียหายเวทมนตร์",
    "SPD Increase": "เพิ่มความเร็ว",
    "HP Recovery Increase": "เพิ่มการฟื้นฟู HP",
    "MP Recovery Increase": "เพิ่มการฟื้นฟู MP",
  },

  parts: {
    Weapon: "อาวุธ",
    "Secondary Weapon": "อาวุธรอง",
    Signet: "ตราสัญลักษณ์",
    Hat: "หมวก",
    Outfit: "ชุดเต็มตัว",
    Top: "เสื้อ",
    Bottom: "กางเกง",
    Gloves: "ถุงมือ",
    Shoes: "รองเท้า",
    Shoulder: "สนับไหล่",
    Shoulders: "สนับไหล่",
    Belt: "เข็มขัด",
    Cape: "ผ้าคลุม",
    "Mechanical Heart": "หัวใจกลไก",
    Pendant: "สร้อยคอ",
    Ring: "แหวน",
    Earrings: "ต่างหู",
    Pocket: "ไอเทมกระเป๋า",
    Android: "แอนดรอยด์",
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
    "Fruity Yogurt": "โยเกิร์ตผลไม้",
    "Buckwheat Jelly": "เยลลี่บัควีท",
    "Grape Juice": "น้ำองุ่น",
    "Buttery Roasted Squid": "ปลาหมึกย่างเนย",
    "Boss Rush Boost Potion": "ยาเพิ่มพลัง Boss Rush",
    "Fried Shrimp": "กุ้งทอด",
    "Baby Chick Cookie": "คุกกี้ลูกเจี๊ยบ",
    "Candy Basket": "ตะกร้าลูกอม",
    "Pumpkin Pieces": "ฟักทองชิ้น",
    "Candy Cane": "ลูกกวาดไม้เท้า",
    "Pure Water": "น้ำบริสุทธิ์",
    "Carrot Juice": "น้ำแครอท",
    "Very Special Sundae": "ซันเดพิเศษสุด",
    Chestnut: "เกาลัด",
    "Rice Cake Soup": "ซุปต๊อก",
    "Cold Jellyfish Salad": "ยำแมงกะพรุน",
    Escargot: "หอยทากอบเนย",
    "Noodle Soup With Mushroom": "ซุปเส้นเห็ด",
    "Stir-Fried Pork": "หมูผัด",
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

export default th;
