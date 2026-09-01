import type { Dictionary } from "./en";

const vi: Dictionary = {
  nav: {
    damage: "Sát thương",
    flames: "Flame",
    cubes: "Cube",
    language: "Ngôn ngữ",
    skipToContent: "Bỏ qua, tới nội dung chính",
  },

  footer: {
    basedOn:
      "Dựa trên bảng tính cộng đồng “{name}” (cập nhật lần cuối {date}). Ghi công:",
    disclaimer:
      "{site} là công cụ do người hâm mộ tạo ra và không có liên kết với Nexon. MapleStory M là thương hiệu của Nexon Co., Ltd.",
    lastUpdated: "30 tháng 7 năm 2024",
  },

  credits: {
    Paulpork: "công thức sát thương",
    櫻櫻美代套子: "bản tính chỉ số sau buff đầu tiên",
    KaitouKiddo: "bản tính sát thương + huy hiệu đầu tiên",
    "殘風⎝( OωO)⎠": "thử nghiệm tỷ lệ chí mạng và giới hạn sát thương",
    Whaku: "bản thân bảng tính, cùng các thử nghiệm tỷ lệ chí mạng",
    S3phy: "cập nhật bảng tính",
    Noodlesoup: "thử nghiệm và đối chiếu dữ liệu thực tế",
    Astralmist: "giá trị phòng thủ khai thác từ dữ liệu game và công thức",
  },

  site: {
    description:
      "Công cụ miễn phí cho người chơi MapleStory M. Bảng tính sát thương hiển thị sát thương mỗi đòn lên quái thường và boss, kèm hệ số chênh lệch cấp độ, phòng thủ của boss (IED) và buff thức ăn, cùng bảng xác suất Rebirth Flame và Cube tương tác dựng từ công bố chính thức của Nexon.",
  },

  common: {
    moreTools: "Công cụ khác",
    guide: "Hướng dẫn",
    notes: "Ghi chú",
    filterOptions: "Lọc tùy chọn",
    option: "Tùy chọn",
    clear: "xóa",
    noMatch: "Không có tùy chọn nào khớp với “{query}”.",
    workedExample: "Ví dụ minh họa",
    readingTheTable: "Cách đọc bảng",
    beforeYouSpend: "Trước khi bạn đầu tư",
    howToUse: "Cách dùng bảng này",
    equipmentPart: "Bộ phận trang bị",
    forACoinFlip: "để đạt tỷ lệ 50/50",
    dash: "—",
  },

  home: {
    metaTitle: "Tính sát thương MapleStory M — Boss, IED & Chí mạng",
    metaDescription:
      "Nhập chỉ số MapleStory M, xem ngay sát thương mỗi đòn lên quái và boss — đã tính phạt chênh cấp, phòng thủ boss (IED), khoảng chí mạng và buff thức ăn.",
    h1: "Bảng tính sát thương MapleStory M",
    intro:
      "Nhập chỉ số từ bảng chỉ số trong game để xem sát thương lên quái và lên boss cạnh nhau — thường, chí mạng và trung bình mỗi đòn, đã tính cả phạt cấp độ, phòng thủ boss và buff thức ăn. Thử một thay đổi chỉ số trước khi tiêu meso; dữ liệu bạn nhập được lưu trong trình duyệt.",
    flamesLink: "Xác suất Rebirth Flame →",
    flamesBlurb:
      "Bảng flame chính thức của Nexon, ở dạng tương tác. Chọn những tùy chọn bạn muốn và xem tỷ lệ thật mỗi lần flame — cùng số lần flame cần bỏ ra.",
    cubesLink: "Xác suất Cube →",
    cubesBlurb:
      "Tỷ lệ tiềm năng và tiềm năng cộng thêm cho mọi bộ phận trang bị và mọi bậc, kèm số cube cần để ra dòng bạn muốn.",
    damageLink: "Bảng tính sát thương →",
    damageBlurb:
      "Sát thương mỗi đòn lên quái và boss, đã tính phạt cấp độ, phòng thủ boss và buff thức ăn.",
    faq: [
      {
        question: "Sát thương trong MapleStory M được tính như thế nào?",
        answer:
          "Một đòn đánh bằng Attack × (1 + Damage %) × (1 + Attack %) × Skill % × (1 + Final Damage %). Khi đánh boss, Boss Attack % × Skill % được cộng vào cụm Attack %, và kết quả còn bị giảm thêm bởi hệ số chênh lệch cấp độ cùng phòng thủ của boss (PDR) sau khi trừ tỷ lệ bỏ qua phòng thủ của bạn. Các công thức lấy từ bảng tính cộng đồng Damage & Emblem Calculator, đã được kiểm chứng bằng thử nghiệm trong game và giá trị phòng thủ khai thác từ dữ liệu game.",
      },
      {
        question:
          "Vì sao sát thương lên boss của tôi thấp hơn nhiều so với lên quái?",
        answer:
          "Có hai mức giảm chỉ áp dụng cho boss: hệ số chênh lệch cấp độ dựa trên các chỉ số phòng thủ khai thác từ dữ liệu game (đánh mục tiêu cao cấp hơn bạn sẽ mất rất nhiều sát thương), và phòng thủ của boss (PDR) — thứ cắt đi một phần sát thương trừ khi bạn cộng dồn tỷ lệ bỏ qua phòng thủ. Mở “Chi tiết sát thương lên boss” trong thẻ kết quả để xem từng giai đoạn.",
      },
      {
        question: "Nên ưu tiên Tỷ lệ chí mạng hay Sát thương chí mạng?",
        answer:
          "Hai chỉ số này nhân lên lẫn nhau: Sát thương chí mạng vô nghĩa nếu không có Tỷ lệ chí mạng, và ngược lại. Đòn chí mạng còn cộng ngẫu nhiên thêm 0–50% lên trên Crit Damage của bạn — bảng tính hiển thị mức thấp nhất, trung vị và cao nhất của lần random đó. Hãy so sát thương trung bình trước và sau khi đổi chỉ số để quyết định.",
      },
      {
        question: "Tỷ lệ bỏ qua phòng thủ (IED) hoạt động ra sao?",
        answer:
          "Tỷ lệ bỏ qua phòng thủ làm giảm mức cắt sát thương đến từ phòng thủ của boss (PDR). Các nguồn cộng dồn theo phép nhân chứ không phải phép cộng: DIR trong bảng chỉ số, Node IED (+15% khi node của kỹ năng đạt Lv 40) và Defense Smash 4 (+25%) kết hợp theo 1 − (1−a)(1−b)(1−c).",
      },
      {
        question: "Chỉ số nào cho tôi nhiều sát thương nhất?",
        answer:
          "Không có câu trả lời chung — các cụm trong công thức nhân với nhau, nên chỉ số bạn đang thiếu nhất thường là chỉ số đáng giá nhất. Bảng “Hiệu quả chỉ số” trả lời cho đúng build của bạn: nó nâng từng chỉ số một và cho biết phần trăm sát thương tăng thêm lên quái thường và lên boss, để bạn so một dòng flame, một dòng tiềm năng và một emblem trên cùng một thước đo.",
      },
      {
        question: "Buff thức ăn trong MapleStory M có cộng dồn không?",
        answer:
          "Buff thức ăn thường loại trừ lẫn nhau theo từng hiệu ứng — ăn món thứ hai cùng chỉ số sẽ thay thế món đầu, nhưng các chỉ số khác nhau thì kết hợp được. Một vài món đặc biệt (Boss Rush Boost Potion, Noodle Soup With Mushroom, Stir-Fried Pork, Escargot, Cold Jellyfish Salad) cộng dồn được với buff thường và với nhau. Mục Thức ăn mô phỏng đúng quy tắc này.",
      },
    ],
  },

  damage: {
    ariaCalculator: "Bảng tính sát thương",
    panelMob: "Quái thường",
    panelMobShort: "Quái thường",
    panelBoss: "Boss",
    panelBossShort: "Boss",
    averageHit: "{target} — sát thương trung bình mỗi đòn",
    bounds: "cận dưới – cận trên",
    atCap: "MAX",
    atCapHint:
      "Đòn này đã chạm trần sát thương của bạn — các con số phía trên là mức trần cho phép, không phải mức chỉ số của bạn tạo ra.",
    stepGain: "(+{percent}% · +{value})",
    stepGainHint:
      "Đòn đánh này sẽ thành bao nhiêu khi áp dụng cùng lúc toàn bộ mức tăng trong bảng Hiệu quả chỉ số.",
    normal: "Thường",
    critical: "Chí mạng",
    crit: "Chí mạng",
    critRoll: "thấp nhất – cao nhất",
    breakdown: "Chi tiết sát thương lên boss",
    stageRaw: "Công thức gốc",
    stageLevel: "Sau hệ số cấp độ",
    stageIed: "Sau phòng thủ boss (IED)",

    setup: "Thiết lập nhân vật",

    attackType: {
      pair: "Phys/Mag",
      pairPhys: "Phys",
      pairMag: "Mag",
      soloPhys: "Phys Atk",
      soloMag: "Mag Atk",
    },

    myStats: "Chỉ số của tôi",
    physicalClass: "Class vật lý",
    magicalClass: "Class phép",
    myStatsHint:
      "Nhập chỉ số gốc ở đây. Không tính buff thức ăn và buff tổ đội. Có tính buff tự thân.",
    toggleAria: "Chuyển giữa tấn công vật lý và tấn công phép",

    skill: "Kỹ năng",
    nodes: "Node",
    nodeIed: "Node IED",
    nodeIedHint:
      "+15% tỷ lệ bỏ qua phòng thủ — kích hoạt khi node của kỹ năng đạt Lv 40. Chỉ tích ô này nếu node của bạn từ Lv 40 trở lên.",
    defenseSmash4: "Defense Smash 4",
    defenseSmash4Hint: "+25% tỷ lệ bỏ qua phòng thủ",
    finalDir: "Tỷ lệ bỏ qua phòng thủ cuối cùng:",
    finalDirHint:
      "— các nguồn cộng dồn theo phép nhân, rồi mới làm giảm phòng thủ của boss (PDR).",

    target: "Mục tiêu",
    targetHint:
      "Những giá trị này chỉ ảnh hưởng đến sát thương lên boss — sát thương lên quái không bị giảm bởi cấp độ và phòng thủ.",

    modifiers: "Hệ số cộng thêm",
    modifiersHint:
      "Chỉ nhập phần thưởng từ hyper skill, cộng thêm lên chỉ số gốc của bạn. Buff tự thân và buff tổ đội thuộc về phần chỉ số gốc; thức ăn có mục riêng.",
    modifierHint: "Cộng thêm lên {label} gốc của bạn",

    food: "Thức ăn",
    foodHint:
      "Buff thức ăn thường loại trừ lẫn nhau theo từng hiệu ứng — chọn món thứ hai cùng chỉ số sẽ thay thế món đầu. Các chỉ số khác nhau thì kết hợp được.",
    foodStackHint: "Những món này cộng dồn được với buff thường và với nhau.",

    efficiency: {
      title: "Hiệu quả chỉ số",
      intro:
        "Một dòng mới thực sự đem lại bao nhiêu sát thương. Mỗi dòng nâng một chỉ số trong bảng chỉ số của bạn và cho thấy phần sát thương tăng thêm — trước khi cube, flame hay đổi emblem, bạn thấy ngay dòng nào đáng theo đuổi. Đặt mức tăng bằng giá trị bạn có thể quay trúng rồi đọc hai cột bên phải.",
      stat: "Chỉ số",
      step: "Mức tăng",
      mob: "Quái thường",
      boss: "Boss",
      best: "Tốt nhất",
      bestAria: "Tăng sát thương lên boss nhiều nhất",
      none: "Không có tác dụng với mục tiêu này",
      capped: "Crit Rate đã chạm trần 100%, cộng thêm cũng vô ích.",
      note: "Chỉ tính từ chỉ số gốc của bạn — không gồm buff thức ăn và hyper skill, vì quay lại chỉ đổi bảng chỉ số của bạn chứ không đổi các buff nằm bên trên. Mỗi dòng chạy lại toàn bộ công thức với đúng một chỉ số được nâng lên; các cụm nhân với nhau nên những con số này thay đổi theo đồ của bạn. Chúng so các chỉ số ở cùng một mức tăng, không tính chi phí để có được chúng.",
      ariaTable: "Sát thương tăng thêm theo từng chỉ số",
    },

    fields: {
      physAtk: {
        label: "Phys Atk",
        hint: "Phys/Mag Atk dạng số từ bảng chỉ số",
      },
      atkPercent: {
        label: "Phys/Mag Atk",
        hint: "Tổng Phys/Mag Atk % từ bảng chỉ số",
      },
      dmgPercent: {
        label: "Phys/Mag Dmg",
        hint: "Tổng Phys/Mag Dmg % từ bảng chỉ số",
      },
      bossAtkPercent: {
        label: "Boss Atk",
        hint: "Chỉ áp dụng khi mục tiêu là boss",
      },
      critRatePercent: {
        label: "Crit Rate",
        hint: "Tỷ lệ tung ra đòn chí mạng (tối đa 100%)",
      },
      critDmgPercent: {
        label: "Crit Dmg",
        hint: "Sát thương cộng thêm khi chí mạng",
      },
      finalDmgPercent: {
        label: "Final Dmg",
        hint: "Tổng Final Dmg % từ bảng chỉ số",
      },
      statDefIgnoreRatePercent: {
        label: "Tỷ lệ bỏ qua phòng thủ",
        hint: "Từ bảng chỉ số — cộng dồn với các nguồn DIR từ node",
      },
      maxDamage: {
        label: "Sát thương tối đa",
        hint: "Trần sát thương của bạn — chỉ giới hạn đòn chí mạng. Để 0 nếu không có trần",
      },
      skillPercent: {
        label: "Sát thương kỹ năng",
        hint: "Damage % của dòng kỹ năng bạn đang thử",
      },
      skillFinalDmgPercent: {
        label: "Final Dmg",
        hint: "Từ phần nâng cấp kỹ năng — nhập giá trị ứng với cấp của bạn",
      },
      characterLevel: {
        label: "Cấp nhân vật",
        hint: "Cấp độ hiện tại của bạn",
      },
      monsterLevel: {
        label: "Cấp quái",
        hint: "Quái cấp cao hơn sẽ làm giảm sát thương của bạn",
      },
      bossPdrPercent: {
        label: "Phòng thủ boss (PDR)",
        hint: "Phần sát thương bị phòng thủ của boss cắt đi — giảm nhờ tỷ lệ bỏ qua phòng thủ",
      },
      monsterCritResPercent: {
        label: "Kháng chí mạng của quái",
        hint: "Trừ vào Crit Rate của bạn trước khi chạm trần 100%",
      },
    },
  },

  flames: {
    metaTitle: "Tỷ lệ Rebirth Flame MapleStory M & số flame cần",
    metaDescription:
      "Xem tỷ lệ thật mỗi lần flame và cần bao nhiêu flame mới ra — mọi tùy chọn Rebirth Flame MapleStory M theo bộ phận và bậc, từ tỷ lệ chính thức của Nexon.",
    h1: "Xác suất Rebirth Flame",
    intro:
      "Bảng Rebirth Flame chính thức của Nexon, ở dạng tương tác. Chọn bộ phận trang bị và bậc flame, chạm vào những giá trị bạn thực sự muốn, rồi xem tỷ lệ mỗi lần flame — cùng số lần flame cần để đạt mức 50/50 hoặc gần như chắc chắn.",

    ariaTable: "Xác suất Rebirth Flame",
    perOptionSlot: "Mỗi ô tùy chọn",
    perFlame: "Mỗi lần flame",
    perFlameAll: "Tất cả, mỗi lần flame",
    perFlameGroup: "Theo nhóm, mỗi lần flame",
    for50: "Số flame để đạt 50%",
    for90: "Số flame để đạt 90%",
    tapHint: "Chạm vào bất kỳ giá trị nào bên dưới để chọn tùy chọn bạn muốn.",
    selectedOne: "Đã chọn {count} dòng · {two}% cơ hội có tùy chọn thứ 2",
    selectedOther: "Đã chọn {count} dòng · {two}% cơ hội có tùy chọn thứ 2",
    selectedAllOne: "Cần {count} dòng · {two}% cơ hội có tùy chọn thứ 2",
    selectedAllOther:
      "Cần đủ {count} dòng cùng lúc · {two}% cơ hội có tùy chọn thứ 2",
    selectedGroupOne:
      "Cần {count} tùy chọn thuộc nhóm {options} dòng đã chọn · {two}% cơ hội có tùy chọn thứ 2",
    selectedGroupOther:
      "Cần {count} tùy chọn thuộc nhóm {options} dòng đã chọn · {two}% cơ hội có tùy chọn thứ 2",
    matchLabel: "Thế nào là trúng",
    matchAny: "Bất kỳ",
    matchAll: "Tất cả",
    matchGroup: "Đếm theo nhóm",
    matchAnyHint: "Ít nhất một dòng đã chọn xuất hiện trên flame.",
    matchAllHint:
      "Mọi dòng đã chọn phải cùng xuất hiện trên một flame. Chạm lại một giá trị để yêu cầu nó ở cả hai ô tùy chọn — một flame có thể ra cùng một dòng hai lần.",
    matchGroupHint:
      "Các lựa chọn của bạn tính là một nhóm, và chỉ số tùy chọn rơi vào nhóm đó mới quan trọng — không cần biết là dòng nào. Chọn hết những dòng bạn chấp nhận rồi yêu cầu 2, bạn sẽ có tỷ lệ ra flame mà cả hai tùy chọn đều dùng được.",
    groupNeedLabel: "Số tùy chọn thuộc nhóm",
    groupNeedOne: "{count} tùy chọn",
    groupNeedOther: "{count} tùy chọn",
    groupNeedTwoHint:
      "Cả hai tùy chọn đều thuộc nhóm thì phải ra hai tùy chọn, nên tỷ lệ tùy chọn thứ hai của bậc là trần cứng cho con số này.",
    allImpossible:
      "Một flame chỉ ra tối đa 2 tùy chọn, nên {count} dòng cùng lúc là không thể.",
    setup: "Thiết lập flame",
    tier: "Bậc Rebirth Flame",
    eternal: "Eternal Rebirth Flame",
    eternalHint:
      "— luôn ra 2 tùy chọn. Giá trị vẫn lấy theo bậc đã chọn ở trên.",
    searchPlaceholder: "ví dụ Boss ATK, Crit DMG, Final DMG",
    anyValue: "Giá trị bất kỳ",
    best: "Tốt nhất",
    tableTitle: "{slot} — {rarity}",
    tableFootnote:
      "Mỗi tùy chọn ra một trong bốn giá trị với khả năng ngang nhau — nên một giá trị đơn lẻ bằng “giá trị bất kỳ” ÷ 4. Giá trị xếp từ tốt nhất trở xuống. Tổng tất cả các dòng là {total}%; Nexon làm tròn từng mục đến hai chữ số thập phân.",
    cellAria: "{option}, bậc {grade}: {value}% với tỷ lệ {prob}%",
    cellAriaStack:
      "{option}, bậc {grade}: {value}% với tỷ lệ {prob}%, cần trên {count} ô tùy chọn",
    stackBadge: "×{count}",
    noteIndependent:
      "“Mỗi lần flame” giả định hai tùy chọn được quay độc lập — Nexon không công bố liệu tùy chọn thứ hai có thể trùng với tùy chọn đầu hay không.",
    noteSource: "Dữ liệu từ {link}, cập nhật lần cuối {date}.",
    sourceLabel: "Công bố xác suất chính thức của Nexon — Rebirth Flame",
    dataNotes: [
      "Phạm vi tùy chọn có thể ra khác nhau tùy theo bộ phận trang bị được dùng Rebirth Flame.",
      "Khi dùng Rebirth Flame có thể ra tối đa 2 tùy chọn.",
      "Xác suất được làm tròn đến hai chữ số thập phân, nên tổng một cột có thể không đúng bằng 100%.",
    ],

    steps: [
      {
        title: "Chọn bộ phận trang bị",
        body: "Mỗi bộ phận quay từ nhóm tùy chọn riêng — vũ khí ra các dòng theo lực tấn công, giáp ra các dòng theo lực phòng thủ. Đổi bộ phận sẽ dựng lại toàn bộ bảng.",
      },
      {
        title: "Chọn bậc flame",
        body: "Bậc quyết định cả giá trị của tùy chọn lẫn cơ hội ra tùy chọn thứ hai. Hãy tích Eternal Rebirth Flame nếu bạn dùng loại đó — nó luôn ra hai tùy chọn, với giá trị của bậc bạn đã chọn.",
      },
      {
        title: "Chạm vào giá trị bạn muốn",
        body: "Chạm một giá trị để nhắm đúng mức đó, hoặc chạm tên tùy chọn để chọn cả bốn giá trị cùng lúc. Chọn càng nhiều dòng thì mục tiêu càng dễ, không bao giờ khó hơn.",
      },
      {
        title: "Đọc tỷ lệ của bạn",
        body: "Thẻ ở trên cùng cập nhật ngay lập tức: tỷ lệ trên một ô tùy chọn, tỷ lệ thật mỗi lần flame, và số lần flame để xác suất cộng dồn đạt 50% hoặc 90%.",
      },
      {
        title: "Chọn xem thế nào là trúng",
        body: "“Bất kỳ” — mặc định — tính là trúng khi ít nhất một dòng bạn chọn xuất hiện. “Tất cả” đòi mọi dòng đã chọn cùng nằm trên một flame, tức là phải ra hai tùy chọn; chạm lại một giá trị để yêu cầu chính dòng đó ở cả hai ô tùy chọn. “Đếm theo nhóm” xem các lựa chọn của bạn là một nhóm và chỉ hỏi có bao nhiêu tùy chọn của flame rơi vào đó, bất kể là dòng nào. Cả ba cách đọc đều dùng chung bảng đã công bố; chỉ có câu hỏi là khác.",
      },
      {
        title: "Dùng chế độ nhóm cho “cả hai tùy chọn đều dùng được”",
        body: "Tích mọi dòng bạn thấy chấp nhận được, chuyển sang “Đếm theo nhóm” và yêu cầu 2. Đó mới đúng là câu hỏi khi flame — không phải “có ra đúng dòng này không?” mà là “cả hai tùy chọn có dùng được không?”. Yêu cầu 1 sẽ cho đúng con số của “Bất kỳ”, vì một tùy chọn thuộc nhóm chính là một dòng đã chọn xuất hiện. Yêu cầu 2 thì phải ra hai tùy chọn, nên tỷ lệ tùy chọn thứ hai của bậc là trần cứng.",
      },
    ],

    exampleIntro: "Trên {slot} với flame {rarity}, khi săn {option}:",
    exampleBest: "Chỉ lấy mức cao nhất ({value})",
    exampleAny: "Bất kỳ giá trị nào trong {count} mức",
    examplePerFlame: "{chance} mỗi lần flame · ",
    exampleFlames: "{count} lần flame",
    exampleGap:
      "Khoảng cách đó chính là lựa chọn mà đa số người chơi thật sự đang cân nhắc. Cố chờ mức cao nhất tốn khoảng {ratio} lần số flame so với việc chấp nhận bất kỳ mức nào của tùy chọn đó.",

    readAnyValue:
      "Giá trị bất kỳ là tỷ lệ ra được tùy chọn đó nói chung, bất kể bạn nhận mức nào trong bốn giá trị.",
    readAnyValueTerm: "Giá trị bất kỳ",
    readGrades:
      "Tốt nhất → #4 là bốn giá trị có thể ra, mạnh nhất xếp trước. Cả bốn đều có khả năng ngang nhau, nên một giá trị đơn lẻ luôn bằng “giá trị bất kỳ” ÷ 4.",
    readGradesTerm: "Tốt nhất → #4",
    readSlots:
      "Mỗi ô tùy chọn là tỷ lệ trên một lần quay; mỗi lần flame cao hơn vì một lần flame có thể ra tùy chọn thứ hai.",
    readSlotsTerm: "Mỗi ô tùy chọn",
    readSlotsTerm2: "mỗi lần flame",
    readModes:
      "Bất kỳ tính là trúng khi một dòng đã chọn xuất hiện; Tất cả đòi mọi dòng đã chọn cùng nằm trên một flame, và tiêu đề đổi thành “Tất cả, mỗi lần flame”. Nhãn ×2 trên một giá trị nghĩa là bạn yêu cầu nó ở cả hai ô tùy chọn. Đếm theo nhóm bỏ qua việc ra dòng nào và đếm xem có bao nhiêu tùy chọn đến từ lựa chọn của bạn, hiển thị “Theo nhóm, mỗi lần flame”.",

    spendPity:
      "Không có cơ chế bảo hiểm. Lần flame thứ {count} có tỷ lệ y hệt lần đầu tiên — “số flame để đạt 50%” mô tả phân bố trên nhiều người chơi, không phải bộ đếm ngược cho riêng bạn.",
    spendAny:
      "Chọn nhiều dòng nghĩa là Bất kỳ dòng nào trong số đó, cho tới khi bạn chuyển sang Tất cả. Ra được hai tùy chọn cụ thể trên cùng một flame là chuyện hiếm hơn nhiều, vì nó chỉ xảy ra khi quay ra hai tùy chọn.",
    spendStack:
      "Yêu cầu cùng một dòng ở cả hai ô tùy chọn còn hiếm hơn nữa — nó bình phương tỷ lệ của riêng dòng đó — và ba dòng cùng lúc là không thể, vì một flame không bao giờ ra quá hai tùy chọn.",
    spendTier:
      "Các con số giả định mọi lần flame đều đúng bậc bạn đã chọn. Flame bậc Rare không bao giờ ra được tùy chọn thứ hai.",

    sim: {
      title: "Mô phỏng roll",
      intro:
        "Roll trên chính bảng xác suất đã công bố, với những tùy chọn bạn đã chọn ở trên. Nhìn thấy độ dao động thực tế cho bạn biết nhiều hơn con số phần trăm.",
      needPick: "Chọn một tùy chọn ở trên để có mục tiêu roll.",
      rollOnce: "Roll một lần",
      untilHit: "Roll đến khi trúng",
      rollBatch: "Roll 100 lần",
      reset: "Đặt lại",
      empty: "Chưa roll flame nào.",
      hit: "Trúng",
      miss: "Không khớp",
      slot: "Tùy chọn {n}",
      spent: "Số flame đã roll",
      hits: "Số lần trúng",
      observed: "Thực tế",
      expected: "Lý thuyết {chance}%",
      untilHitOne: "Trúng ngay flame đầu tiên.",
      untilHitOther: "Trúng sau {count} flame.",
      vsMedian: "Bảng cho biết mốc 50-50 là {count}.",
      exhausted:
        "Không trúng trong {count} flame — lượt chạy dừng ở giới hạn, không phải vì được đảm bảo.",
      batch: "{hits} lần trúng trong {count} flame.",
      disclaimer:
        "Mô phỏng bằng bộ sinh số ngẫu nhiên của trình duyệt, dựa trên xác suất Nexon đã công bố. Đây không phải RNG của game, và kết quả ở đây không ảnh hưởng đến tài khoản của bạn.",
    },

    howToName: "Cách đọc bảng xác suất Rebirth Flame của MapleStory M",
    howToDescription:
      "Tính ra tỷ lệ thật để quay trúng một tùy chọn Rebirth Flame cụ thể, và cần bao nhiêu lần flame.",
    appName: "Xác suất Rebirth Flame",

    faq: [
      {
        question: "Tỷ lệ ra một tùy chọn Rebirth Flame cụ thể là bao nhiêu?",
        answer:
          "Mỗi dòng tùy chọn có tỷ lệ công bố riêng — phần lớn nằm quanh 1,5–1,7% cho mỗi ô tùy chọn. Chọn những dòng bạn muốn trong bảng, bảng tính sẽ cộng chúng lại, rồi tính thêm cơ hội ra tùy chọn thứ hai để cho ra tỷ lệ thật mỗi lần flame.",
      },
      {
        question: "Tùy chọn thứ hai của Rebirth Flame hoạt động thế nào?",
        answer:
          "Một lần flame thường ra một tùy chọn, kèm cơ hội ra tùy chọn thứ hai tùy theo bậc: 0% với Rare, 0,1% Epic, 0,3% Unique, 3% Legendary và 8% Mythic. Eternal Rebirth Flame thì luôn ra hai tùy chọn.",
      },
      {
        question: "Mọi bộ phận trang bị có chung nhóm tùy chọn flame không?",
        answer:
          "Không. Nhóm tùy chọn có thể ra phụ thuộc vào bộ phận. Vũ khí ra các dòng theo lực tấn công, các bộ phận giáp ra các dòng theo lực phòng thủ, còn Final DMG Increase hay DEF Ignore Rate chỉ xuất hiện ở bậc Legendary và Mythic.",
      },
      {
        question: "Vì sao các xác suất không cộng đúng bằng 100%?",
        answer:
          "Nexon làm tròn mọi mục đến hai chữ số thập phân, nên tổng một cột nhỉnh hơn hoặc thấp hơn 100% một chút. Bảng hiển thị tổng thật của cột để bạn thấy được độ lệch do làm tròn.",
      },
      {
        question: "“Số flame để đạt 50%” nghĩa là gì?",
        answer:
          "Đó là số lần flame bạn cần trước khi xác suất cộng dồn để trúng ít nhất một tùy chọn đã chọn chạm mốc 50%. Nó không phải bảo đảm và cũng không phải đếm ngược — không có cơ chế bảo hiểm, nên mỗi lần flame đều có tỷ lệ y như lần đầu. Đến mốc đó, một nửa số người chơi đã trúng và một nửa thì chưa; con số 90% cho thấy nhóm kém may phải kéo dài đến đâu.",
      },
      {
        question: "Điều gì xảy ra khi tôi chọn nhiều hơn một giá trị?",
        answer:
          "Điều đó phụ thuộc vào chế độ khớp. Ở “Bất kỳ”, các tỷ lệ đã chọn cộng lại với nhau, nên mỗi dòng tích thêm đều làm mục tiêu dễ hơn — một ô tùy chọn chỉ rút đúng một dòng. Ở “Tất cả”, mỗi lựa chọn trở thành một yêu cầu riêng phải cùng xuất hiện trên một flame, vốn hiếm hơn nhiều vì cần một lần quay ra hai tùy chọn.",
      },
      {
        question: "Tỷ lệ ra hai tùy chọn flame cụ thể cùng lúc là bao nhiêu?",
        answer:
          "Chuyển bảng sang “Tất cả”. Hai dòng cụ thể chỉ có thể cùng xuất hiện khi flame ra hai tùy chọn, nên tỷ lệ xấp xỉ bằng cơ hội có tùy chọn thứ hai của bậc đó nhân với tỷ lệ của hai dòng — Eternal Rebirth Flame, vốn luôn ra hai tùy chọn, tốt hơn hẳn cho việc này. Ba dòng cùng lúc là không thể và hiển thị 0%. Chạm lại một giá trị để yêu cầu chính dòng đó ở cả hai ô tùy chọn.",
      },
      {
        question: "Tỷ lệ để cả hai tùy chọn flame đều dùng được là bao nhiêu?",
        answer:
          "Chuyển bảng sang “Đếm theo nhóm”, tích mọi dòng bạn thấy chấp nhận được, rồi yêu cầu 2 tùy chọn thuộc nhóm. Nó đếm xem có bao nhiêu tùy chọn của flame rơi vào lựa chọn của bạn thay vì đòi những dòng cụ thể — đúng câu hỏi mà việc flame thực sự đặt ra. Cách này cần một lần ra hai tùy chọn, nên tỷ lệ tùy chọn thứ hai của bậc là trần cứng — Eternal Rebirth Flame luôn ra hai tùy chọn nên gỡ bỏ hoàn toàn trần đó.",
      },
    ],
  },

  cubes: {
    metaTitle: "Tỷ lệ Cube MapleStory M & số cube cần",
    metaDescription:
      "Xem tỷ lệ thật mỗi cube và cần bao nhiêu cube mới ra — mọi dòng tiềm năng và tiềm năng cộng thêm MapleStory M theo bộ phận và bậc, theo tỷ lệ chính thức Nexon.",
    h1: "Xác suất Cube",
    intro:
      "Bảng tiềm năng và tiềm năng cộng thêm chính thức của Nexon, ở dạng tương tác. Chọn bộ phận, bậc và nhóm dòng, chạm vào những tùy chọn bạn thực sự muốn, rồi xem tỷ lệ mỗi cube — cùng số cube cần để đạt được.",

    ariaTable: "Xác suất Cube",
    onThisLine: "Trên dòng này",
    perCube: "Mỗi cube",
    perCubeAll: "Tất cả, mỗi cube",
    perCubeGroup: "Theo nhóm, mỗi cube",
    for50: "Số cube để đạt 50%",
    for90: "Số cube để đạt 90%",
    tapHint: "Chạm vào những dòng bạn muốn. Lựa chọn áp dụng cho cả hai nhóm.",
    selectedOne: "Đã chọn {count} dòng · Dòng 1 {first}% · Dòng 2/3 {second}%",
    selectedOther:
      "Đã chọn {count} dòng · Dòng 1 {first}% · Dòng 2/3 {second}%",
    selectedAllOne: "Cần {count} dòng trong {lines} dòng",
    selectedAllOther: "Cần đủ {count} dòng cùng lúc trong {lines} dòng",
    selectedGroupOne:
      "Cần {count} trong {lines} dòng thuộc nhóm {options} dòng đã chọn",
    selectedGroupOther:
      "Cần {count} trong {lines} dòng thuộc nhóm {options} dòng đã chọn",
    matchLabel: "Thế nào là trúng",
    matchAny: "Bất kỳ",
    matchAll: "Tất cả",
    matchGroup: "Đếm theo nhóm",
    matchAnyHint: "Ít nhất một dòng đã chọn xuất hiện trên trang bị.",
    matchAllHint:
      "Mọi dòng đã chọn phải cùng xuất hiện trên một trang bị. Chạm lại một giá trị để yêu cầu nó trên 2 hoặc 3 dòng — một trang bị có thể ra cùng một chỉ số nhiều lần.",
    matchGroupHint:
      "Các lựa chọn của bạn tính là một nhóm, và chỉ số dòng rơi vào nhóm đó mới quan trọng — không cần biết là dòng nào. Chọn hết các tùy chọn tấn công rồi yêu cầu 3 dòng, bạn sẽ có tỷ lệ ra trang bị toàn dòng tấn công.",
    groupNeedLabel: "Số dòng thuộc nhóm",
    groupNeedOne: "{count} dòng",
    groupNeedOther: "{count} dòng",
    allImpossible:
      "{count} dòng không thể nằm vừa {lines} dòng — hãy tăng số dòng.",
    setup: "Thiết lập cube",
    cubeType: "Loại cube",
    potential: "Tiềm năng",
    bonusPotential: "Tiềm năng cộng thêm",
    noBonus: "{part} không có tiềm năng cộng thêm.",
    rank: "Bậc tiềm năng",
    showingPool: "Nhóm đang hiển thị",
    poolFirst: "Dòng 1",
    poolSecond: "Dòng 2 / 3",
    linesOnItem: "Số dòng trên trang bị của bạn",
    lineCountOne: "{count} dòng",
    lineCountOther: "{count} dòng",
    searchPlaceholder: "ví dụ PHY ATK, Boss, Crit",
    value: "Giá trị",
    chance: "Tỷ lệ",
    valueCountOne: "{count} giá trị",
    valueCountOther: "{count} giá trị",
    tableTitle: "{part} — {rank} · {pool}",
    tableFootnote:
      "Nhóm này có {count} dòng, tổng cộng {total}%. Nexon làm tròn từng mục đến hai chữ số thập phân.",
    cellAria: "{option} {value}, tỷ lệ {prob}%",
    cellAriaStack: "{option} {value}, tỷ lệ {prob}%, cần trên {count} dòng",
    stackBadge: "×{count}",
    rankUpTitle: "Tỷ lệ lên bậc mỗi cube",
    rankUpRow: "{chance}% lên bậc · ",
    rankUpCubes: "{count} cube",
    rankUpNote:
      "Lên bậc là một lần quay tách biệt với các dòng tùy chọn — những cube này chỉ khác nhau ở tỷ lệ lên bậc và công dụng, không bao giờ khác ở xác suất tùy chọn.",
    noteIndependent:
      "“Mỗi cube” giả định các dòng được quay độc lập — Nexon không công bố liệu một dòng có thể trùng với dòng khác hay không.",
    noteSource: "Dữ liệu từ {link}.",
    sourceLabel: "Công bố xác suất chính thức của Nexon — Cube",
    dataNotes: [
      "Bậc tiềm năng của trang bị được quyết định bởi dòng tiềm năng đầu tiên.",
      "Occult, Red, Black và Choice Cube chỉ khác nhau ở công dụng — xác suất tùy chọn hoàn toàn giống nhau.",
      "Dòng tiềm năng thứ hai và thứ ba quay từ một nhóm khác, lớn hơn nhóm của dòng đầu tiên.",
      "Từng xác suất được làm tròn đến hai chữ số thập phân, nên tổng một nhóm có thể không đúng bằng 100%.",
    ],

    steps: [
      {
        title: "Chọn bộ phận và bậc",
        body: "Mỗi bộ phận trang bị có nhóm tùy chọn riêng, và nhóm này thay đổi hoàn toàn theo bậc tiềm năng. Dây chuyền, Nhẫn và Vật phẩm túi không có tiềm năng cộng thêm, nên tùy chọn đó bị tắt với chúng.",
      },
      {
        title: "Chọn tiềm năng hoặc tiềm năng cộng thêm",
        body: "Đây là hai hệ thống tách biệt, với bảng riêng và cube riêng. Các dòng tiềm năng cộng thêm đến từ một nhóm nhỏ hơn tiềm năng thường.",
      },
      {
        title: "Chọn nhóm dòng",
        body: "Dòng tiềm năng đầu tiên quay từ một nhóm khác, thường nhỏ hơn nhóm của dòng thứ hai và thứ ba. Đổi nhóm để xem từng bên — những gì bạn chọn vẫn được giữ ở cả hai.",
      },
      {
        title: "Chọn thứ bạn muốn và đọc tỷ lệ",
        body: "Chạm tên tùy chọn để lấy mọi giá trị của chỉ số đó, hoặc chạm một giá trị để nhắm đúng mức đó. Thẻ sẽ hiển thị tỷ lệ trên dòng đang xem, tỷ lệ mỗi cube tính trên cả món đồ, và số cube để đạt mốc 50% hoặc 90%.",
      },
      {
        title: "Chọn xem thế nào là trúng",
        body: "“Bất kỳ” — mặc định — tính là trúng khi ít nhất một dòng bạn chọn xuất hiện. “Tất cả” đòi mọi dòng đã chọn cùng nằm trên một trang bị, và chạm lại một giá trị là yêu cầu chính dòng đó trên 2 hoặc 3 dòng. “Đếm theo nhóm” xem các lựa chọn của bạn là một nhóm và chỉ hỏi có bao nhiêu dòng của trang bị rơi vào đó, bất kể là dòng nào. Cả ba cách đọc đều dùng chung bảng đã công bố; chỉ có câu hỏi là khác.",
      },
      {
        title: "Dùng chế độ nhóm cho “cả ba dòng đều là tấn công”",
        body: "Tích mọi dòng bạn thấy chấp nhận được — chẳng hạn PHY ATK, Crit ATK và Crit DMG trên vũ khí — chuyển sang “Đếm theo nhóm” rồi yêu cầu 3 dòng thuộc nhóm. Đây mới là câu hỏi người chơi thực sự đặt ra, và nó khác hẳn hai cách kia: “Tất cả” sẽ đòi đúng ba dòng cụ thể đó theo đúng tổ hợp, còn cách đọc theo nhóm chấp nhận mọi tổ hợp giữa chúng. Trên vũ khí Legendary, tỷ lệ khoảng 3,6% mỗi cube, so với 0,18% nếu cả ba dòng đều phải là PHY ATK. Yêu cầu 1 sẽ cho đúng con số của “Bất kỳ”.",
      },
    ],

    exampleIntro: "Săn {option} {value} trên {part} bậc {rank}:",
    exampleOne: "Chỉ tính dòng 1",
    exampleThree: "Bất kỳ đâu trên trang bị 3 dòng",
    examplePerCube: "{chance} mỗi cube · ",
    exampleCubes: "{count} cube",
    exampleGap:
      "Chấp nhận dòng đó ở bất kỳ vị trí nào trên trang bị, thay vì đòi nó phải nằm ở ô đầu tiên, rẻ hơn rất nhiều — vì vậy rất đáng để quyết định ngay từ đầu bạn thực sự cần khắt khe đến mức nào.",

    readHeaderRows:
      "Mỗi tùy chọn là một hàng tiêu đề hiển thị tỷ lệ gộp của chỉ số đó ở mọi giá trị, với từng giá trị được liệt kê bên dưới.",
    readPools:
      "Trên dòng này là tỷ lệ của bạn ở nhóm đang hiển thị; mỗi cube gộp nhóm dòng đầu và nhóm dòng 2/3 trên tất cả các dòng của trang bị.",
    readPoolsTerm: "Trên dòng này",
    readPoolsTerm2: "mỗi cube",
    readPersist:
      "Lựa chọn được giữ lại khi bạn đổi nhóm, nên bạn có thể chọn cùng một chỉ số ở cả hai và thấy con số mỗi cube thật sự.",
    readModes:
      "Bất kỳ tính là trúng khi một dòng đã chọn xuất hiện; Tất cả đòi mọi dòng đã chọn cùng nằm trên trang bị, và tiêu đề đổi thành “Tất cả, mỗi cube”. Nhãn ×2 trên một giá trị nghĩa là bạn yêu cầu nó trên hai dòng. Đếm theo nhóm bỏ qua việc ra dòng nào và đếm xem có bao nhiêu dòng đến từ lựa chọn của bạn, hiển thị “Theo nhóm, mỗi cube”.",

    spendSeparate:
      "Lên bậc và quay tùy chọn là hai lần quay tách biệt. Một cube không lên bậc thì vẫn quay lại các dòng của bạn.",
    spendPity:
      "Cả hai lần quay đều không có bảo hiểm. Cube thứ {count} có tỷ lệ lên bậc y hệt cube đầu tiên.",
    spendAny:
      "Chọn nhiều dòng nghĩa là Bất kỳ dòng nào trong số đó, cho tới khi bạn chuyển sang Tất cả — và bước chuyển đó không hề nhỏ: hai dòng cụ thể cùng lúc hiếm hơn từng dòng riêng lẻ hàng bậc.",
    spendStack:
      "Yêu cầu cùng một dòng hai lần còn hiếm hơn nữa, còn yêu cầu nhiều dòng hơn số dòng trang bị của bạn thì đơn giản là không thể — bảng hiển thị 0% thay vì giả vờ ngược lại.",

    sim: {
      title: "Mô phỏng roll",
      intro:
        "Roll trên chính bảng xác suất đã công bố, với những dòng bạn đã chọn ở trên. Nhìn thấy độ dao động thực tế cho bạn biết nhiều hơn con số phần trăm.",
      needPick: "Chọn một dòng ở trên để có mục tiêu roll.",
      rollOnce: "Roll một lần",
      untilHit: "Roll đến khi trúng",
      rollBatch: "Roll 100 lần",
      reset: "Đặt lại",
      empty: "Chưa roll cube nào.",
      hit: "Trúng",
      miss: "Không khớp",
      slot: "Dòng {n}",
      spent: "Số cube đã roll",
      hits: "Số lần trúng",
      observed: "Thực tế",
      expected: "Lý thuyết {chance}%",
      untilHitOne: "Trúng ngay cube đầu tiên.",
      untilHitOther: "Trúng sau {count} cube.",
      vsMedian: "Bảng cho biết mốc 50-50 là {count}.",
      exhausted:
        "Không trúng trong {count} cube — lượt chạy dừng ở giới hạn, không phải vì được đảm bảo.",
      batch: "{hits} lần trúng trong {count} cube.",
      disclaimer:
        "Mô phỏng bằng bộ sinh số ngẫu nhiên của trình duyệt, dựa trên xác suất Nexon đã công bố. Đây không phải RNG của game, và kết quả ở đây không ảnh hưởng đến tài khoản của bạn.",
    },

    howToName: "Cách đọc bảng xác suất Cube của MapleStory M",
    howToDescription:
      "Tính ra tỷ lệ thật để quay trúng một dòng tiềm năng cụ thể, và cần bao nhiêu cube.",
    appName: "Xác suất Cube",

    faq: [
      {
        question:
          "Tỷ lệ ra một dòng cube cụ thể trong MapleStory M là bao nhiêu?",
        answer:
          "Mỗi dòng có tỷ lệ công bố riêng, phụ thuộc vào bộ phận trang bị, bậc tiềm năng, và việc đó là dòng đầu tiên hay dòng thứ hai/thứ ba. Chọn những dòng bạn muốn trong bảng, bảng tính sẽ cộng chúng lại rồi kết hợp hai nhóm để cho ra tỷ lệ mỗi cube.",
      },
      {
        question:
          "Occult, Red, Black và Choice Cube có tùy chọn khác nhau không?",
        answer:
          "Không. Nexon nêu rõ xác suất tùy chọn là hoàn toàn giống nhau giữa Occult, Red, Black và Choice Cube — chúng chỉ khác nhau ở công dụng và tỷ lệ lên bậc. Occult và Red lên bậc 1%, Black và Choice là 2%.",
      },
      {
        question: "Vì sao dòng thứ hai khác dòng đầu tiên?",
        answer:
          "Nexon công bố hai nhóm riêng cho mỗi bậc. Dòng tiềm năng đầu tiên rút từ một nhóm, còn dòng thứ hai và thứ ba rút từ nhóm khác, thường lớn hơn nhiều — nên một dòng phổ biến ở ô đầu có thể lại hiếm ở các ô còn lại.",
      },
      {
        question: "Cần bao nhiêu cube để lên bậc tiềm năng?",
        answer:
          "Lên bậc là một lần quay tách biệt với các tùy chọn: 1% mỗi cube với Occult và Red Cube, 2% với Black và Choice Cube. Tức là khoảng {slow} cube để đạt 50% ở mức 1%, hoặc {fast} cube ở mức 2%. Không có bảo hiểm — mỗi cube đều độc lập.",
      },
      {
        question:
          "Tỷ lệ ra hai dòng tiềm năng cụ thể trên cùng một trang bị là bao nhiêu?",
        answer:
          "Chuyển bảng sang “Tất cả”. Nó tính tỷ lệ để mọi dòng bạn chọn cùng xuất hiện trên một trang bị, dựa trên số dòng trang bị của bạn thực sự có — dòng đầu rút từ nhóm khác với dòng 2/3, nên hai nhóm được kết hợp đúng cách chứ không nhân bừa. Chạm hai lần vào một giá trị để yêu cầu chính dòng đó trên hai dòng. Yêu cầu nhiều dòng hơn số dòng của trang bị sẽ hiển thị 0%, vì điều đó không thể xảy ra.",
      },
      {
        question:
          "Tỷ lệ cả ba dòng trên vũ khí đều là dòng tấn công là bao nhiêu?",
        answer:
          "Chuyển bảng sang “Đếm theo nhóm”, tích mọi tùy chọn tấn công bạn chấp nhận, rồi yêu cầu 3 dòng thuộc nhóm. Bảng sẽ tính tỷ lệ có đủ số dòng rơi vào nhóm bạn chọn, bất kể đó là dòng nào — đúng ý câu hỏi “cả ba dòng đều là tấn công”, chứ không phải một dòng cụ thể. Trên vũ khí, cả ba dòng đều là PHY ATK chỉ khoảng 0,18% mỗi cube; mở rộng nhóm ra PHY ATK, Crit ATK và Crit DMG thì lên khoảng 3,6%.",
      },
      {
        question: "Những bộ phận nào có tiềm năng cộng thêm?",
        answer:
          "Phần lớn trang bị đều có, nhưng Dây chuyền, Nhẫn và Vật phẩm túi không có bảng tiềm năng cộng thêm trong công bố của Nexon, nên bảng tính tắt tùy chọn đó với chúng.",
      },
    ],
  },
};

export default vi;
