import type { Terms } from "./en";

// Korean. Follows the vocabulary of the Korean client (메이플스토리M):
// 잠재능력 / 에디셔널 잠재능력 for potential / bonus potential, 크리티컬 rather
// than 치명타, and 보스 공격력 for the boss stat.

const ko: Terms = {
  scalesWith: "{b}에 비례한 {a}",

  stats: {
    "PHY ATK": "물리 공격력",
    "MAG ATK": "마법 공격력",
    "PHY DEF": "물리 방어력",
    "MAG DEF": "마법 방어력",
    "Crit Rate": "크리티컬 확률",
    "Crit DMG": "크리티컬 데미지",
    "Max HP": "최대 HP",
    "Max MP": "최대 MP",
    "EXP▲": "경험치▲",
    "Boss ATK": "보스 공격력",
    "Final DMG Increase": "최종 데미지 증가",
    "DEF Ignore Rate": "방어율 무시",

    "Crit ATK": "크리티컬 공격력",
    ACC: "명중",
    EVD: "회피",
    "EXP Increase": "경험치 증가",
    "Item Drop Rate Increase": "아이템 드롭률 증가",
    "Meso Acquisition Increase": "메소 획득량 증가",
    "Meso Acquisition Rate Increase": "메소 획득률 증가",
    "Crit DMG (%)": "크리티컬 데미지 (%)",
    "Crit DMG RES": "크리티컬 데미지 저항",
    "Crit Decrease": "크리티컬 감소",
    "Boss DEF Increase": "보스 방어력 증가",
    "Boss ATK Increase": "보스 공격력 증가",
    "Boss ATK Increase (%)": "보스 공격력 증가 (%)",
    "PHY DMG Increase": "물리 데미지 증가",
    "MAG DMG Increase": "마법 데미지 증가",
    "PHY ATK Increase": "물리 공격력 증가",
    "MAG ATK Increase": "마법 공격력 증가",
    "PHY ATK(%)": "물리 공격력(%)",
    "MAG ATK(%)": "마법 공격력(%)",
    "PHY DEF Increase": "물리 방어력 증가",
    "MAG DEF Increase": "마법 방어력 증가",
    "PHY DMG Reduction": "물리 데미지 감소",
    "MAG DMG Reduction": "마법 데미지 감소",
    "SPD Increase": "이동 속도 증가",
    "HP Recovery Increase": "HP 회복량 증가",
    "MP Recovery Increase": "MP 회복량 증가",
  },

  parts: {
    Weapon: "무기",
    "Secondary Weapon": "보조 무기",
    Signet: "엠블렘",
    Hat: "모자",
    Outfit: "한벌옷",
    Top: "상의",
    Bottom: "하의",
    Gloves: "장갑",
    Shoes: "신발",
    Shoulder: "어깨장식",
    Shoulders: "어깨장식",
    Belt: "벨트",
    Cape: "망토",
    "Mechanical Heart": "기계 심장",
    Pendant: "펜던트",
    Ring: "반지",
    Earrings: "귀고리",
    Pocket: "포켓 아이템",
    Android: "안드로이드",
  },

  ranks: {
    Rare: "레어",
    Epic: "에픽",
    Unique: "유니크",
    Legendary: "레전드리",
    Mythic: "미스틱",
  },

  cubeNames: {
    "Occult Cube / Red Cube": "수상한 큐브 / 레드 큐브",
    "Black Cube / Choice Cube": "블랙 큐브 / 초이스 큐브",
    "Bonus Mystical Cube / Bonus Potential Cube":
      "수상한 에디셔널 큐브 / 에디셔널 큐브",
    "Bonus Bright Cube / Bonus Choice Cube":
      "브라이트 에디셔널 큐브 / 초이스 에디셔널 큐브",
  },

  foods: {
    "Fruity Yogurt": "과일 요거트",
    "Buckwheat Jelly": "메밀묵",
    "Grape Juice": "포도 주스",
    "Buttery Roasted Squid": "버터 오징어구이",
    "Boss Rush Boost Potion": "보스 러시 부스트 포션",
    "Fried Shrimp": "새우튀김",
    "Baby Chick Cookie": "병아리 쿠키",
    "Candy Basket": "사탕 바구니",
    "Pumpkin Pieces": "호박 조각",
    "Candy Cane": "캔디 케인",
    "Pure Water": "순수한 물",
    "Carrot Juice": "당근 주스",
    "Very Special Sundae": "스페셜 선데",
    Chestnut: "밤",
    "Rice Cake Soup": "떡국",
    "Cold Jellyfish Salad": "해파리 냉채",
    Escargot: "에스카르고",
    "Noodle Soup With Mushroom": "버섯 국수",
    "Stir-Fried Pork": "제육볶음",
  },

  foodEffects: {
    "Phys Att": "물리 공격력",
    "Mag Att": "마법 공격력",
    "Boss Att": "보스 공격력",
    "Phys Dmg": "물리 데미지",
    "Mag Dmg": "마법 데미지",
    "Crit Rate": "크리티컬 확률",
    "Crit Dmg": "크리티컬 데미지",
  },
};

export default ko;
