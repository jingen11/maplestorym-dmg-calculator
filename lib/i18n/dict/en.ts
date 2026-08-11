// English is the source dictionary: its shape defines the `Dictionary` type,
// so a missing or misspelled key in any other locale is a compile error.
//
// Values are plain strings (see ../format.ts) — the whole object is handed
// from server components to client components as a prop, so it must stay
// serializable. `{placeholders}` are filled with fill()/plural().

const en = {
  nav: {
    damage: "Damage",
    flames: "Flames",
    cubes: "Cubes",
    language: "Language",
    skipToContent: "Skip to content",
  },

  footer: {
    basedOn:
      "Based on the community “{name}” spreadsheet (last updated {date}). Credits:",
    disclaimer:
      "{site} is a fan-made tool and is not affiliated with Nexon. MapleStory M is a trademark of Nexon Co., Ltd.",
    lastUpdated: "30 July 2024",
  },

  credits: {
    Paulpork: "the damage formula",
    櫻櫻美代套子: "the initial buffed stats calculator",
    KaitouKiddo: "the initial damage + emblem calculator",
    "殘風⎝( OωO)⎠": "crit rate and damage cap tests",
    Whaku: "the spreadsheet itself, plus crit rate tests",
    S3phy: "updating the spreadsheet",
    Noodlesoup: "testing and correlating empirical data",
    Astralmist: "datamined defense values and formula",
  },

  site: {
    description:
      "Free tools for MapleStory M players. Damage calculator with mob and boss damage per hit, level-difference modifier, boss defense (IED) and food buffs, plus interactive Rebirth Flame and cube probability tables built from Nexon's official disclosures.",
  },

  common: {
    moreTools: "More tools",
    guide: "Guide",
    notes: "Notes",
    filterOptions: "Filter options",
    option: "Option",
    clear: "clear",
    noMatch: "No options match “{query}”.",
    workedExample: "Worked example",
    readingTheTable: "Reading the table",
    beforeYouSpend: "Before you spend",
    howToUse: "How to use this table",
    equipmentPart: "Equipment part",
    forACoinFlip: "for a coin flip",
    dash: "—",
  },

  home: {
    metaTitle: "MapleStory M Damage Calculator",
    metaDescription:
      "Free MapleStory M damage calculator. Enter your stats to see mob and boss damage per hit — with the level-difference modifier, boss defense (IED), food buffs, hyper skill modifiers and crit min–max, based on the community-verified damage formula.",
    h1: "MapleStory M Damage Calculator",
    intro:
      "Enter your stats from the in-game stat window to see your mob and boss damage side by side — normal, critical and average per hit, with the level penalty, boss defense and food buffs factored in. Test a stat change before you spend mesos; your inputs are saved in your browser.",
    flamesLink: "Rebirth Flame probabilities →",
    flamesBlurb:
      "Nexon's official flame tables, made interactive. Pick the options you want and see your real chance per flame — and how many flames it takes to get there.",
    cubesLink: "Cube probabilities →",
    cubesBlurb:
      "Potential and bonus potential odds for every equipment part and rank, with the cubes needed to hit the lines you want.",
    damageLink: "Damage calculator →",
    damageBlurb:
      "Mob and boss damage per hit, with the level penalty, boss defense and food buffs factored in.",
    faq: [
      {
        question: "How is damage calculated in MapleStory M?",
        answer:
          "A hit is Attack × (1 + Damage %) × (1 + Attack %) × Skill % × (1 + Final Damage %). Against bosses, Boss Attack % × Skill % is added into the Attack % bracket, and the result is further reduced by the level-difference modifier and the boss's defense (PDR) after your Ignore Defense. The formulas come from the community Damage & Emblem Calculator spreadsheet, verified by in-game testing and datamined defense values.",
      },
      {
        question: "Why is my boss damage so much lower than my mob damage?",
        answer:
          "Two reductions apply only to bosses: a level-difference modifier based on datamined defense ratings (fighting above your level cuts damage hard), and the boss's defense (PDR), which removes a share of your damage unless you stack Def Ignore Rate. Expand 'Boss damage breakdown' in the results card to see each stage.",
      },
      {
        question: "Should I prioritize Critical Rate or Critical Damage?",
        answer:
          "They scale off each other: Critical Damage does nothing without Critical Rate, and vice versa. Crits also roll a random 0–50% bonus on top of your Crit Damage — the calculator shows the min, midpoint and max of that roll. Compare your average hit before and after a stat change to decide.",
      },
      {
        question: "How does Def Ignore Rate (IED) work?",
        answer:
          "Def Ignore Rate shrinks the damage reduction from a boss's defense (PDR). Sources stack multiplicatively, not additively: your stat window DIR, Node IED (+15% once the skill's node reaches Lv 40) and Defense Smash 4 (+25%) combine as 1 − (1−a)(1−b)(1−c).",
      },
      {
        question: "Do food buffs stack in MapleStory M?",
        answer:
          "Regular food buffs are mutually exclusive per effect — eating a second food of the same stat replaces the first, though different stats combine. A few special items (Boss Rush Boost Potion, Noodle Soup With Mushroom, Stir-Fried Pork, Escargot, Cold Jellyfish Salad) stack with the regular buff and each other. The Food section models exactly this.",
      },
    ],
  },

  damage: {
    ariaCalculator: "Damage calculator",
    panelMob: "Normal monsters",
    panelMobShort: "Normal",
    panelBoss: "Boss",
    panelBossShort: "Boss",
    averageHit: "{target} — average hit",
    bounds: "lower – upper bound",
    normal: "Normal",
    critical: "Critical",
    crit: "Crit",
    critRoll: "min – max roll",
    breakdown: "Boss damage breakdown",
    stageRaw: "Raw formula",
    stageLevel: "After level modifier",
    stageIed: "After boss defense (IED)",

    setup: "Character setup",

    /* The phys/mag switch rewrites the stat wording in place. `pair` is the
       "either" form that appears inside most labels and hints; `solo` is the
       flat-attack label, which names one type outright. A locale that keeps
       the in-game English abbreviations just repeats the English here. */
    attackType: {
      pair: "Phys/Mag",
      pairPhys: "Phys",
      pairMag: "Mag",
      soloPhys: "Phys Atk",
      soloMag: "Mag Atk",
    },

    myStats: "My stats",
    physicalClass: "Physical class",
    magicalClass: "Magical class",
    myStatsHint:
      "Input base stats here. Exclude any food buffs & party buffs. Include self buffs.",
    toggleAria: "Toggle between physical and magical attack",

    skill: "Skill",
    nodes: "Nodes",
    nodeIed: "Node IED",
    nodeIedHint:
      "+15% Def Ignore Rate — activates once the skill's node reaches Lv 40. Check this only if your node is Lv 40 or above.",
    defenseSmash4: "Defense Smash 4",
    defenseSmash4Hint: "+25% Def Ignore Rate",
    finalDir: "Final Def Ignore Rate:",
    finalDirHint:
      "— sources stack multiplicatively, then reduce the boss's defense (PDR).",

    target: "Target",
    targetHint:
      "These only affect the boss damage — mob damage skips the level and defense reductions.",

    modifiers: "Modifiers",
    modifiersHint:
      "Hyper skill bonuses only, stacked on top of your base stats. Self and party buffs belong in your base stats; food gets its own section.",
    modifierHint: "Added on top of your base {label}",

    food: "Food",
    foodHint:
      "Regular food buffs are mutually exclusive per effect — picking a second food of the same stat replaces the first. Different stats can be combined.",
    foodStackHint: "These stack with the regular buff and with each other.",

    fields: {
      physAtk: {
        label: "Phys Atk",
        hint: "Flat Phys/Mag Atk from the stat window",
      },
      atkPercent: {
        label: "Phys/Mag Atk",
        hint: "Total Phys/Mag Atk % from the stat window",
      },
      dmgPercent: {
        label: "Phys/Mag Dmg",
        hint: "Total Phys/Mag Dmg % from the stat window",
      },
      bossAtkPercent: {
        label: "Boss Atk",
        hint: "Only applies when the target is a boss",
      },
      critRatePercent: {
        label: "Crit Rate",
        hint: "Chance to land a critical hit (max 100%)",
      },
      critDmgPercent: {
        label: "Crit Dmg",
        hint: "Bonus damage on critical hits",
      },
      finalDmgPercent: {
        label: "Final Dmg",
        hint: "Total Final Dmg % from the stat window",
      },
      statDefIgnoreRatePercent: {
        label: "Def Ignore Rate",
        hint: "From the stat window — stacks with node DIR sources",
      },
      skillPercent: {
        label: "Skill Dmg",
        hint: "Damage % of the skill line you are testing",
      },
      skillFinalDmgPercent: {
        label: "Final Dmg",
        hint: "From the skill's enhancement — enter the value at your level",
      },
      characterLevel: { label: "Character Level", hint: "Your current level" },
      monsterLevel: {
        label: "Monster Level",
        hint: "Higher-level monsters reduce your damage",
      },
      bossPdrPercent: {
        label: "Boss Defense (PDR)",
        hint: "Damage the boss's defense removes — reduced by Def Ignore Rate",
      },
      monsterCritResPercent: {
        label: "Monster Crit Resistance",
        hint: "Subtracts from your Crit Rate before the 100% cap",
      },
    },
  },

  flames: {
    metaTitle: "MapleStory M Rebirth Flame Probabilities",
    metaDescription:
      "Every MapleStory M Rebirth Flame option and its exact drop rate, ported from Nexon's official probability disclosure. Pick an equipment part and flame tier, select the options you want, and see your chance per flame — for any one of them, or for two specific options landing on the same flame — plus how many flames you need.",
    h1: "Rebirth Flame Probabilities",
    intro:
      "Nexon's official Rebirth Flame tables, made interactive. Pick an equipment part and flame tier, tap the option values you actually want, and see your chance per flame — plus how many flames it takes for a coin-flip or a near-certain hit.",

    ariaTable: "Rebirth Flame probabilities",
    perOptionSlot: "Per option slot",
    perFlame: "Per flame",
    perFlameAll: "All, per flame",
    perFlameGroup: "Group, per flame",
    for50: "Flames for 50%",
    for90: "Flames for 90%",
    tapHint: "Tap any value below to pick the options you want.",
    selectedOne: "{count} line selected · {two}% chance of a 2nd option",
    selectedOther: "{count} lines selected · {two}% chance of a 2nd option",
    selectedAllOne: "Chasing {count} line · {two}% chance of a 2nd option",
    selectedAllOther:
      "Chasing {count} lines together · {two}% chance of a 2nd option",
    selectedGroupOne:
      "Chasing {count} option from {options} selected lines · {two}% chance of a 2nd option",
    selectedGroupOther:
      "Chasing {count} options from {options} selected lines · {two}% chance of a 2nd option",
    matchLabel: "What counts as a hit",
    matchAny: "Any of them",
    matchAll: "All of them",
    matchGroup: "Count from group",
    matchAnyHint: "At least one selected line lands on the flame.",
    matchAllHint:
      "Every selected line lands on the same flame at once. Tap a value again to ask for it on both option slots — a flame can roll the same line twice.",
    matchGroupHint:
      "Your picks are one group, and only the number of options drawn from it counts — not which ones. Tick every line you would accept, ask for 2, and you get the odds of a flame where both options are useful.",
    groupNeedLabel: "Options from the group",
    groupNeedOne: "{count} option",
    groupNeedOther: "{count} options",
    groupNeedTwoHint:
      "Both options from the group needs a two-option roll, so the tier's second-option chance caps this outright.",
    allImpossible:
      "A flame rolls at most 2 options, so {count} lines at once can never happen.",
    setup: "Flame setup",
    tier: "Rebirth Flame tier",
    eternal: "Eternal Rebirth Flame",
    eternalHint:
      "— always rolls 2 options. Values still come from the tier selected above.",
    searchPlaceholder: "e.g. Boss ATK, Crit DMG, Final DMG",
    anyValue: "Any value",
    best: "Best",
    tableTitle: "{slot} — {rarity}",
    tableFootnote:
      "Each option rolls one of four values, all equally likely — so a single value is “any value” ÷ 4. Values run best-first. All lines total {total}%; Nexon rounds each entry to two decimals.",
    cellAria: "{option}, grade {grade}: {value}% at {prob}% chance",
    cellAriaStack:
      "{option}, grade {grade}: {value}% at {prob}% chance, wanted on {count} option slots",
    stackBadge: "×{count}",
    noteIndependent:
      "“Per flame” assumes the two options roll independently — Nexon does not disclose whether the second option can repeat the first.",
    noteSource: "Data from {link}, last updated {date}.",
    sourceLabel: "Nexon official probability disclosure — Rebirth Flame",
    dataNotes: [
      "The range of available options differs depending on the item part the Rebirth Flame is applied to.",
      "Up to 2 options can appear when using Rebirth Flames.",
      "Probabilities are rounded to the second decimal place, so a column may not total exactly 100%.",
    ],

    steps: [
      {
        title: "Pick the equipment part",
        body: "Each part rolls from its own option pool — weapons get attack-scaling lines, armour gets defence-scaling lines. Changing the part rebuilds the whole table.",
      },
      {
        title: "Pick the flame tier",
        body: "The tier sets both the option values and the chance of a second option. Tick Eternal Rebirth Flame if you are using one — it always rolls two options, using the values of the tier you selected.",
      },
      {
        title: "Tap the values you want",
        body: "Tap a single value to target exactly that roll, or tap the option name to select all four of its values at once. Selecting more lines makes the target easier, never harder.",
      },
      {
        title: "Read your odds",
        body: "The card at the top updates live: your chance on one option slot, your real chance per flame, and how many flames it takes to reach a 50% or 90% cumulative shot.",
      },
      {
        title: "Decide what counts as a hit",
        body: "“Any of them” — the default — counts a flame as a hit when at least one of your picks lands. “All of them” asks for every pick on the same flame, which needs a two-option roll; tapping a value again asks for that same line on both option slots. “Count from group” treats your picks as one bucket and asks only how many of the flame's options fell into it, whichever ones they are. All three readings come from the same published tables; only the question changes.",
      },
      {
        title: "Use the group mode for “both options useful”",
        body: "Tick every line you would be happy to see, switch to “Count from group” and ask for 2. That answers the question flaming actually poses — not “did I get this exact line?” but “did both options come back useful?” Asking for 1 gives the same number as “Any of them”, since one option from the group is exactly one pick landing. Asking for 2 needs a two-option roll, so the tier's second-option chance is a hard ceiling on it.",
      },
    ],

    exampleIntro: "On a {slot} with a {rarity} flame, chasing {option}:",
    exampleBest: "Only the max roll ({value})",
    exampleAny: "Any of its {count} values",
    examplePerFlame: "{chance} per flame · ",
    exampleFlames: "{count} flames",
    exampleGap:
      "That gap is the decision most players are actually making. Holding out for the max roll costs roughly {ratio}× as many flames as accepting any roll of the option.",

    readAnyValue:
      "Any value is the chance of rolling that option at all, no matter which of its four values you get.",
    readAnyValueTerm: "Any value",
    readGrades:
      "Best → #4 are the four possible values, strongest first. All four are equally likely, so a single value is always “any value” ÷ 4.",
    readGradesTerm: "Best → #4",
    readSlots:
      "Per option slot is your chance on one draw; per flame is higher because a flame can roll a second option.",
    readSlotsTerm: "Per option slot",
    readSlotsTerm2: "per flame",
    readModes:
      "Any of them is a hit when one pick lands; All of them needs every pick on one flame, and the headline switches to “All, per flame”. A ×2 badge on a value means you asked for it on both option slots. Count from group ignores which lines landed and counts how many came from your selection, showing “Group, per flame”.",

    spendPity:
      "There is no pity. Flame number {count} has the same odds as flame number one — “flames for 50%” describes a spread across many players, not a countdown for you.",
    spendAny:
      "Selecting several lines means any of them until you switch to All of them. Two specific options on one flame is a much rarer event, since it can only land on a two-option roll.",
    spendStack:
      "Asking for the same line on both option slots is rarer still — it squares that one line's chance — and three lines at once is impossible, since a flame never rolls more than two options.",
    spendTier:
      "The counts assume every flame is the tier you picked. A Rare flame can never roll a second option at all.",

    sim: {
      title: "Roll simulator",
      intro:
        "Roll against the same published tables, using the options you selected above. Watching the variance tells you more than the percentage does.",
      needPick: "Select an option above to roll against a target.",
      rollOnce: "Roll once",
      untilHit: "Roll until hit",
      rollBatch: "Roll 100×",
      reset: "Reset",
      empty: "No flames rolled yet.",
      hit: "Hit",
      miss: "No match",
      slot: "Option {n}",
      spent: "Flames rolled",
      hits: "Hits",
      observed: "Observed",
      expected: "Expected {chance}%",
      untilHitOne: "Hit on the first flame.",
      untilHitOther: "Hit after {count} flames.",
      vsMedian: "The table's coin-flip mark is {count}.",
      exhausted:
        "No hit in {count} flames — the run stopped at its limit, not at a guarantee.",
      batch: "{hits} hits in {count} flames.",
      disclaimer:
        "Simulated with your browser's random number generator against Nexon's published probabilities. This is not the game's RNG, and nothing rolled here touches your account.",
    },

    howToName: "How to read the MapleStory M Rebirth Flame probability table",
    howToDescription:
      "Work out your real chance of rolling a specific Rebirth Flame option, and how many flames it takes.",
    appName: "Rebirth Flame Probabilities",

    faq: [
      {
        question:
          "What are the odds of getting a specific Rebirth Flame option?",
        answer:
          "Each option line has its own published chance — most sit near 1.5–1.7% per option slot. Select the lines you want in the table and the calculator sums them, then factors in the chance of a second option to give your real chance per flame.",
      },
      {
        question: "How does the second Rebirth Flame option work?",
        answer:
          "A flame normally rolls one option, with a tier-based chance of rolling a second: 0% for Rare, 0.1% Epic, 0.3% Unique, 3% Legendary and 8% Mythic. The Eternal Rebirth Flame always rolls two options.",
      },
      {
        question: "Do all equipment parts share the same flame options?",
        answer:
          "No. The available option pool depends on the part. Weapons roll attack-scaling lines, armour parts roll defence-scaling lines, and Final DMG Increase or DEF Ignore Rate only appear on Legendary and Mythic tiers.",
      },
      {
        question: "Why don't the probabilities add up to exactly 100%?",
        answer:
          "Nexon rounds every entry to two decimal places, so a column totals slightly above or below 100%. The table shows the real column total so you can see the rounding drift.",
      },
      {
        question: "What does 'flames for 50%' mean?",
        answer:
          "It is how many flames you need before your cumulative chance of hitting at least one selected option reaches 50%. It is not a guarantee and not a countdown — there is no pity system, so every flame has the same chance as the first. Half of players hit the option by that point and half do not, and the 90% figure shows how long the unlucky tail runs.",
      },
      {
        question: "What happens when I select more than one value?",
        answer:
          "That depends on the match mode. Under “Any of them” the selected chances add together, so every extra line you tick makes the target easier — an option slot draws exactly one line. Under “All of them” each pick becomes a separate requirement that must land on the same flame, which is far rarer because it needs a two-option roll.",
      },
      {
        question:
          "What are the odds of getting two specific flame options at once?",
        answer:
          "Switch the table to “All of them”. Two specific lines can only land on a two-option roll, so the chance is roughly the tier's second-option chance times the two lines' odds — an Eternal Rebirth Flame, which always rolls two options, is dramatically better for this. Three lines at once is impossible and shows 0%. Tap a value twice to ask for that same line on both option slots.",
      },
      {
        question: "What are the odds of both flame options being useful?",
        answer:
          "Switch the table to “Count from group”, tick every line you would be happy to see, and ask for 2 options from the group. That counts how many of the flame's options fell inside your selection rather than demanding specific ones, which is the question flaming really poses. It needs a two-option roll, so the tier's second-option chance is a hard ceiling — an Eternal Rebirth Flame always rolls two and removes that ceiling entirely.",
      },
    ],
  },

  cubes: {
    metaTitle: "MapleStory M Cube Probabilities",
    metaDescription:
      "Every MapleStory M potential and bonus potential option with its exact chance, ported from Nexon's official probability disclosure. Pick a part, rank and line, select the options you want, and see your chance per cube — for any one line, or for two or three specific lines on the same item — and how many cubes it takes.",
    h1: "Cube Probabilities",
    intro:
      "Nexon's official potential and bonus potential tables, made interactive. Pick a part, rank and line pool, tap the options you actually want, and see your chance per cube — plus how many cubes it takes to get there.",

    ariaTable: "Cube probabilities",
    onThisLine: "On this line",
    perCube: "Per cube",
    perCubeAll: "All, per cube",
    perCubeGroup: "Group, per cube",
    for50: "Cubes for 50%",
    for90: "Cubes for 90%",
    tapHint: "Tap the lines you want. Picks apply to both pools.",
    selectedOne: "{count} line selected · 1st {first}% · 2nd/3rd {second}%",
    selectedOther: "{count} lines selected · 1st {first}% · 2nd/3rd {second}%",
    selectedAllOne: "Chasing {count} line on {lines} lines",
    selectedAllOther: "Chasing {count} lines together on {lines} lines",
    selectedGroupOne:
      "Chasing {count} of {lines} lines from {options} selected lines",
    selectedGroupOther:
      "Chasing {count} of {lines} lines from {options} selected lines",
    matchLabel: "What counts as a hit",
    matchAny: "Any of them",
    matchAll: "All of them",
    matchGroup: "Count from group",
    matchAnyHint: "At least one selected line lands on the item.",
    matchAllHint:
      "Every selected line lands on the same item at once. Tap a value again to ask for it on 2 or 3 lines — an item can roll the same attribute more than once.",
    matchGroupHint:
      "Your picks are one group, and only the number of lines drawn from it counts — not which ones. Tick every attack option, ask for 3, and you get the odds of an all-attack item.",
    groupNeedLabel: "Lines from the group",
    groupNeedOne: "{count} line",
    groupNeedOther: "{count} lines",
    allImpossible:
      "{count} lines cannot fit on {lines} lines — raise the line count.",
    setup: "Cube setup",
    cubeType: "Cube type",
    potential: "Potential",
    bonusPotential: "Bonus Potential",
    noBonus: "{part} has no bonus potential.",
    rank: "Potential rank",
    showingPool: "Showing pool",
    poolFirst: "1st line",
    poolSecond: "2nd / 3rd line",
    linesOnItem: "Lines on your item",
    lineCountOne: "{count} line",
    lineCountOther: "{count} lines",
    searchPlaceholder: "e.g. PHY ATK, Boss, Crit",
    value: "Value",
    chance: "Chance",
    valueCountOne: "{count} value",
    valueCountOther: "{count} values",
    tableTitle: "{part} — {rank} · {pool}",
    tableFootnote:
      "{count} lines in this pool, totalling {total}%. Nexon rounds each entry to two decimals.",
    cellAria: "{option} {value}, {prob}% chance",
    cellAriaStack: "{option} {value}, {prob}% chance, wanted on {count} lines",
    stackBadge: "×{count}",
    rankUpTitle: "Rank-up chance per cube",
    rankUpRow: "{chance}% rank up · ",
    rankUpCubes: "{count} cubes",
    rankUpNote:
      "Ranking up is a separate roll from the option lines — these cubes differ only in rank-up chance and function, never in the option probabilities.",
    noteIndependent:
      "“Per cube” assumes the lines roll independently — Nexon does not disclose whether one line can repeat another.",
    noteSource: "Data from {link}.",
    sourceLabel: "Nexon official probability disclosure — Cube",
    dataNotes: [
      "The item's Potential Rank is set by its first potential.",
      "Occult, Red, Black and Choice Cubes differ only in function — the option probabilities are identical.",
      "Second and third potential lines roll from a different, larger pool than the first line.",
      "Individual probabilities are rounded to two decimal places, so a pool may not total exactly 100%.",
    ],

    steps: [
      {
        title: "Pick the part and rank",
        body: "Every equipment part has its own option pool, and the pool changes completely with the potential rank. Pendant, Ring and Pocket have no bonus potential, so that option is disabled for them.",
      },
      {
        title: "Choose potential or bonus potential",
        body: "They are separate systems with separate tables and separate cubes. Bonus potential lines come from a smaller pool than regular potential.",
      },
      {
        title: "Pick the line pool",
        body: "The first potential line rolls from a different, usually smaller pool than the second and third lines. Switch pools to see each one — anything you select stays selected in both.",
      },
      {
        title: "Select what you want and read the odds",
        body: "Tap an option name to take every value of that stat, or tap a single value to target exactly that roll. The card shows your chance on the shown line, your chance per cube across the whole item, and how many cubes reach a 50% or 90% shot.",
      },
      {
        title: "Decide what counts as a hit",
        body: "“Any of them” — the default — counts a cube as a hit when at least one of your picks lands. “All of them” asks for every pick on the same item at once, and tapping a value again asks for that same line on 2 or 3 lines. “Count from group” treats your picks as one bucket and asks only how many of the item's lines fell into it, whichever ones they are. All three readings come from the same published tables; only the question changes.",
      },
      {
        title: "Use the group mode for “all three lines are attack”",
        body: "Tick every line you would be happy to see — say PHY ATK, Crit ATK and Crit DMG on a weapon — switch to “Count from group”, and ask for 3 lines from the group. That is the question players actually ask, and it is a different one from either of the others: “All of them” would demand those three specific lines in that combination, while the group reading accepts any mix of them. On a Legendary weapon it is about 3.6% per cube, against 0.18% for three lines of PHY ATK alone. Asking for 1 gives the same number as “Any of them”, since one line from the group is exactly one pick landing.",
      },
    ],

    exampleIntro: "Chasing {option} {value} on a {rank} {part}:",
    exampleOne: "On the 1st line only",
    exampleThree: "Anywhere on a 3-line item",
    examplePerCube: "{chance} per cube · ",
    exampleCubes: "{count} cubes",
    exampleGap:
      "Accepting the line anywhere on the item instead of demanding it in the first slot is dramatically cheaper — which is why it pays to decide up front how strict you actually need to be.",

    readHeaderRows:
      "Each option is a header row showing the combined chance of that stat at any value, with its individual values listed underneath.",
    readPools:
      "On this line is your chance on the pool currently shown; per cube combines the first and second/third pools across all the lines on your item.",
    readPoolsTerm: "On this line",
    readPoolsTerm2: "per cube",
    readPersist:
      "Selections persist when you switch pools, so you can pick the same stat in both and see the true per-cube number.",
    readModes:
      "Any of them is a hit when one pick lands; All of them needs every pick on the item at once, and the headline switches to “All, per cube”. A ×2 badge on a value means you asked for it on two lines. Count from group ignores which lines landed and counts how many came from your selection, showing “Group, per cube”.",

    spendSeparate:
      "Ranking up and rolling options are separate rolls. A cube that fails to rank up still rerolls your lines.",
    spendPity:
      "There is no pity on either roll. Cube number {count} has the same rank-up chance as the first.",
    spendAny:
      "Selecting several lines means any of them until you switch to All of them — and that switch is not a small step: two specific lines together is orders of magnitude rarer than either one alone.",
    spendStack:
      "Asking for the same line twice is rarer still, and asking for more lines than your item has is simply impossible — the table says 0% rather than pretending otherwise.",

    sim: {
      title: "Roll simulator",
      intro:
        "Roll against the same published tables, using the lines you selected above. Watching the variance tells you more than the percentage does.",
      needPick: "Select a line above to roll against a target.",
      rollOnce: "Roll once",
      untilHit: "Roll until hit",
      rollBatch: "Roll 100×",
      reset: "Reset",
      empty: "No cubes rolled yet.",
      hit: "Hit",
      miss: "No match",
      slot: "Line {n}",
      spent: "Cubes rolled",
      hits: "Hits",
      observed: "Observed",
      expected: "Expected {chance}%",
      untilHitOne: "Hit on the first cube.",
      untilHitOther: "Hit after {count} cubes.",
      vsMedian: "The table's coin-flip mark is {count}.",
      exhausted:
        "No hit in {count} cubes — the run stopped at its limit, not at a guarantee.",
      batch: "{hits} hits in {count} cubes.",
      disclaimer:
        "Simulated with your browser's random number generator against Nexon's published probabilities. This is not the game's RNG, and nothing rolled here touches your account.",
    },

    howToName: "How to read the MapleStory M cube probability table",
    howToDescription:
      "Work out your real chance of rolling a specific potential line, and how many cubes it takes.",
    appName: "Cube Probabilities",

    faq: [
      {
        question: "What are the odds of a specific cube line in MapleStory M?",
        answer:
          "Each line has its own published chance, and it depends on the equipment part, the potential rank, and whether it is the first line or the second/third line. Select the lines you want in the table and the calculator sums them, then combines the pools to give your chance per cube.",
      },
      {
        question:
          "Do Occult, Red, Black and Choice Cubes have different options?",
        answer:
          "No. Nexon states the option probabilities are identical across Occult, Red, Black and Choice Cubes — they differ only in function and in rank-up chance. Occult and Red rank up 1% of the time, Black and Choice 2%.",
      },
      {
        question: "Why is the second line different from the first line?",
        answer:
          "Nexon publishes two separate pools per rank. The first potential line draws from one pool and the second and third lines draw from another, which is usually much larger — so a line that is common in the first slot can be rare in the others.",
      },
      {
        question: "How many cubes does it take to rank up potential?",
        answer:
          "Rank-up is a separate roll from the options: 1% per cube for Occult and Red Cubes, 2% for Black and Choice Cubes. That is about {slow} cubes for a 50% chance at 1%, or {fast} cubes at 2%. There is no pity — each cube is independent.",
      },
      {
        question:
          "What are the odds of getting two specific potential lines on the same item?",
        answer:
          "Switch the table to “All of them”. It works out the chance that every line you picked lands on one item at once, across the lines your item actually has — the first line draws from a different pool than the second and third, so the pools are combined rather than multiplied naively. Tap a value twice to ask for that same line on two lines. Asking for more lines than the item has shows 0%, because it cannot happen.",
      },
      {
        question:
          "What are the odds of all three lines being attack lines on a weapon?",
        answer:
          "Switch the table to “Count from group”, tick every attack option you would accept, and ask for 3 lines from the group. It works out the chance that that many of the item's lines fall inside your selection, whichever lines they turn out to be — the question “all three lines are attack” asks, rather than any one named line. On a weapon, PHY ATK alone on all three lines is about 0.18% per cube; widening the group to PHY ATK, Crit ATK and Crit DMG lifts it to roughly 3.6%.",
      },
      {
        question: "Which parts have bonus potential?",
        answer:
          "Most equipment does, but Pendant, Ring and Pocket have no bonus potential table in Nexon's disclosure, so the calculator disables that option for them.",
      },
    ],
  },
};

export default en;

/**
 * Shape every other locale must match. Inferred from `en` rather than
 * declared separately, so adding a key here is enough to make the other
 * dictionaries fail to compile until they carry it too. (Deliberately not
 * `as const`: the literal types would make every translated value a type
 * error.)
 */
export type Dictionary = typeof en;
