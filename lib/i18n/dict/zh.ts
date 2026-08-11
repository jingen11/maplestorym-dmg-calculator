import type { Dictionary } from "./en";

const zh: Dictionary = {
  nav: {
    damage: "伤害",
    flames: "火焰",
    cubes: "方块",
    language: "语言",
    skipToContent: "跳到主要内容",
  },

  footer: {
    basedOn: "基于社区“{name}”表格（最后更新于 {date}）。鸣谢：",
    disclaimer:
      "{site} 是玩家自制工具，与 Nexon 无任何关联。MapleStory M 是 Nexon Co., Ltd. 的商标。",
    lastUpdated: "2024 年 7 月 30 日",
  },

  credits: {
    Paulpork: "伤害公式",
    櫻櫻美代套子: "最初的增益属性计算器",
    KaitouKiddo: "最初的伤害与纹章计算器",
    "殘風⎝( OωO)⎠": "暴击率与伤害上限测试",
    Whaku: "表格本身，以及暴击率测试",
    S3phy: "表格的更新维护",
    Noodlesoup: "实测数据的测试与比对",
    Astralmist: "挖包得到的防御数值与公式",
  },

  site: {
    description:
      "为 MapleStory M 玩家打造的免费工具。伤害计算器可计算对普通怪与 BOSS 的每次伤害，涵盖等级差修正、BOSS 防御（IED）与食物增益；另有基于 Nexon 官方概率公示制作的交互式重生火焰与方块概率表。",
  },

  common: {
    moreTools: "更多工具",
    guide: "指南",
    notes: "说明",
    filterOptions: "筛选选项",
    option: "选项",
    clear: "清除",
    noMatch: "没有符合“{query}”的选项。",
    workedExample: "实例演算",
    readingTheTable: "如何读表",
    beforeYouSpend: "投入之前",
    howToUse: "如何使用本表",
    equipmentPart: "装备部位",
    forACoinFlip: "达到五五开",
    dash: "—",
  },

  home: {
    metaTitle: "MapleStory M 伤害计算器",
    metaDescription:
      "免费的 MapleStory M 伤害计算器。输入你的属性，即可查看对普通怪与 BOSS 的每次伤害——包含等级差修正、BOSS 防御（IED）、食物增益、超级技能加成以及暴击的最小值与最大值，基于社区验证过的伤害公式。",
    h1: "MapleStory M 伤害计算器",
    intro:
      "输入游戏内属性窗口中的数值，即可并排查看你对普通怪与 BOSS 的伤害——普通、暴击与平均每次伤害，并已计入等级惩罚、BOSS 防御与食物增益。在花费金币之前先测试属性改动；你输入的数据会保存在浏览器中。",
    flamesLink: "重生火焰概率 →",
    flamesBlurb:
      "把 Nexon 官方火焰概率表做成可交互的工具。选出你想要的选项，就能看到每次火焰的真实概率，以及需要多少次火焰才能达成。",
    cubesLink: "方块概率 →",
    cubesBlurb:
      "涵盖每个装备部位与每个等级的潜能与附加潜能概率，并给出打出目标词条所需的方块数量。",
    damageLink: "伤害计算器 →",
    damageBlurb:
      "对普通怪与 BOSS 的每次伤害，已计入等级惩罚、BOSS 防御与食物增益。",
    faq: [
      {
        question: "MapleStory M 的伤害是如何计算的？",
        answer:
          "一次伤害为 攻击力 × (1 + 伤害 %) × (1 + 攻击力 %) × 技能 % × (1 + 最终伤害 %)。面对 BOSS 时，BOSS 攻击力 % × 技能 % 会被加进攻击力 % 的括号内，随后结果还会被等级差修正以及扣除你的无视防御后剩余的 BOSS 防御（PDR）进一步削减。这些公式来自社区的 Damage & Emblem Calculator 表格，并经过游戏内实测与挖包得到的防御数值验证。",
      },
      {
        question: "为什么我对 BOSS 的伤害比对普通怪低这么多？",
        answer:
          "有两项削减只作用于 BOSS：一是基于挖包防御评级的等级差修正（挑战高于自身等级的目标会大幅削减伤害），二是 BOSS 防御（PDR），除非你堆叠无视防御率，否则它会削掉你一部分伤害。展开结果卡片中的“BOSS 伤害明细”即可查看每个阶段。",
      },
      {
        question: "应该优先堆暴击率还是暴击伤害？",
        answer:
          "两者相辅相成：没有暴击率，暴击伤害就毫无意义，反之亦然。暴击还会在你的暴击伤害之上再随机附加 0–50% 的加成——计算器会显示这次随机的最小值、中位值与最大值。改动属性前后对比平均伤害，即可判断哪一项更值得投入。",
      },
      {
        question: "无视防御率（IED）是怎么运作的？",
        answer:
          "无视防御率会削弱 BOSS 防御（PDR）带来的伤害减免。各来源之间是相乘叠加而非相加：属性窗口的 DIR、Node IED（技能节点达到 Lv 40 后 +15%）与 Defense Smash 4（+25%），按 1 − (1−a)(1−b)(1−c) 合并计算。",
      },
      {
        question: "MapleStory M 的食物增益可以叠加吗？",
        answer:
          "普通食物增益按效果互斥——吃下第二个同属性的食物会顶替第一个，但不同属性可以共存。少数特殊道具（Boss Rush Boost Potion、Noodle Soup With Mushroom、Stir-Fried Pork、Escargot、Cold Jellyfish Salad）可与普通增益以及彼此叠加。食物一栏正是按这一规则建模的。",
      },
    ],
  },

  damage: {
    ariaCalculator: "伤害计算器",
    panelMob: "普通怪物",
    panelMobShort: "普通",
    panelBoss: "BOSS",
    panelBossShort: "BOSS",
    averageHit: "{target} — 平均每次伤害",
    bounds: "下限 – 上限",
    normal: "普通",
    critical: "暴击",
    crit: "暴击",
    critRoll: "最小 – 最大",
    breakdown: "BOSS 伤害明细",
    stageRaw: "原始公式",
    stageLevel: "等级修正后",
    stageIed: "BOSS 防御（IED）后",

    setup: "角色设置",

    attackType: {
      pair: "物理/魔法",
      pairPhys: "物理",
      pairMag: "魔法",
      soloPhys: "物理攻击力",
      soloMag: "魔法攻击力",
    },

    myStats: "我的属性",
    physicalClass: "物理系职业",
    magicalClass: "魔法系职业",
    myStatsHint:
      "在此输入基础属性。不要包含食物增益与队伍增益，但要包含自身增益。",
    toggleAria: "在物理攻击与魔法攻击之间切换",

    skill: "技能",
    nodes: "节点",
    nodeIed: "Node IED",
    nodeIedHint:
      "+15% 无视防御率——技能节点达到 Lv 40 后生效。只有当你的节点在 Lv 40 及以上时才勾选。",
    defenseSmash4: "Defense Smash 4",
    defenseSmash4Hint: "+25% 无视防御率",
    finalDir: "最终无视防御率：",
    finalDirHint: "— 各来源相乘叠加，然后再去削减 BOSS 的防御（PDR）。",

    target: "目标",
    targetHint:
      "这些数值只影响 BOSS 伤害——普通怪伤害不受等级与防御削减的影响。",

    modifiers: "加成",
    modifiersHint:
      "仅填写超级技能加成，它们会叠加在你的基础属性之上。自身增益与队伍增益应计入基础属性；食物有单独的一栏。",
    modifierHint: "在你的基础{label}之上额外叠加",

    food: "食物",
    foodHint:
      "普通食物增益按效果互斥——选择第二个同属性的食物会顶替第一个。不同属性可以组合使用。",
    foodStackHint: "这些可与普通增益以及彼此叠加。",

    fields: {
      physAtk: {
        label: "物理攻击力",
        hint: "属性窗口中的物理/魔法攻击力固定值",
      },
      atkPercent: {
        label: "物理/魔法攻击力",
        hint: "属性窗口中的物理/魔法攻击力 % 总和",
      },
      dmgPercent: {
        label: "物理/魔法伤害",
        hint: "属性窗口中的物理/魔法伤害 % 总和",
      },
      bossAtkPercent: {
        label: "BOSS 攻击力",
        hint: "仅在目标为 BOSS 时生效",
      },
      critRatePercent: {
        label: "暴击率",
        hint: "打出暴击的概率（上限 100%）",
      },
      critDmgPercent: {
        label: "暴击伤害",
        hint: "暴击时的额外伤害",
      },
      finalDmgPercent: {
        label: "最终伤害",
        hint: "属性窗口中的最终伤害 % 总和",
      },
      statDefIgnoreRatePercent: {
        label: "无视防御率",
        hint: "来自属性窗口——与节点的 DIR 来源叠加",
      },
      skillPercent: {
        label: "技能伤害",
        hint: "你正在测试的那条技能的伤害 %",
      },
      skillFinalDmgPercent: {
        label: "最终伤害",
        hint: "来自技能强化——填入你当前等级对应的数值",
      },
      characterLevel: { label: "角色等级", hint: "你当前的等级" },
      monsterLevel: {
        label: "怪物等级",
        hint: "等级更高的怪物会削减你的伤害",
      },
      bossPdrPercent: {
        label: "BOSS 防御（PDR）",
        hint: "BOSS 防御所削掉的伤害比例——会被无视防御率削弱",
      },
      monsterCritResPercent: {
        label: "怪物暴击抗性",
        hint: "在 100% 上限之前从你的暴击率中扣除",
      },
    },
  },

  flames: {
    metaTitle: "MapleStory M 重生火焰概率",
    metaDescription:
      "MapleStory M 每一个重生火焰选项及其精确概率，取自 Nexon 官方概率公示。选择装备部位与火焰等级，勾选你想要的选项，即可看到每次火焰的概率——既可以是任意命中一条，也可以是两个指定选项同时出现在同一次火焰上——以及所需的火焰数量。",
    h1: "重生火焰概率",
    intro:
      "把 Nexon 官方重生火焰概率表做成可交互的工具。选择装备部位与火焰等级，点选你真正想要的选项数值，即可看到每次火焰的概率——以及要达到五五开或接近必中需要多少次火焰。",

    ariaTable: "重生火焰概率",
    perOptionSlot: "每个选项槽",
    perFlame: "每次火焰",
    perFlameAll: "全部命中·每次火焰",
    perFlameGroup: "按组计数·每次火焰",
    for50: "达到 50% 所需火焰",
    for90: "达到 90% 所需火焰",
    tapHint: "点击下方任意数值，选出你想要的选项。",
    selectedOne: "已选 {count} 条 · 出现第 2 个选项的概率 {two}%",
    selectedOther: "已选 {count} 条 · 出现第 2 个选项的概率 {two}%",
    selectedAllOne: "目标 {count} 条 · 出现第 2 个选项的概率 {two}%",
    selectedAllOther: "同时要 {count} 条 · 出现第 2 个选项的概率 {two}%",
    selectedGroupOne:
      "目标：{count} 个选项出自已选的 {options} 条 · 出现第 2 个选项的概率 {two}%",
    selectedGroupOther:
      "目标：{count} 个选项出自已选的 {options} 条 · 出现第 2 个选项的概率 {two}%",
    matchLabel: "怎样才算命中",
    matchAny: "任意一个",
    matchAll: "全部同时",
    matchGroup: "按组计数",
    matchAnyHint: "所选词条中至少出现一条即算命中。",
    matchAllHint:
      "所选词条必须同时出现在同一次火焰上。再次点击某个数值即可要求它占满两个选项槽——一次火焰可以出现相同词条两次。",
    matchGroupHint:
      "所选词条视为一组，只看有几个选项落在组内，不管具体是哪几条。勾选所有你能接受的词条并要求 2 个，即可得到两个选项都有用的概率。",
    groupNeedLabel: "落在组内的选项数",
    groupNeedOne: "{count} 个选项",
    groupNeedOther: "{count} 个选项",
    groupNeedTwoHint:
      "两个选项都出自组内必须先出现两个选项，因此该等级出现第 2 个选项的概率就是硬上限。",
    allImpossible: "一次火焰最多出现 2 个选项，因此 {count} 条同时出现不可能。",
    setup: "火焰设置",
    tier: "重生火焰等级",
    eternal: "永恒重生火焰",
    eternalHint: "— 必定出现 2 个选项。数值仍取自上方所选的等级。",
    searchPlaceholder: "例如 Boss ATK、Crit DMG、Final DMG",
    anyValue: "任意数值",
    best: "最佳",
    tableTitle: "{slot} — {rarity}",
    tableFootnote:
      "每个选项会随机出现四个数值之一，且概率均等——因此单一数值等于“任意数值”÷ 4。数值按由强到弱排列。所有条目合计 {total}%；Nexon 将每一项四舍五入到两位小数。",
    cellAria: "{option}，第 {grade} 档：{value}%，概率 {prob}%",
    cellAriaStack:
      "{option}，第 {grade} 档：{value}%，概率 {prob}%，需要 {count} 个选项槽",
    stackBadge: "×{count}",
    noteIndependent:
      "“每次火焰”假设两个选项相互独立地抽取——Nexon 并未公开第二个选项是否可能与第一个重复。",
    noteSource: "数据来自 {link}，最后更新于 {date}。",
    sourceLabel: "Nexon 官方概率公示 — 重生火焰",
    dataNotes: [
      "可出现的选项范围会因重生火焰所用的装备部位而不同。",
      "使用重生火焰时最多可出现 2 个选项。",
      "概率四舍五入到小数点后两位，因此一列的合计可能不正好是 100%。",
    ],

    steps: [
      {
        title: "选择装备部位",
        body: "每个部位都从自己的选项池中抽取——武器出攻击相关的词条，防具出防御相关的词条。更换部位会整表重建。",
      },
      {
        title: "选择火焰等级",
        body: "等级同时决定选项的数值以及出现第二个选项的概率。如果你使用的是永恒重生火焰请勾选它——它必定出现两个选项，数值则取自你所选的等级。",
      },
      {
        title: "点选你想要的数值",
        body: "点击单个数值可精确锁定那一档，点击选项名称则一次选中它的全部四个数值。选得越多，目标越容易达成，绝不会更难。",
      },
      {
        title: "查看你的概率",
        body: "顶部卡片会实时更新：单个选项槽的概率、每次火焰的真实概率，以及累计概率达到 50% 或 90% 所需的火焰数量。",
      },
      {
        title: "决定怎样才算命中",
        body: "“任意一个”是默认值：只要你选中的词条出现一条即算命中。“全部同时”要求所选词条全部落在同一次火焰上，因此必须出现两个选项；再次点击某个数值即可要求它占满两个选项槽。“按组计数”把你的选择当成一整组，只问这次火焰有几个选项落在组内，不管具体是哪几条。三种读法都取自同一份官方概率表，区别只在于所问的问题。",
      },
      {
        title: "想要“两个选项都有用”就用按组计数",
        body: "勾选所有你乐意看到的词条，切换到“按组计数”并要求 2 个。这才是洗火焰真正在问的问题——不是“有没有出这条特定词条”，而是“两个选项是不是都能用”。若只要求 1 个，得到的数字与“任意一个”完全相同，因为组内出一个选项就等于命中一条所选词条。要求 2 个则必须出现两个选项，该等级出现第 2 个选项的概率就是硬上限。",
      },
    ],

    exampleIntro: "在 {slot} 上使用 {rarity} 火焰，目标是 {option}：",
    exampleBest: "只要最高档（{value}）",
    exampleAny: "它的 {count} 个数值中任意一个",
    examplePerFlame: "每次火焰 {chance} · ",
    exampleFlames: "{count} 次火焰",
    exampleGap:
      "这个差距正是大多数玩家真正要做的取舍。死等最高档所需的火焰数量，大约是接受该选项任意档位的 {ratio} 倍。",

    readAnyValue:
      "任意数值 指的是出现该选项的总概率，无论最终拿到四个数值中的哪一个。",
    readAnyValueTerm: "任意数值",
    readGrades:
      "最佳 → #4 是四个可能的数值，由强到弱排列。四者概率均等，因此单一数值永远等于“任意数值”÷ 4。",
    readGradesTerm: "最佳 → #4",
    readSlots:
      "每个选项槽 是一次抽取的概率；每次火焰 更高，因为一次火焰有机会出现第二个选项。",
    readSlotsTerm: "每个选项槽",
    readSlotsTerm2: "每次火焰",
    readModes:
      "任意一个 只要命中一条即算成功；全部同时 需要所选词条全部落在同一次火焰上，顶部数据也会切换为“全部命中·每次火焰”。数值上的 ×2 标记表示你要求它占满两个选项槽。按组计数 则不管出的是哪几条，只统计有几个选项来自你的选择，并显示为“按组计数·每次火焰”。",

    spendPity:
      "没有保底。第 {count} 次火焰与第一次的概率完全相同——“达到 50% 所需火焰”描述的是大量玩家的分布，而不是为你倒计时。",
    spendAny:
      "选中多条表示 任意一个，除非你切换到 全部同时。在同一次火焰上拿到两个指定选项要罕见得多，因为那只能出现在双选项的结果里。",
    spendStack:
      "要求同一条词条占满两个选项槽更罕见——相当于把这一条的概率平方——而三条同时出现则不可能，因为一次火焰绝不会超过两个选项。",
    spendTier:
      "这些数量假设每次火焰都是你所选的等级。稀有等级的火焰根本不可能出现第二个选项。",

    sim: {
      title: "开火模拟",
      intro:
        "用你在上方选择的选项，按同一份公示概率表进行模拟。亲眼看到波动，比只看百分比更有感觉。",
      needPick: "请先在上方选择一个选项，作为模拟的目标。",
      rollOnce: "模拟一次",
      untilHit: "一直模拟到出货",
      rollBatch: "模拟 100 次",
      reset: "重置",
      empty: "还没有模拟过火焰。",
      hit: "出货",
      miss: "未命中",
      slot: "选项 {n}",
      spent: "已用火焰",
      hits: "命中次数",
      observed: "实际",
      expected: "理论 {chance}%",
      untilHitOne: "第一颗火焰就出货了。",
      untilHitOther: "用了 {count} 颗火焰才出货。",
      vsMedian: "概率表给出的五五开分界点是 {count}。",
      exhausted: "{count} 颗火焰都没出货 —— 这一轮是撞到上限才停的，并非保底。",
      batch: "{count} 颗火焰中命中 {hits} 次。",
      disclaimer:
        "本模拟使用浏览器的随机数生成器，依据 Nexon 公示的概率运行。它不是游戏本身的随机算法，这里的结果也不会影响你的账号。",
    },

    howToName: "如何读懂 MapleStory M 重生火焰概率表",
    howToDescription:
      "算出你打出特定重生火焰选项的真实概率，以及需要多少次火焰。",
    appName: "重生火焰概率",

    faq: [
      {
        question: "拿到某个特定重生火焰选项的概率是多少？",
        answer:
          "每条选项都有各自公示的概率——多数在每个选项槽 1.5–1.7% 左右。在表中选出你想要的条目，计算器会把它们相加，再计入出现第二个选项的概率，得出你每次火焰的真实概率。",
      },
      {
        question: "重生火焰的第二个选项是怎么运作的？",
        answer:
          "火焰通常只出现一个选项，出现第二个的概率取决于等级：稀有 0%、史诗 0.1%、独特 0.3%、传说 3%、神话 8%。永恒重生火焰则必定出现两个选项。",
      },
      {
        question: "所有装备部位共用同一套火焰选项吗？",
        answer:
          "不是。可出现的选项池取决于部位。武器出攻击相关的词条，防具出防御相关的词条，而 Final DMG Increase 与 DEF Ignore Rate 只会出现在传说与神话等级上。",
      },
      {
        question: "为什么概率加起来不正好是 100%？",
        answer:
          "Nexon 将每一项四舍五入到两位小数，因此一列的合计会略高于或略低于 100%。本表显示该列的真实合计，让你看到四舍五入造成的偏差。",
      },
      {
        question: "“达到 50% 所需火焰”是什么意思？",
        answer:
          "它是指你需要多少次火焰，累计命中至少一个所选选项的概率才会达到 50%。这既不是保证也不是倒计时——游戏没有保底机制，每一次火焰的概率都与第一次相同。到那个次数时，一半玩家已经打出，另一半还没有；90% 那一栏则显示运气差的那一段会拖多久。",
      },
      {
        question: "选中不止一个数值会怎样？",
        answer:
          "取决于匹配模式。在“任意一个”下，选中的概率会相加，每多勾一条目标就更容易——因为一个选项槽只会抽出一条。在“全部同时”下，每一条选中的词条都成为必须落在同一次火焰上的独立条件，这要罕见得多，因为它需要一次双选项的结果。",
      },
      {
        question: "同时拿到两个指定火焰选项的概率是多少？",
        answer:
          "把表格切换到“全部同时”。两条指定词条只能出现在双选项的结果里，所以概率大致等于该等级出现第二个选项的概率乘以两条词条各自的概率——必定出两个选项的永恒重生火焰在这件事上要好得多。三条同时出现不可能，会显示 0%。再次点击某个数值即可要求它占满两个选项槽。",
      },
      {
        question: "两个火焰选项都有用的概率是多少？",
        answer:
          "把表格切换到“按组计数”，勾选所有你乐意看到的词条，然后要求组内 2 个选项。它统计的是这次火焰有几个选项落在你的选择范围内，而不是非要哪几条特定词条，这正是洗火焰真正在问的问题。这种情况必须出现两个选项，因此该等级出现第二个选项的概率就是硬上限——必定出两个选项的永恒重生火焰则完全没有这个上限。",
      },
    ],
  },

  cubes: {
    metaTitle: "MapleStory M 方块概率",
    metaDescription:
      "MapleStory M 每一个潜能与附加潜能选项及其精确概率，取自 Nexon 官方概率公示。选择部位、等级与词条位置，勾选你想要的选项，即可看到每颗方块的概率——既可以是任意命中一条，也可以是 2–3 条指定词条同时出现在同一件装备上——以及所需的方块数量。",
    h1: "方块概率",
    intro:
      "把 Nexon 官方潜能与附加潜能概率表做成可交互的工具。选择部位、等级与词条池，点选你真正想要的选项，即可看到每颗方块的概率——以及要达成需要多少方块。",

    ariaTable: "方块概率",
    onThisLine: "当前词条",
    perCube: "每颗方块",
    perCubeAll: "全部命中·每颗方块",
    perCubeGroup: "按组计数·每颗方块",
    for50: "达到 50% 所需方块",
    for90: "达到 90% 所需方块",
    tapHint: "点击你想要的词条。所选内容对两个池同时生效。",
    selectedOne: "已选 {count} 条 · 第 1 条 {first}% · 第 2/3 条 {second}%",
    selectedOther: "已选 {count} 条 · 第 1 条 {first}% · 第 2/3 条 {second}%",
    selectedAllOne: "目标 {count} 条，共 {lines} 条词条",
    selectedAllOther: "同时要 {count} 条，共 {lines} 条词条",
    selectedGroupOne: "目标：{lines} 条中有 {count} 条出自已选的 {options} 条",
    selectedGroupOther:
      "目标：{lines} 条中有 {count} 条出自已选的 {options} 条",
    matchLabel: "怎样才算命中",
    matchAny: "任意一个",
    matchAll: "全部同时",
    matchGroup: "按组计数",
    matchAnyHint: "所选词条中至少出现一条即算命中。",
    matchAllHint:
      "所选词条必须同时出现在同一件装备上。再次点击某个数值即可要求它出现 2 或 3 条——装备可以多次出现相同属性。",
    matchGroupHint:
      "所选词条视为一组，只看有几条词条落在组内，不管具体是哪几条。勾选全部攻击类选项并要求 3 条，即可得到装备三条全是攻击词条的概率。",
    groupNeedLabel: "落在组内的词条数",
    groupNeedOne: "{count} 条",
    groupNeedOther: "{count} 条",
    allImpossible: "{count} 条放不进 {lines} 条词条——请提高词条数。",
    setup: "方块设置",
    cubeType: "方块类型",
    potential: "潜能",
    bonusPotential: "附加潜能",
    noBonus: "{part}没有附加潜能。",
    rank: "潜能等级",
    showingPool: "当前显示的池",
    poolFirst: "第 1 条",
    poolSecond: "第 2 / 3 条",
    linesOnItem: "装备上的词条数",
    lineCountOne: "{count} 条",
    lineCountOther: "{count} 条",
    searchPlaceholder: "例如 PHY ATK、Boss、Crit",
    value: "数值",
    chance: "概率",
    valueCountOne: "{count} 个数值",
    valueCountOther: "{count} 个数值",
    tableTitle: "{part} — {rank} · {pool}",
    tableFootnote:
      "该池共 {count} 条，合计 {total}%。Nexon 将每一项四舍五入到两位小数。",
    cellAria: "{option} {value}，概率 {prob}%",
    cellAriaStack: "{option} {value}，概率 {prob}%，需要 {count} 条词条",
    stackBadge: "×{count}",
    rankUpTitle: "每颗方块的升阶概率",
    rankUpRow: "升阶 {chance}% · ",
    rankUpCubes: "{count} 颗方块",
    rankUpNote:
      "升阶与词条是两次独立的抽取——这些方块只在升阶概率与功能上有区别，选项概率完全相同。",
    noteIndependent:
      "“每颗方块”假设各条词条相互独立地抽取——Nexon 并未公开某一条是否可能与另一条重复。",
    noteSource: "数据来自 {link}。",
    sourceLabel: "Nexon 官方概率公示 — 方块",
    dataNotes: [
      "装备的潜能等级由它的第一条潜能决定。",
      "神秘方块、红色方块、黑色方块与自选方块只在功能上有区别——选项概率完全相同。",
      "第二与第三条潜能来自与第一条不同、且更大的池。",
      "各项概率四舍五入到两位小数，因此一个池的合计可能不正好是 100%。",
    ],

    steps: [
      {
        title: "选择部位与等级",
        body: "每个装备部位都有自己的选项池，而这个池会随潜能等级完全改变。项链、戒指与口袋道具没有附加潜能，因此该选项对它们是禁用的。",
      },
      {
        title: "选择潜能或附加潜能",
        body: "两者是彼此独立的系统，有各自的概率表与各自的方块。附加潜能的词条来自比常规潜能更小的池。",
      },
      {
        title: "选择词条池",
        body: "第一条潜能所抽的池与第二、第三条不同，且通常更小。切换池即可分别查看——你选中的内容在两个池中都会保留。",
      },
      {
        title: "选出目标并查看概率",
        body: "点击选项名称可选中该属性的全部数值，点击单个数值则精确锁定那一档。卡片会显示当前所示词条的概率、整件装备上每颗方块的概率，以及达到 50% 或 90% 所需的方块数量。",
      },
      {
        title: "决定怎样才算命中",
        body: "“任意一个”是默认值：只要你选中的词条出现一条即算命中。“全部同时”要求所选词条全部落在同一件装备上，再次点击某个数值即可要求它出现 2 或 3 条。“按组计数”把你的选择当成一整组，只问这件装备有几条词条落在组内，不管具体是哪几条。三种读法都取自同一份官方概率表，区别只在于问题本身。",
      },
      {
        title: "想要“三条全是攻击”就用按组计数",
        body: "勾选所有你乐意看到的词条——比如武器上的 PHY ATK、Crit ATK 与 Crit DMG——切换到“按组计数”，然后要求组内 3 条。这才是玩家真正会问的问题，而且与另外两种读法都不同：“全部同时”会要求恰好凑齐这三条特定词条，而按组计数接受它们之间的任意组合。Legendary 武器上大约是每颗方块 3.6%，而三条全为 PHY ATK 只有 0.18%。若只要求 1 条，得到的数字与“任意一个”完全相同。",
      },
    ],

    exampleIntro: "在{rank}{part}上追求 {option} {value}：",
    exampleOne: "只算第 1 条",
    exampleThree: "3 条词条的装备上任意位置",
    examplePerCube: "每颗方块 {chance} · ",
    exampleCubes: "{count} 颗方块",
    exampleGap:
      "接受该词条出现在装备的任意位置，而不是非要它落在第一条，代价要低得多——所以值得一开始就想清楚你到底需要多严格。",

    readHeaderRows:
      "每个选项都是一个标题行，显示该属性在任意数值下的合计概率，其下逐条列出各个数值。",
    readPools:
      "当前词条 是你在当前所示池中的概率；每颗方块 则把第一条池与第 2/3 条池按你装备上的全部词条合并计算。",
    readPoolsTerm: "当前词条",
    readPoolsTerm2: "每颗方块",
    readPersist:
      "切换池时选中的内容会保留，因此你可以在两个池中都选中同一属性，看到真实的每颗方块概率。",
    readModes:
      "任意一个 只要命中一条即算成功；全部同时 需要所选词条全部落在同一件装备上，顶部数据也会切换为“全部命中·每颗方块”。数值上的 ×2 标记表示你要求它出现两条。按组计数 则不管出的是哪几条，只统计有几条来自你的选择，并显示为“按组计数·每颗方块”。",

    spendSeparate:
      "升阶与洗词条是两次独立的抽取。即使方块没能升阶，它仍然会重洗你的词条。",
    spendPity: "两次抽取都没有保底。第 {count} 颗方块的升阶概率与第一颗相同。",
    spendAny:
      "选中多条表示 任意一个，除非你切换到 全部同时——而这一步跨度不小：两条指定词条同时出现，比其中任何一条单独出现要罕见几个数量级。",
    spendStack:
      "要求同一条词条出现两次更罕见，而要求的条数超过装备本身的词条数则根本不可能——表格会直接显示 0%，不会粉饰。",

    sim: {
      title: "开方块模拟",
      intro:
        "用你在上方选择的词条，按同一份公示概率表进行模拟。亲眼看到波动，比只看百分比更有感觉。",
      needPick: "请先在上方选择一条词条，作为模拟的目标。",
      rollOnce: "模拟一次",
      untilHit: "一直模拟到出货",
      rollBatch: "模拟 100 次",
      reset: "重置",
      empty: "还没有模拟过方块。",
      hit: "出货",
      miss: "未命中",
      slot: "第 {n} 条",
      spent: "已用方块",
      hits: "命中次数",
      observed: "实际",
      expected: "理论 {chance}%",
      untilHitOne: "第一颗方块就出货了。",
      untilHitOther: "用了 {count} 颗方块才出货。",
      vsMedian: "概率表给出的五五开分界点是 {count}。",
      exhausted: "{count} 颗方块都没出货 —— 这一轮是撞到上限才停的，并非保底。",
      batch: "{count} 颗方块中命中 {hits} 次。",
      disclaimer:
        "本模拟使用浏览器的随机数生成器，依据 Nexon 公示的概率运行。它不是游戏本身的随机算法，这里的结果也不会影响你的账号。",
    },

    howToName: "如何读懂 MapleStory M 方块概率表",
    howToDescription: "算出你打出特定潜能词条的真实概率，以及需要多少方块。",
    appName: "方块概率",

    faq: [
      {
        question: "在 MapleStory M 中打出某条特定方块词条的概率是多少？",
        answer:
          "每条词条都有各自公示的概率，它取决于装备部位、潜能等级，以及它是第一条还是第二/第三条。在表中选出你想要的词条，计算器会把它们相加，再合并两个池，得出你每颗方块的概率。",
      },
      {
        question: "神秘、红色、黑色与自选方块的选项不同吗？",
        answer:
          "不同的只有功能和升阶概率。Nexon 说明神秘、红色、黑色与自选方块的选项概率完全相同。神秘与红色的升阶概率为 1%，黑色与自选为 2%。",
      },
      {
        question: "为什么第二条和第一条不一样？",
        answer:
          "Nexon 每个等级公布两个独立的池。第一条潜能从一个池中抽取，第二与第三条从另一个通常大得多的池中抽取——所以在第一条里常见的词条，在其他位置可能很稀有。",
      },
      {
        question: "潜能升阶需要多少颗方块？",
        answer:
          "升阶是独立于词条的另一次抽取：神秘与红色方块每颗 1%，黑色与自选方块 2%。也就是说，1% 的概率下约需 {slow} 颗方块达到 50%，2% 的概率下约需 {fast} 颗。没有保底——每颗方块都彼此独立。",
      },
      {
        question: "在同一件装备上同时拿到两条指定潜能词条的概率是多少？",
        answer:
          "把表格切换到“全部同时”。它会按你装备实际拥有的词条数，算出所选词条全部落在同一件装备上的概率——第一条与第 2/3 条来自不同的池，因此两个池是正确合并的，而不是简单相乘。对同一个数值点击两次，即可要求它出现两条。要求的条数超过装备本身的词条数会显示 0%，因为那不可能发生。",
      },
      {
        question: "武器三条词条全是攻击词条的概率是多少？",
        answer:
          "把表格切换到“按组计数”，勾选所有你能接受的攻击类选项，然后要求组内 3 条。它会算出有这么多条词条落在你所选范围内的概率，不管具体是哪几条——这正是“三条全是攻击”所问的，而不是某一条指定词条。武器上三条全为 PHY ATK 每颗方块约 0.18%；把组扩大到 PHY ATK、Crit ATK 与 Crit DMG 后约为 3.6%。",
      },
      {
        question: "哪些部位有附加潜能？",
        answer:
          "大多数装备都有，但项链、戒指与口袋道具在 Nexon 的公示中没有附加潜能表，因此计算器对这些部位禁用了该选项。",
      },
    ],
  },
};

export default zh;
