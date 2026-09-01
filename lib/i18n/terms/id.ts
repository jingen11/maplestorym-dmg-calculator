import type { Terms } from "./en";

// Indonesian. Stat abbreviations that MapleStory M shows in English
// (PHY ATK, Crit DMG…) are kept as-is so the table matches the in-game stat
// window; descriptive terms and item names are translated.

const id: Terms = {
  scalesWith: "{a} naik seiring {b}",

  stats: {
    "PHY ATK": "PHY ATK",
    "MAG ATK": "MAG ATK",
    "PHY DEF": "PHY DEF",
    "MAG DEF": "MAG DEF",
    "Crit Rate": "Crit Rate",
    "Crit DMG": "Crit DMG",
    "Max HP": "HP Maks",
    "Max MP": "MP Maks",
    "EXP▲": "EXP▲",
    "Boss ATK": "Boss ATK",
    "Final DMG Increase": "Peningkatan Final DMG",
    "DEF Ignore Rate": "Rasio Abaikan Pertahanan",

    "Crit ATK": "Crit ATK",
    ACC: "Akurasi (ACC)",
    EVD: "Penghindaran (EVD)",
    "EXP Increase": "Peningkatan EXP",
    "Item Drop Rate Increase": "Peningkatan Rasio Drop Item",
    "Meso Acquisition Increase": "Peningkatan Perolehan Meso",
    "Meso Acquisition Rate Increase": "Peningkatan Rasio Perolehan Meso",
    "Crit DMG (%)": "Crit DMG (%)",
    "Crit DMG RES": "Resistansi Crit DMG",
    "Crit Decrease": "Penurunan Crit",
    "Boss DEF Increase": "Peningkatan Boss DEF",
    "Boss ATK Increase": "Peningkatan Boss ATK",
    "Boss ATK Increase (%)": "Peningkatan Boss ATK (%)",
    "PHY DMG Increase": "Peningkatan PHY DMG",
    "MAG DMG Increase": "Peningkatan MAG DMG",
    "PHY ATK Increase": "Peningkatan PHY ATK",
    "MAG ATK Increase": "Peningkatan MAG ATK",
    "PHY ATK(%)": "PHY ATK(%)",
    "MAG ATK(%)": "MAG ATK(%)",
    "PHY DEF Increase": "Peningkatan PHY DEF",
    "MAG DEF Increase": "Peningkatan MAG DEF",
    "PHY DMG Reduction": "Pengurangan Damage Fisik",
    "MAG DMG Reduction": "Pengurangan Damage Sihir",
    "SPD Increase": "Peningkatan Kecepatan",
    "HP Recovery Increase": "Peningkatan Pemulihan HP",
    "MP Recovery Increase": "Peningkatan Pemulihan MP",
  },

  parts: {
    Weapon: "Senjata",
    "Secondary Weapon": "Senjata Sekunder",
    Signet: "Signet",
    Hat: "Topi",
    Outfit: "Setelan",
    Top: "Baju Atas",
    Bottom: "Celana",
    Gloves: "Sarung Tangan",
    Shoes: "Sepatu",
    Shoulder: "Pelindung Bahu",
    Shoulders: "Pelindung Bahu",
    Belt: "Sabuk",
    Cape: "Jubah",
    "Mechanical Heart": "Jantung Mekanik",
    Pendant: "Kalung",
    Ring: "Cincin",
    Earrings: "Anting",
    Pocket: "Item Saku",
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
    "Fruity Yogurt": "Yogurt Buah",
    "Buckwheat Jelly": "Jeli Soba",
    "Grape Juice": "Jus Anggur",
    "Buttery Roasted Squid": "Cumi Panggang Mentega",
    "Boss Rush Boost Potion": "Ramuan Boost Boss Rush",
    "Fried Shrimp": "Udang Goreng",
    "Baby Chick Cookie": "Kue Anak Ayam",
    "Candy Basket": "Keranjang Permen",
    "Pumpkin Pieces": "Potongan Labu",
    "Candy Cane": "Permen Tongkat",
    "Pure Water": "Air Murni",
    "Carrot Juice": "Jus Wortel",
    "Very Special Sundae": "Sundae Sangat Spesial",
    Chestnut: "Kastanye",
    "Rice Cake Soup": "Sup Kue Beras",
    "Cold Jellyfish Salad": "Salad Ubur-Ubur Dingin",
    Escargot: "Escargot",
    "Noodle Soup With Mushroom": "Sup Mi Jamur",
    "Stir-Fried Pork": "Tumis Daging Babi",
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

export default id;
