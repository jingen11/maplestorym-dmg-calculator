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
    starforce: "Star Force",
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
    metaTitle: "MapleStory M Damage Calculator — Boss, IED & Crit",
    metaDescription:
      "Enter your MapleStory M stats, get mob and boss damage per hit — level-gap penalty, boss defense (IED), crit min–max and food buffs applied. Free, no sign-up.",
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
    starforceLink: "Star Force cost →",
    starforceBlurb:
      "How many mesos it usually takes to reach each star — expected and typical cost from your star to your target, with the drop and break odds of every tap.",
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
        question: "Which stat gives me the most damage?",
        answer:
          "There is no universal answer — the damage brackets multiply each other, so the stat you have least of is usually worth the most. The Stat efficiency table answers it for your build: it raises one stat at a time and shows the resulting % damage increase against mobs and bosses, so you can compare a flame, a potential line and an emblem on the same scale.",
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
    atCap: "MAX",
    atCapHint:
      "This hit is at your damage cap — the numbers above it are what the cap allows, not what your stats produce.",
    stepGain: "(+{percent}% · +{value})",
    stepGainHint:
      "What this hit becomes with every gain from the Stat efficiency table applied at once.",
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

    efficiency: {
      title: "Stat efficiency",
      intro:
        "What a new line would actually buy you. Each row raises one stat in your stat window and shows the damage you gain — so before you cube, flame or swap an emblem, you can see which line is worth chasing. Set a step to the value you might roll and read the two columns.",
      stat: "Stat",
      step: "Gain",
      mob: "Normal monsters",
      boss: "Boss",
      best: "Best",
      bestAria: "Biggest boss damage gain",
      none: "Nothing for this target",
      capped:
        "Crit Rate is already at the 100% cap, so more of it does nothing.",
      note: "Worked out from your base stats only — food and hyper skill bonuses are left out, because a reroll changes your stat window, not the buffs on top of it. Each row re-runs the full formula with that one stat raised; the brackets multiply each other, so these numbers shift as your gear does. They compare stats at a fixed step, not what it costs to get there.",
      ariaTable: "Damage gain per stat",
    },

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
      maxDamage: {
        label: "Max Dmg",
        hint: "Your damage cap — clamps crit hits only. 0 for no cap",
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
    metaTitle: "MapleStory M Rebirth Flame Odds & Flames Needed",
    metaDescription:
      "See your real chance per flame and how many flames it takes — every MapleStory M Rebirth Flame option by equipment part and tier, from Nexon's official rates.",
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
    metaTitle: "MapleStory M Cube Odds & Cubes Needed per Line",
    metaDescription:
      "See your chance per cube and how many cubes it takes — every MapleStory M potential and bonus potential line by part and rank, from Nexon's official rates.",
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

  starforce: {
    metaTitle: "MapleStory M Star Force Cost — Mesos per Star",
    metaDescription:
      "How many mesos to reach each star in MapleStory M? Expected and typical Star Force cost from your star to your target, with drop and break odds per tap.",
    h1: "Star Force Cost Calculator",
    intro:
      "Pick your current star and your target and see what the climb usually costs — the expected mesos, the typical run and the unlucky tail, star by star — with the success, drop and break chance of every tap.",

    ariaTool: "Star Force cost calculator",
    climb: "★{from} → ★{to}",
    expected: "Expected cost",
    typical: "Typical run",
    unlucky: "Unlucky run",
    taps: "Expected taps",
    breaks: "Expected breaks",
    typicalHint:
      "Typical is the median of {runs} simulated runs; 9 in 10 runs finish under the unlucky figure.",
    simCapped:
      "Simulated runs stop at ★{star} — above it a single climb takes too many taps to play out in a browser. Expected values still cover every star.",

    /* Meso amounts are compacted to the unit players actually say. Largest
       unit first; `value` is the threshold, `suffix` is appended to the
       scaled number. */
    mesoUnits: [
      { value: 1e9, suffix: " bil" },
      { value: 1e6, suffix: " mil" },
      { value: 1e3, suffix: "k" },
    ],

    setup: "Your climb",
    from: "Current star",
    to: "Target star",
    starValue: "★{star}",
    minigame: "I always land the +5% minigame",
    minigameHint:
      "— multiplies each success chance by 1.05 (30% becomes 31.5%). The bonus comes out of the keep-star chance, never the drop or break chance.",
    repair: "Repair cost per break",
    repairHint:
      "Mesos to restore a broken item before the next tap. Set 0 if a Shielding Ward makes breaks free.",

    chartTitle: "Mesos to reach each star",
    chartSubtitle: "Cumulative from ★{from}. Hover or tap a star for the numbers.",
    scale: "Scale",
    scaleLog: "Log",
    scaleLinear: "Linear",
    legendExpected: "Expected",
    legendMedian: "Typical (median)",
    legendBand: "10–90% of runs",
    chartAria:
      "Chart of cumulative mesos needed to reach each star from ★{from} to ★{to}",
    pointAria:
      "★{star}: expected {expected}, typical {median}, unlucky {p90}",
    tooltipStep: "This star alone: {cost} expected over {taps} taps",
    tooltipNoSim: "Not simulated",

    tableTitle: "Star by star",
    colStar: "Star",
    colTap: "Per tap",
    colSuccess: "Success",
    colKeep: "Keep",
    colDrop: "Drop",
    colBreak: "Break",
    colStep: "This star",
    colCumulative: "Expected total",
    colMedian: "Typical total",
    colP90: "Unlucky total",
    tableFootnote:
      "Each row is the tap from the previous star. Totals run from ★{from} and include {repair} per break.",

    noteSource: "Rates and costs from the {link}, last checked {date}.",
    sourceLabel: "community Star Force cost spreadsheet",
    dataNotes: [
      "Each row is one enhancement tap from the previous star to this one: the meso cost and the chance of success, keeping the star, dropping one star, or breaking.",
      "A break keeps the star, but the item has to be repaired for mesos before it can be enhanced again.",
      "The source lists ★11 and ★12 with no break chance, but those rows only total 95% and its +5% table shows 5% break for both — 5% is used here.",
      "Expected values are solved exactly from the rates. The typical and unlucky figures come from thousands of climbs simulated in your browser against the same table.",
    ],

    steps: [
      {
        title: "Set your current and target star",
        body: "Drag the two sliders. The headline, the chart and the table all rebuild for that climb — costs are cumulative from your current star, not from zero.",
      },
      {
        title: "Say how you tap",
        body: "Tick the minigame box if you reliably land the +5% timing bonus; it multiplies every success chance by 1.05. Set the repair cost to what a break actually costs you — or 0 if a Shielding Ward covers it.",
      },
      {
        title: "Read the three numbers",
        body: "Expected is the long-run average, pulled up by the unlucky few. Typical is the median run — half of players spend less, half more. Unlucky is where 9 in 10 runs have finished. Budget for typical; know unlucky.",
      },
      {
        title: "Read the chart",
        body: "Each point is the total to first reach that star. The orange line is the expected cost, the blue line the median run, and the shaded band where 80% of runs land. The scale is logarithmic because each star costs several times the last — flip to linear to feel the wall.",
      },
      {
        title: "Check the tap odds",
        body: "The table shows what a single tap does at each star — success, keep, drop, break — and what that star alone is expected to cost on top of everything before it.",
      },
    ],

    exampleIntro:
      "Climbing from ★{from} to ★{to} with no minigame bonus and a {repair} repair per break:",
    exampleExpected: "Expected cost",
    exampleTaps: "Expected taps",
    exampleBreaks: "Expected breaks",
    exampleLast: "The last star alone",
    exampleShare: "{share}% of the whole climb",
    exampleGap:
      "That is the shape of every Star Force climb: past ★15 each star costs about as much as every star before it combined, so the last star is always the bulk of the bill.",

    readExpected:
      "Expected cost is the long-run average — what the climb costs per player if thousands of players did it. A few disastrous runs pull it well above what most players pay.",
    readExpectedTerm: "Expected cost",
    readTypical:
      "Typical run is the median of simulated runs — half finish cheaper, half dearer. Unlucky run is where 90% of runs have finished; the last 10% run longer still.",
    readTypicalTerm: "Typical run",
    readTypicalTerm2: "Unlucky run",
    readLog:
      "Log scale is the default because each star costs several times the last — on a linear scale everything before the final star flattens to nothing. Linear is there to show exactly that.",
    readLogTerm: "Log",
    readLogTerm2: "Linear",

    spendDrops:
      "From ★10 upward a failed tap can drop you a star, and from the same point it can break the item. Both are already priced into the expected cost — a drop means paying for the previous star all over again.",
    spendBreak:
      "A break keeps your star but costs a repair before you can tap again. Set the repair cost to 0 to see exactly what a Shielding Ward is worth to you.",
    spendTail:
      "Budget for the typical run and know the unlucky figure before you start. At ★17 and above one long drop streak can double a climb — the mean does not warn you about that, the band does.",
    spendWall:
      "Past ★20 every tap succeeds 1% of the time and drops 40% of the time. ★21 alone is expected to cost more than thirty times the entire climb from ★0 to ★20.",

    howToName: "How to estimate MapleStory M Star Force costs",
    howToDescription:
      "Work out how many mesos it usually takes to reach a target star from your current star, and how much the unlucky tail adds.",
    appName: "Star Force Cost Calculator",

    /* {to17}, {to20}, {star21} and friends are filled from the same table
       the calculator uses, so the answers can never drift from the tool. */
    faq: [
      {
        question: "How many mesos does it take to reach 17 stars in MapleStory M?",
        answer:
          "From ★0, the expected cost to reach ★17 is about {to17} including repairs, and a typical run comes in around {to17typical}. ★18 is about {to18} expected, ★20 about {to20}. Set your own current star in the calculator — the total from ★10 is barely lower than from ★0, because the low stars are almost free by comparison.",
      },
      {
        question: "What are the Star Force success rates in MapleStory M?",
        answer:
          "They start at 100% for ★1 and fall 5% per star: 95% for ★2, 50% for ★11, 30% for ★15, 20% for ★17, 10% for ★19 and 5% for ★20. From ★21 every tap is 1%. The full per-tap table — success, keep, drop and break — is on this page.",
      },
      {
        question: "When can Star Force enhancement drop a star or break the item?",
        answer:
          "Taps from ★10 upward (that is, going for ★11 or higher) can drop one star or break the item. Drop chance climbs from 10% at ★11 to 30% at ★19–20 and 40% from ★21; break chance is 5% from ★11 to ★20, 10% from ★21 and 15% from ★26. A break keeps the star but the item must be repaired before the next tap.",
      },
      {
        question: "Is the +5% Star Force minigame worth doing?",
        answer:
          "Yes — it is a multiplicative 1.05 on the success chance, so 20% becomes 21%, and the extra comes out of the keep-star chance. That trims the expected cost of a ★0 to ★20 climb from about {to20} to {to20mg}, roughly {mgSaving}% off, for nothing but a well-timed tap.",
      },
      {
        question: "Why is the expected cost so much higher than the typical cost?",
        answer:
          "Because Star Force costs are skewed: most runs are unremarkable, but a few hit a long streak of drops at high stars and cost several times the median. Those runs pull the average up. The typical figure is what half of players beat; the unlucky figure is what 9 in 10 beat.",
      },
      {
        question: "How much does 21 stars and above cost?",
        answer:
          "From ★21 every tap is 1% to succeed and 40% to drop, so the expected cost of ★21 alone is around {star21} — more than the entire climb from ★0 to ★20 many times over. The calculator shows the expected values up to ★{max}, but the simulated typical and unlucky figures stop where a single run would take millions of taps.",
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
