import type { Dictionary } from "./en";

const id: Dictionary = {
  nav: {
    damage: "Damage",
    flames: "Flame",
    cubes: "Cube",
    language: "Bahasa",
    skipToContent: "Lewati ke konten",
  },

  footer: {
    basedOn:
      "Berdasarkan spreadsheet komunitas “{name}” (terakhir diperbarui {date}). Kredit:",
    disclaimer:
      "{site} adalah alat buatan penggemar dan tidak berafiliasi dengan Nexon. MapleStory M adalah merek dagang Nexon Co., Ltd.",
    lastUpdated: "30 Juli 2024",
  },

  credits: {
    Paulpork: "rumus damage",
    櫻櫻美代套子: "kalkulator stat setelah buff versi awal",
    KaitouKiddo: "kalkulator damage + emblem versi awal",
    "殘風⎝( OωO)⎠": "uji crit rate dan batas damage",
    Whaku: "spreadsheet-nya sendiri, plus uji crit rate",
    S3phy: "memperbarui spreadsheet",
    Noodlesoup: "pengujian dan pencocokan data empiris",
    Astralmist: "nilai pertahanan hasil datamine dan rumusnya",
  },

  site: {
    description:
      "Alat gratis untuk pemain MapleStory M. Kalkulator damage dengan damage per hit ke mob dan boss, pengubah selisih level, pertahanan boss (IED) dan buff makanan, plus tabel peluang Rebirth Flame dan Cube interaktif yang dibangun dari pengungkapan resmi Nexon.",
  },

  common: {
    moreTools: "Alat lainnya",
    guide: "Panduan",
    notes: "Catatan",
    filterOptions: "Saring opsi",
    option: "Opsi",
    clear: "hapus",
    noMatch: "Tidak ada opsi yang cocok dengan “{query}”.",
    workedExample: "Contoh perhitungan",
    readingTheTable: "Cara membaca tabel",
    beforeYouSpend: "Sebelum kamu belanja",
    howToUse: "Cara memakai tabel ini",
    equipmentPart: "Bagian perlengkapan",
    forACoinFlip: "untuk peluang 50/50",
    dash: "—",
  },

  home: {
    metaTitle: "Kalkulator Damage MapleStory M — Boss, IED & Crit",
    metaDescription:
      "Masukkan stat MapleStory M, dapatkan damage per hit ke mob dan boss — penalti selisih level, pertahanan boss (IED), rentang crit dan buff makanan. Gratis.",
    h1: "Kalkulator Damage MapleStory M",
    intro:
      "Masukkan stat dari jendela stat dalam game untuk melihat damage ke mob dan ke boss berdampingan — normal, kritis dan rata-rata per hit, sudah menghitung penalti level, pertahanan boss dan buff makanan. Uji perubahan stat sebelum kamu keluar meso; datamu tersimpan di browser.",
    flamesLink: "Peluang Rebirth Flame →",
    flamesBlurb:
      "Tabel flame resmi Nexon, dibuat interaktif. Pilih opsi yang kamu incar dan lihat peluang aslimu per flame — sekaligus berapa flame yang dibutuhkan.",
    cubesLink: "Peluang Cube →",
    cubesBlurb:
      "Peluang potential dan bonus potential untuk setiap bagian perlengkapan dan rank, lengkap dengan jumlah cube yang dibutuhkan untuk mendapat baris yang kamu mau.",
    damageLink: "Kalkulator damage →",
    damageBlurb:
      "Damage per hit ke mob dan boss, sudah menghitung penalti level, pertahanan boss dan buff makanan.",
    faq: [
      {
        question: "Bagaimana damage dihitung di MapleStory M?",
        answer:
          "Satu hit adalah Attack × (1 + Damage %) × (1 + Attack %) × Skill % × (1 + Final Damage %). Melawan boss, Boss Attack % × Skill % ikut masuk ke kelompok Attack %, dan hasilnya masih dikurangi lagi oleh pengubah selisih level serta pertahanan boss (PDR) setelah Def Ignore Rate kamu. Rumusnya berasal dari spreadsheet komunitas Damage & Emblem Calculator, diverifikasi lewat pengujian dalam game dan nilai pertahanan hasil datamine.",
      },
      {
        question:
          "Kenapa damage boss saya jauh lebih kecil daripada damage mob?",
        answer:
          "Ada dua pengurangan yang hanya berlaku untuk boss: pengubah selisih level berdasarkan rating pertahanan hasil datamine (melawan musuh di atas levelmu memotong damage dengan keras), dan pertahanan boss (PDR), yang membuang sebagian damage-mu kecuali kamu menumpuk Def Ignore Rate. Buka “Rincian damage ke boss” di kartu hasil untuk melihat setiap tahapnya.",
      },
      {
        question: "Sebaiknya utamakan Critical Rate atau Critical Damage?",
        answer:
          "Keduanya saling menguatkan: Critical Damage tidak berguna tanpa Critical Rate, begitu juga sebaliknya. Crit juga mengocok bonus acak 0–50% di atas Crit Damage kamu — kalkulator menampilkan nilai minimum, tengah dan maksimum dari kocokan itu. Bandingkan hit rata-rata sebelum dan sesudah perubahan stat untuk memutuskan.",
      },
      {
        question: "Bagaimana cara kerja Def Ignore Rate (IED)?",
        answer:
          "Def Ignore Rate memperkecil pengurangan damage dari pertahanan boss (PDR). Sumbernya bertumpuk secara perkalian, bukan penjumlahan: DIR di jendela stat, Node IED (+15% begitu node skill mencapai Lv 40) dan Defense Smash 4 (+25%) digabung sebagai 1 − (1−a)(1−b)(1−c).",
      },
      {
        question: "Stat mana yang memberi damage paling besar?",
        answer:
          "Tidak ada jawaban yang berlaku untuk semua — kelompok-kelompok damage saling dikalikan, jadi stat yang paling sedikit kamu miliki biasanya paling berharga. Tabel Efisiensi stat menjawabnya untuk build kamu: ia menaikkan satu stat setiap kali dan menunjukkan kenaikan damage dalam persen terhadap mob dan boss, sehingga kamu bisa membandingkan satu baris flame, satu baris potential dan satu emblem dengan ukuran yang sama.",
      },
      {
        question: "Apakah buff makanan bertumpuk di MapleStory M?",
        answer:
          "Buff makanan biasa saling meniadakan per efek — memakan makanan kedua dengan stat yang sama akan menggantikan yang pertama, tetapi stat yang berbeda bisa digabung. Beberapa item khusus (Boss Rush Boost Potion, Noodle Soup With Mushroom, Stir-Fried Pork, Escargot, Cold Jellyfish Salad) bertumpuk dengan buff biasa dan satu sama lain. Bagian Makanan memodelkan persis aturan ini.",
      },
    ],
  },

  damage: {
    ariaCalculator: "Kalkulator damage",
    panelMob: "Monster biasa",
    panelMobShort: "Biasa",
    panelBoss: "Boss",
    panelBossShort: "Boss",
    averageHit: "{target} — damage rata-rata per hit",
    bounds: "batas bawah – batas atas",
    atCap: "MAX",
    atCapHint:
      "Hit ini sudah menyentuh batas damage kamu — angka di atasnya adalah yang diizinkan batas itu, bukan yang dihasilkan statmu.",
    stepGain: "(+{percent}% · +{value})",
    stepGainHint:
      "Jadi berapa hit ini kalau semua kenaikan dari tabel Efisiensi stat diterapkan sekaligus.",
    normal: "Normal",
    critical: "Kritis",
    crit: "Crit",
    critRoll: "kocokan min – maks",
    breakdown: "Rincian damage ke boss",
    stageRaw: "Rumus mentah",
    stageLevel: "Setelah pengubah level",
    stageIed: "Setelah pertahanan boss (IED)",

    setup: "Pengaturan karakter",

    attackType: {
      pair: "Phys/Mag",
      pairPhys: "Phys",
      pairMag: "Mag",
      soloPhys: "Phys Atk",
      soloMag: "Mag Atk",
    },

    myStats: "Stat saya",
    physicalClass: "Class fisik",
    magicalClass: "Class sihir",
    myStatsHint:
      "Masukkan stat dasar di sini. Jangan sertakan buff makanan dan buff party. Sertakan buff dari dirimu sendiri.",
    toggleAria: "Beralih antara serangan fisik dan serangan sihir",

    skill: "Skill",
    nodes: "Node",
    nodeIed: "Node IED",
    nodeIedHint:
      "+15% Def Ignore Rate — aktif begitu node skill mencapai Lv 40. Centang ini hanya jika node kamu Lv 40 ke atas.",
    defenseSmash4: "Defense Smash 4",
    defenseSmash4Hint: "+25% Def Ignore Rate",
    finalDir: "Def Ignore Rate akhir:",
    finalDirHint:
      "— sumbernya bertumpuk secara perkalian, lalu baru mengurangi pertahanan boss (PDR).",

    target: "Target",
    targetHint:
      "Nilai ini hanya memengaruhi damage ke boss — damage ke mob tidak kena pengurangan level dan pertahanan.",

    modifiers: "Modifier",
    modifiersHint:
      "Hanya bonus hyper skill, ditumpuk di atas stat dasarmu. Buff sendiri dan buff party masuk ke stat dasar; makanan punya bagian tersendiri.",
    modifierHint: "Ditambahkan di atas {label} dasarmu",

    food: "Makanan",
    foodHint:
      "Buff makanan biasa saling meniadakan per efek — memilih makanan kedua dengan stat yang sama akan menggantikan yang pertama. Stat yang berbeda bisa digabung.",
    foodStackHint: "Yang ini bertumpuk dengan buff biasa dan satu sama lain.",

    efficiency: {
      title: "Efisiensi stat",
      intro:
        "Apa yang sebenarnya kamu dapat dari satu baris baru. Setiap baris menaikkan satu stat di jendela statmu dan menunjukkan damage yang kamu peroleh — jadi sebelum cube, flame atau tukar emblem, kamu bisa melihat baris mana yang layak dikejar. Atur kenaikannya ke nilai yang mungkin kamu dapat lalu baca dua kolomnya.",
      stat: "Stat",
      step: "Kenaikan",
      mob: "Monster biasa",
      boss: "Boss",
      best: "Terbaik",
      bestAria: "Kenaikan damage boss terbesar",
      none: "Tidak berpengaruh untuk target ini",
      capped: "Crit Rate sudah di batas 100%, menambahnya tidak berguna lagi.",
      note: "Dihitung hanya dari stat dasarmu — buff makanan dan bonus hyper skill tidak diikutkan, karena mengocok ulang mengubah jendela statmu, bukan buff di atasnya. Setiap baris menjalankan ulang seluruh rumus dengan satu stat itu dinaikkan; kelompok-kelompoknya saling dikalikan, jadi angka ini bergeser seiring gear-mu. Angka ini membandingkan stat pada kenaikan yang sama, bukan biaya untuk mendapatkannya.",
      ariaTable: "Kenaikan damage per stat",
    },

    fields: {
      physAtk: {
        label: "Phys Atk",
        hint: "Phys/Mag Atk angka tetap dari jendela stat",
      },
      atkPercent: {
        label: "Phys/Mag Atk",
        hint: "Total Phys/Mag Atk % dari jendela stat",
      },
      dmgPercent: {
        label: "Phys/Mag Dmg",
        hint: "Total Phys/Mag Dmg % dari jendela stat",
      },
      bossAtkPercent: {
        label: "Boss Atk",
        hint: "Hanya berlaku saat targetnya boss",
      },
      critRatePercent: {
        label: "Crit Rate",
        hint: "Peluang mendaratkan hit kritis (maks 100%)",
      },
      critDmgPercent: {
        label: "Crit Dmg",
        hint: "Damage tambahan saat hit kritis",
      },
      finalDmgPercent: {
        label: "Final Dmg",
        hint: "Total Final Dmg % dari jendela stat",
      },
      statDefIgnoreRatePercent: {
        label: "Def Ignore Rate",
        hint: "Dari jendela stat — bertumpuk dengan sumber DIR dari node",
      },
      maxDamage: {
        label: "Damage Maks",
        hint: "Batas damage kamu — hanya membatasi hit kritis. Isi 0 jika tanpa batas",
      },
      skillPercent: {
        label: "Damage Skill",
        hint: "Damage % dari baris skill yang sedang kamu uji",
      },
      skillFinalDmgPercent: {
        label: "Final Dmg",
        hint: "Dari peningkatan skill — masukkan nilai pada levelmu",
      },
      characterLevel: {
        label: "Level Karakter",
        hint: "Level kamu saat ini",
      },
      monsterLevel: {
        label: "Level Monster",
        hint: "Monster berlevel lebih tinggi mengurangi damage-mu",
      },
      bossPdrPercent: {
        label: "Pertahanan Boss (PDR)",
        hint: "Damage yang dibuang pertahanan boss — dikurangi oleh Def Ignore Rate",
      },
      monsterCritResPercent: {
        label: "Resistansi Crit Monster",
        hint: "Dikurangkan dari Crit Rate kamu sebelum batas 100%",
      },
    },
  },

  flames: {
    metaTitle: "Peluang Rebirth Flame MapleStory M & Jumlah Flame",
    metaDescription:
      "Lihat peluang aslimu per flame dan berapa flame yang dibutuhkan — semua opsi Rebirth Flame MapleStory M per bagian dan tier, dari rate resmi Nexon.",
    h1: "Peluang Rebirth Flame",
    intro:
      "Tabel Rebirth Flame resmi Nexon, dibuat interaktif. Pilih bagian perlengkapan dan tier flame, ketuk nilai opsi yang benar-benar kamu mau, lalu lihat peluangmu per flame — plus berapa flame yang dibutuhkan untuk peluang 50/50 atau nyaris pasti.",

    ariaTable: "Peluang Rebirth Flame",
    perOptionSlot: "Per slot opsi",
    perFlame: "Per flame",
    perFlameAll: "Semua, per flame",
    perFlameGroup: "Grup, per flame",
    for50: "Flame untuk 50%",
    for90: "Flame untuk 90%",
    tapHint: "Ketuk nilai mana pun di bawah untuk memilih opsi yang kamu mau.",
    selectedOne: "{count} baris dipilih · peluang opsi ke-2 {two}%",
    selectedOther: "{count} baris dipilih · peluang opsi ke-2 {two}%",
    selectedAllOne: "Mengejar {count} baris · peluang opsi ke-2 {two}%",
    selectedAllOther:
      "Mengejar {count} baris sekaligus · peluang opsi ke-2 {two}%",
    selectedGroupOne:
      "Mengejar {count} opsi dari {options} baris terpilih · peluang opsi ke-2 {two}%",
    selectedGroupOther:
      "Mengejar {count} opsi dari {options} baris terpilih · peluang opsi ke-2 {two}%",
    matchLabel: "Apa yang dihitung kena",
    matchAny: "Salah satunya",
    matchAll: "Semuanya",
    matchGroup: "Hitung dari grup",
    matchAnyHint: "Setidaknya satu baris terpilih muncul di flame itu.",
    matchAllHint:
      "Semua baris terpilih muncul sekaligus pada flame yang sama. Ketuk lagi sebuah nilai untuk memintanya di kedua slot opsi — satu flame bisa mengeluarkan baris yang sama dua kali.",
    matchGroupHint:
      "Pilihanmu dihitung sebagai satu grup, dan yang penting hanya berapa opsi yang diambil dari grup itu — bukan opsi yang mana. Centang semua baris yang kamu terima, minta 2, dan kamu dapat peluang mendapat flame yang kedua opsinya berguna.",
    groupNeedLabel: "Opsi dari grup",
    groupNeedOne: "{count} opsi",
    groupNeedOther: "{count} opsi",
    groupNeedTwoHint:
      "Dua opsi dari grup membutuhkan kocokan dua opsi, jadi peluang opsi kedua pada tier itu langsung menjadi batas atasnya.",
    allImpossible:
      "Satu flame paling banyak mengeluarkan 2 opsi, jadi {count} baris sekaligus tidak mungkin terjadi.",
    setup: "Pengaturan flame",
    tier: "Tier Rebirth Flame",
    eternal: "Eternal Rebirth Flame",
    eternalHint:
      "— selalu mengeluarkan 2 opsi. Nilainya tetap mengikuti tier yang dipilih di atas.",
    searchPlaceholder: "mis. Boss ATK, Crit DMG, Final DMG",
    anyValue: "Nilai apa pun",
    best: "Terbaik",
    tableTitle: "{slot} — {rarity}",
    tableFootnote:
      "Setiap opsi mengeluarkan satu dari empat nilai dengan peluang sama besar — jadi satu nilai tunggal adalah “nilai apa pun” ÷ 4. Nilai diurutkan dari yang terbaik. Semua baris berjumlah {total}%; Nexon membulatkan tiap entri ke dua desimal.",
    cellAria: "{option}, tingkat {grade}: {value}% dengan peluang {prob}%",
    cellAriaStack:
      "{option}, tingkat {grade}: {value}% dengan peluang {prob}%, diminta pada {count} slot opsi",
    stackBadge: "×{count}",
    noteIndependent:
      "“Per flame” mengasumsikan kedua opsi dikocok secara independen — Nexon tidak mengungkapkan apakah opsi kedua bisa mengulang opsi pertama.",
    noteSource: "Data dari {link}, terakhir diperbarui {date}.",
    sourceLabel: "Pengungkapan peluang resmi Nexon — Rebirth Flame",
    dataNotes: [
      "Rentang opsi yang tersedia berbeda-beda tergantung bagian item tempat Rebirth Flame digunakan.",
      "Paling banyak 2 opsi dapat muncul saat menggunakan Rebirth Flame.",
      "Peluang dibulatkan ke dua angka desimal, sehingga satu kolom bisa saja tidak berjumlah tepat 100%.",
    ],

    steps: [
      {
        title: "Pilih bagian perlengkapan",
        body: "Setiap bagian mengocok dari kumpulan opsinya sendiri — senjata mendapat baris yang mengikuti serangan, armor mendapat baris yang mengikuti pertahanan. Mengganti bagian akan menyusun ulang seluruh tabel.",
      },
      {
        title: "Pilih tier flame",
        body: "Tier menentukan sekaligus nilai opsi dan peluang munculnya opsi kedua. Centang Eternal Rebirth Flame jika kamu memakainya — flame itu selalu mengeluarkan dua opsi, dengan nilai dari tier yang kamu pilih.",
      },
      {
        title: "Ketuk nilai yang kamu mau",
        body: "Ketuk satu nilai untuk membidik persis kocokan itu, atau ketuk nama opsinya untuk memilih keempat nilainya sekaligus. Memilih lebih banyak baris membuat targetnya lebih mudah, tidak pernah lebih sulit.",
      },
      {
        title: "Baca peluangmu",
        body: "Kartu di bagian atas diperbarui langsung: peluangmu pada satu slot opsi, peluang aslimu per flame, dan berapa flame yang dibutuhkan agar peluang kumulatifmu mencapai 50% atau 90%.",
      },
      {
        title: "Tentukan apa yang dihitung kena",
        body: "“Salah satunya” — bawaan — menghitung sebuah flame kena bila setidaknya satu pilihanmu muncul. “Semuanya” meminta setiap pilihan muncul pada flame yang sama, yang berarti butuh kocokan dua opsi; mengetuk lagi sebuah nilai berarti meminta baris yang sama di kedua slot opsi. “Hitung dari grup” memperlakukan pilihanmu sebagai satu wadah dan hanya menanyakan berapa opsi flame itu yang jatuh ke dalamnya, opsi mana pun itu. Ketiga cara baca ini memakai tabel resmi yang sama; hanya pertanyaannya yang berbeda.",
      },
      {
        title: "Pakai mode grup untuk “kedua opsi berguna”",
        body: "Centang setiap baris yang membuatmu senang, ganti ke “Hitung dari grup” lalu minta 2. Itulah pertanyaan yang sebenarnya diajukan saat flaming — bukan “apakah aku dapat baris persis ini?” melainkan “apakah kedua opsinya berguna?” Meminta 1 memberi angka yang sama dengan “Salah satunya”, karena satu opsi dari grup persis sama dengan satu pilihan yang muncul. Meminta 2 butuh kocokan dua opsi, jadi peluang opsi kedua pada tier itu adalah batas atas yang keras.",
      },
    ],

    exampleIntro: "Pada {slot} dengan flame {rarity}, mengejar {option}:",
    exampleBest: "Hanya kocokan tertinggi ({value})",
    exampleAny: "Salah satu dari {count} nilainya",
    examplePerFlame: "{chance} per flame · ",
    exampleFlames: "{count} flame",
    exampleGap:
      "Jarak itulah keputusan yang sebenarnya diambil kebanyakan pemain. Bertahan menunggu kocokan tertinggi memakan kira-kira {ratio}× lebih banyak flame dibanding menerima nilai apa pun dari opsi tersebut.",

    readAnyValue:
      "Nilai apa pun adalah peluang mendapatkan opsi itu sama sekali, tidak peduli nilai mana dari keempatnya yang kamu dapat.",
    readAnyValueTerm: "Nilai apa pun",
    readGrades:
      "Terbaik → #4 adalah empat nilai yang mungkin muncul, terkuat lebih dulu. Keempatnya berpeluang sama, jadi satu nilai tunggal selalu sama dengan “nilai apa pun” ÷ 4.",
    readGradesTerm: "Terbaik → #4",
    readSlots:
      "Per slot opsi adalah peluangmu pada satu kocokan; per flame lebih tinggi karena satu flame bisa mengeluarkan opsi kedua.",
    readSlotsTerm: "Per slot opsi",
    readSlotsTerm2: "per flame",
    readModes:
      "Salah satunya dihitung kena bila satu pilihan muncul; Semuanya menuntut setiap pilihan muncul pada satu flame, dan judulnya berubah menjadi “Semua, per flame”. Label ×2 pada sebuah nilai berarti kamu memintanya di kedua slot opsi. Hitung dari grup mengabaikan baris mana yang muncul dan menghitung berapa yang berasal dari pilihanmu, menampilkan “Grup, per flame”.",

    spendPity:
      "Tidak ada sistem pity. Flame ke-{count} punya peluang yang sama dengan flame pertama — “flame untuk 50%” menggambarkan sebaran di antara banyak pemain, bukan hitungan mundur untukmu.",
    spendAny:
      "Memilih beberapa baris berarti salah satunya, sampai kamu beralih ke Semuanya. Dua opsi tertentu pada satu flame adalah kejadian yang jauh lebih langka, karena hanya bisa terjadi pada kocokan dua opsi.",
    spendStack:
      "Meminta baris yang sama di kedua slot opsi lebih langka lagi — peluang baris itu jadi dikuadratkan — dan tiga baris sekaligus mustahil, karena satu flame tidak pernah mengeluarkan lebih dari dua opsi.",
    spendTier:
      "Semua hitungan mengasumsikan setiap flame adalah tier yang kamu pilih. Flame Rare tidak pernah bisa mengeluarkan opsi kedua sama sekali.",

    sim: {
      title: "Simulator kocokan",
      intro:
        "Kocok dengan tabel resmi yang sama, memakai opsi yang kamu pilih di atas. Melihat sebarannya memberi tahu lebih banyak daripada angka persennya.",
      needPick: "Pilih sebuah opsi di atas untuk dijadikan target kocokan.",
      rollOnce: "Kocok sekali",
      untilHit: "Kocok sampai kena",
      rollBatch: "Kocok 100×",
      reset: "Atur ulang",
      empty: "Belum ada flame yang dikocok.",
      hit: "Kena",
      miss: "Tidak cocok",
      slot: "Opsi {n}",
      spent: "Flame dikocok",
      hits: "Kena",
      observed: "Teramati",
      expected: "Perkiraan {chance}%",
      untilHitOne: "Kena pada flame pertama.",
      untilHitOther: "Kena setelah {count} flame.",
      vsMedian: "Titik 50/50 menurut tabel adalah {count}.",
      exhausted:
        "Tidak kena dalam {count} flame — percobaan berhenti di batasnya, bukan karena jaminan.",
      batch: "{hits} kena dalam {count} flame.",
      disclaimer:
        "Disimulasikan dengan pembangkit angka acak browser-mu terhadap peluang yang dipublikasikan Nexon. Ini bukan RNG milik game, dan tidak ada yang dikocok di sini menyentuh akunmu.",
    },

    howToName: "Cara membaca tabel peluang Rebirth Flame MapleStory M",
    howToDescription:
      "Hitung peluang aslimu mendapatkan opsi Rebirth Flame tertentu, dan berapa flame yang dibutuhkan.",
    appName: "Peluang Rebirth Flame",

    faq: [
      {
        question: "Berapa peluang mendapat opsi Rebirth Flame tertentu?",
        answer:
          "Setiap baris opsi punya peluang yang dipublikasikan sendiri — sebagian besar berada di kisaran 1,5–1,7% per slot opsi. Pilih baris yang kamu mau di tabel, kalkulator akan menjumlahkannya, lalu memperhitungkan peluang munculnya opsi kedua untuk memberi peluang aslimu per flame.",
      },
      {
        question: "Bagaimana cara kerja opsi kedua Rebirth Flame?",
        answer:
          "Satu flame biasanya mengeluarkan satu opsi, dengan peluang munculnya opsi kedua sesuai tier: 0% untuk Rare, 0,1% Epic, 0,3% Unique, 3% Legendary dan 8% Mythic. Eternal Rebirth Flame selalu mengeluarkan dua opsi.",
      },
      {
        question:
          "Apakah semua bagian perlengkapan punya opsi flame yang sama?",
        answer:
          "Tidak. Kumpulan opsi yang tersedia bergantung pada bagiannya. Senjata mengeluarkan baris yang mengikuti serangan, bagian armor mengeluarkan baris yang mengikuti pertahanan, sedangkan Final DMG Increase atau DEF Ignore Rate hanya muncul di tier Legendary dan Mythic.",
      },
      {
        question: "Kenapa jumlah peluangnya tidak tepat 100%?",
        answer:
          "Nexon membulatkan setiap entri ke dua angka desimal, sehingga satu kolom berjumlah sedikit di atas atau di bawah 100%. Tabel menampilkan total kolom yang sebenarnya agar kamu bisa melihat selisih akibat pembulatan itu.",
      },
      {
        question: "Apa maksud “flame untuk 50%”?",
        answer:
          "Itu adalah berapa flame yang kamu butuhkan sebelum peluang kumulatifmu untuk mendapat setidaknya satu opsi terpilih mencapai 50%. Ini bukan jaminan dan bukan hitungan mundur — tidak ada sistem pity, jadi setiap flame punya peluang yang sama dengan yang pertama. Separuh pemain sudah mendapatkannya di titik itu dan separuhnya belum, sedangkan angka 90% menunjukkan sepanjang apa ekor yang kurang beruntung.",
      },
      {
        question: "Apa yang terjadi kalau saya memilih lebih dari satu nilai?",
        answer:
          "Itu tergantung mode kecocokan. Pada “Salah satunya” peluang yang dipilih dijumlahkan, jadi setiap baris tambahan yang kamu centang membuat targetnya lebih mudah — satu slot opsi hanya menarik tepat satu baris. Pada “Semuanya” setiap pilihan menjadi syarat terpisah yang harus muncul di flame yang sama, dan itu jauh lebih langka karena butuh kocokan dua opsi.",
      },
      {
        question: "Berapa peluang mendapat dua opsi flame tertentu sekaligus?",
        answer:
          "Ganti tabel ke “Semuanya”. Dua baris tertentu hanya bisa muncul pada kocokan dua opsi, jadi peluangnya kira-kira sebesar peluang opsi kedua pada tier itu dikali peluang kedua barisnya — Eternal Rebirth Flame, yang selalu mengeluarkan dua opsi, jauh lebih baik untuk ini. Tiga baris sekaligus mustahil dan ditampilkan sebagai 0%. Ketuk sebuah nilai dua kali untuk meminta baris yang sama di kedua slot opsi.",
      },
      {
        question: "Berapa peluang kedua opsi flame sama-sama berguna?",
        answer:
          "Ganti tabel ke “Hitung dari grup”, centang setiap baris yang membuatmu senang, lalu minta 2 opsi dari grup. Cara itu menghitung berapa opsi flame yang jatuh ke dalam pilihanmu alih-alih menuntut baris tertentu, dan itulah pertanyaan yang sebenarnya diajukan saat flaming. Cara ini butuh kocokan dua opsi, jadi peluang opsi kedua pada tier itu adalah batas atas yang keras — Eternal Rebirth Flame selalu mengeluarkan dua opsi dan menghapus batas itu sepenuhnya.",
      },
    ],
  },

  cubes: {
    metaTitle: "Peluang Cube MapleStory M & Jumlah Cube per Baris",
    metaDescription:
      "Lihat peluangmu per cube dan berapa cube dibutuhkan — semua baris potential dan bonus potential MapleStory M per bagian dan rank, dari rate resmi Nexon.",
    h1: "Peluang Cube",
    intro:
      "Tabel potential dan bonus potential resmi Nexon, dibuat interaktif. Pilih bagian, rank dan kumpulan baris, ketuk opsi yang benar-benar kamu mau, lalu lihat peluangmu per cube — plus berapa cube yang dibutuhkan untuk sampai ke sana.",

    ariaTable: "Peluang Cube",
    onThisLine: "Pada baris ini",
    perCube: "Per cube",
    perCubeAll: "Semua, per cube",
    perCubeGroup: "Grup, per cube",
    for50: "Cube untuk 50%",
    for90: "Cube untuk 90%",
    tapHint:
      "Ketuk baris yang kamu mau. Pilihan berlaku untuk kedua kumpulan baris.",
    selectedOne: "{count} baris dipilih · ke-1 {first}% · ke-2/3 {second}%",
    selectedOther: "{count} baris dipilih · ke-1 {first}% · ke-2/3 {second}%",
    selectedAllOne: "Mengejar {count} baris pada {lines} baris",
    selectedAllOther: "Mengejar {count} baris sekaligus pada {lines} baris",
    selectedGroupOne:
      "Mengejar {count} dari {lines} baris, dari {options} baris terpilih",
    selectedGroupOther:
      "Mengejar {count} dari {lines} baris, dari {options} baris terpilih",
    matchLabel: "Apa yang dihitung kena",
    matchAny: "Salah satunya",
    matchAll: "Semuanya",
    matchGroup: "Hitung dari grup",
    matchAnyHint: "Setidaknya satu baris terpilih muncul di item itu.",
    matchAllHint:
      "Semua baris terpilih muncul sekaligus pada item yang sama. Ketuk lagi sebuah nilai untuk memintanya di 2 atau 3 baris — satu item bisa mengeluarkan atribut yang sama lebih dari sekali.",
    matchGroupHint:
      "Pilihanmu dihitung sebagai satu grup, dan yang penting hanya berapa baris yang diambil dari grup itu — bukan baris yang mana. Centang semua opsi serangan, minta 3, dan kamu dapat peluang mendapat item yang semua barisnya serangan.",
    groupNeedLabel: "Baris dari grup",
    groupNeedOne: "{count} baris",
    groupNeedOther: "{count} baris",
    allImpossible:
      "{count} baris tidak muat pada {lines} baris — naikkan jumlah barisnya.",
    setup: "Pengaturan cube",
    cubeType: "Jenis cube",
    potential: "Potential",
    bonusPotential: "Bonus Potential",
    noBonus: "{part} tidak punya bonus potential.",
    rank: "Rank potential",
    showingPool: "Kumpulan yang ditampilkan",
    poolFirst: "Baris ke-1",
    poolSecond: "Baris ke-2 / ke-3",
    linesOnItem: "Jumlah baris pada itemmu",
    lineCountOne: "{count} baris",
    lineCountOther: "{count} baris",
    searchPlaceholder: "mis. PHY ATK, Boss, Crit",
    value: "Nilai",
    chance: "Peluang",
    valueCountOne: "{count} nilai",
    valueCountOther: "{count} nilai",
    tableTitle: "{part} — {rank} · {pool}",
    tableFootnote:
      "Ada {count} baris di kumpulan ini, berjumlah {total}%. Nexon membulatkan tiap entri ke dua desimal.",
    cellAria: "{option} {value}, peluang {prob}%",
    cellAriaStack:
      "{option} {value}, peluang {prob}%, diminta pada {count} baris",
    stackBadge: "×{count}",
    rankUpTitle: "Peluang naik rank per cube",
    rankUpRow: "{chance}% naik rank · ",
    rankUpCubes: "{count} cube",
    rankUpNote:
      "Naik rank adalah kocokan terpisah dari baris opsi — cube-cube ini hanya berbeda pada peluang naik rank dan fungsinya, tidak pernah pada peluang opsinya.",
    noteIndependent:
      "“Per cube” mengasumsikan tiap baris dikocok secara independen — Nexon tidak mengungkapkan apakah satu baris bisa mengulang baris lain.",
    noteSource: "Data dari {link}.",
    sourceLabel: "Pengungkapan peluang resmi Nexon — Cube",
    dataNotes: [
      "Rank Potential sebuah item ditentukan oleh baris potential pertamanya.",
      "Occult, Red, Black dan Choice Cube hanya berbeda pada fungsinya — peluang opsinya identik.",
      "Baris potential kedua dan ketiga dikocok dari kumpulan yang berbeda dan lebih besar daripada baris pertama.",
      "Tiap peluang dibulatkan ke dua angka desimal, sehingga satu kumpulan bisa saja tidak berjumlah tepat 100%.",
    ],

    steps: [
      {
        title: "Pilih bagian dan rank",
        body: "Setiap bagian perlengkapan punya kumpulan opsinya sendiri, dan kumpulan itu berubah total mengikuti rank potential. Kalung, Cincin dan Item Saku tidak punya bonus potential, jadi opsi itu dinonaktifkan untuk mereka.",
      },
      {
        title: "Pilih potential atau bonus potential",
        body: "Keduanya sistem terpisah dengan tabel terpisah dan cube terpisah. Baris bonus potential berasal dari kumpulan yang lebih kecil daripada potential biasa.",
      },
      {
        title: "Pilih kumpulan baris",
        body: "Baris potential pertama dikocok dari kumpulan yang berbeda, dan biasanya lebih kecil, daripada baris kedua dan ketiga. Ganti kumpulan untuk melihat masing-masing — apa pun yang kamu pilih tetap terpilih di keduanya.",
      },
      {
        title: "Pilih yang kamu mau lalu baca peluangnya",
        body: "Ketuk nama opsi untuk mengambil semua nilai stat itu, atau ketuk satu nilai untuk membidik persis kocokan itu. Kartunya menampilkan peluangmu pada baris yang sedang ditampilkan, peluangmu per cube untuk seluruh item, dan berapa cube untuk mencapai peluang 50% atau 90%.",
      },
      {
        title: "Tentukan apa yang dihitung kena",
        body: "“Salah satunya” — bawaan — menghitung sebuah cube kena bila setidaknya satu pilihanmu muncul. “Semuanya” meminta setiap pilihan muncul sekaligus pada item yang sama, dan mengetuk lagi sebuah nilai berarti meminta baris yang sama pada 2 atau 3 baris. “Hitung dari grup” memperlakukan pilihanmu sebagai satu wadah dan hanya menanyakan berapa baris item itu yang jatuh ke dalamnya, baris mana pun itu. Ketiga cara baca ini memakai tabel resmi yang sama; hanya pertanyaannya yang berbeda.",
      },
      {
        title: "Pakai mode grup untuk “ketiga barisnya serangan”",
        body: "Centang setiap baris yang membuatmu senang — misalnya PHY ATK, Crit ATK dan Crit DMG pada senjata — ganti ke “Hitung dari grup”, lalu minta 3 baris dari grup. Itulah pertanyaan yang sebenarnya diajukan pemain, dan berbeda dari dua cara lainnya: “Semuanya” akan menuntut ketiga baris tertentu itu dalam kombinasi itu, sedangkan cara baca grup menerima campuran apa pun di antaranya. Pada senjata Legendary peluangnya sekitar 3,6% per cube, dibanding 0,18% untuk tiga baris PHY ATK saja. Meminta 1 memberi angka yang sama dengan “Salah satunya”, karena satu baris dari grup persis sama dengan satu pilihan yang muncul.",
      },
    ],

    exampleIntro: "Mengejar {option} {value} pada {part} {rank}:",
    exampleOne: "Hanya pada baris ke-1",
    exampleThree: "Di mana pun pada item 3 baris",
    examplePerCube: "{chance} per cube · ",
    exampleCubes: "{count} cube",
    exampleGap:
      "Menerima baris itu di mana pun pada item, alih-alih menuntutnya di slot pertama, jauh lebih murah — karena itu memutuskan sejak awal seberapa ketat kamu sebenarnya perlu bersikap itu sangat berharga.",

    readHeaderRows:
      "Setiap opsi adalah baris kepala yang menampilkan peluang gabungan stat itu pada nilai apa pun, dengan tiap nilainya dirinci di bawahnya.",
    readPools:
      "Pada baris ini adalah peluangmu di kumpulan yang sedang ditampilkan; per cube menggabungkan kumpulan baris pertama dan kumpulan baris ke-2/3 pada seluruh baris itemmu.",
    readPoolsTerm: "Pada baris ini",
    readPoolsTerm2: "per cube",
    readPersist:
      "Pilihan tetap tersimpan saat kamu berganti kumpulan, jadi kamu bisa memilih stat yang sama di keduanya dan melihat angka per cube yang sebenarnya.",
    readModes:
      "Salah satunya dihitung kena bila satu pilihan muncul; Semuanya menuntut setiap pilihan muncul sekaligus pada item, dan judulnya berubah menjadi “Semua, per cube”. Label ×2 pada sebuah nilai berarti kamu memintanya pada dua baris. Hitung dari grup mengabaikan baris mana yang muncul dan menghitung berapa yang berasal dari pilihanmu, menampilkan “Grup, per cube”.",

    spendSeparate:
      "Naik rank dan mengocok opsi adalah dua kocokan terpisah. Cube yang gagal menaikkan rank tetap mengocok ulang barismu.",
    spendPity:
      "Tidak ada pity pada kedua kocokan itu. Cube ke-{count} punya peluang naik rank yang sama dengan cube pertama.",
    spendAny:
      "Memilih beberapa baris berarti salah satunya, sampai kamu beralih ke Semuanya — dan pergantian itu bukan langkah kecil: dua baris tertentu sekaligus berkali-kali lipat lebih langka daripada masing-masingnya sendirian.",
    spendStack:
      "Meminta baris yang sama dua kali lebih langka lagi, dan meminta lebih banyak baris daripada yang dimiliki itemmu jelas mustahil — tabelnya menampilkan 0% alih-alih berpura-pura sebaliknya.",

    sim: {
      title: "Simulator kocokan",
      intro:
        "Kocok dengan tabel resmi yang sama, memakai baris yang kamu pilih di atas. Melihat sebarannya memberi tahu lebih banyak daripada angka persennya.",
      needPick: "Pilih sebuah baris di atas untuk dijadikan target kocokan.",
      rollOnce: "Kocok sekali",
      untilHit: "Kocok sampai kena",
      rollBatch: "Kocok 100×",
      reset: "Atur ulang",
      empty: "Belum ada cube yang dikocok.",
      hit: "Kena",
      miss: "Tidak cocok",
      slot: "Baris {n}",
      spent: "Cube dikocok",
      hits: "Kena",
      observed: "Teramati",
      expected: "Perkiraan {chance}%",
      untilHitOne: "Kena pada cube pertama.",
      untilHitOther: "Kena setelah {count} cube.",
      vsMedian: "Titik 50/50 menurut tabel adalah {count}.",
      exhausted:
        "Tidak kena dalam {count} cube — percobaan berhenti di batasnya, bukan karena jaminan.",
      batch: "{hits} kena dalam {count} cube.",
      disclaimer:
        "Disimulasikan dengan pembangkit angka acak browser-mu terhadap peluang yang dipublikasikan Nexon. Ini bukan RNG milik game, dan tidak ada yang dikocok di sini menyentuh akunmu.",
    },

    howToName: "Cara membaca tabel peluang cube MapleStory M",
    howToDescription:
      "Hitung peluang aslimu mendapatkan baris potential tertentu, dan berapa cube yang dibutuhkan.",
    appName: "Peluang Cube",

    faq: [
      {
        question:
          "Berapa peluang mendapat baris cube tertentu di MapleStory M?",
        answer:
          "Setiap baris punya peluang yang dipublikasikan sendiri, dan itu bergantung pada bagian perlengkapan, rank potential, serta apakah itu baris pertama atau baris kedua/ketiga. Pilih baris yang kamu mau di tabel, kalkulator akan menjumlahkannya, lalu menggabungkan kedua kumpulan untuk memberi peluangmu per cube.",
      },
      {
        question:
          "Apakah Occult, Red, Black dan Choice Cube punya opsi yang berbeda?",
        answer:
          "Tidak. Nexon menyatakan peluang opsinya identik pada Occult, Red, Black dan Choice Cube — keempatnya hanya berbeda pada fungsi dan peluang naik rank. Occult dan Red naik rank 1%, Black dan Choice 2%.",
      },
      {
        question: "Kenapa baris kedua berbeda dari baris pertama?",
        answer:
          "Nexon memublikasikan dua kumpulan terpisah per rank. Baris potential pertama menarik dari satu kumpulan, sedangkan baris kedua dan ketiga menarik dari kumpulan lain yang biasanya jauh lebih besar — jadi baris yang umum di slot pertama bisa langka di slot lainnya.",
      },
      {
        question: "Berapa cube yang dibutuhkan untuk menaikkan rank potential?",
        answer:
          "Naik rank adalah kocokan terpisah dari opsinya: 1% per cube untuk Occult dan Red Cube, 2% untuk Black dan Choice Cube. Itu sekitar {slow} cube untuk peluang 50% pada 1%, atau {fast} cube pada 2%. Tidak ada pity — setiap cube berdiri sendiri.",
      },
      {
        question:
          "Berapa peluang mendapat dua baris potential tertentu pada item yang sama?",
        answer:
          "Ganti tabel ke “Semuanya”. Tabel menghitung peluang setiap baris yang kamu pilih muncul sekaligus pada satu item, sesuai jumlah baris yang benar-benar dimiliki itemmu — baris pertama menarik dari kumpulan yang berbeda dengan baris kedua dan ketiga, jadi kedua kumpulan itu digabungkan dengan benar, bukan dikalikan begitu saja. Ketuk sebuah nilai dua kali untuk meminta baris yang sama pada dua baris. Meminta lebih banyak baris daripada yang dimiliki item akan menampilkan 0%, karena hal itu tidak mungkin terjadi.",
      },
      {
        question:
          "Berapa peluang ketiga baris pada senjata sama-sama baris serangan?",
        answer:
          "Ganti tabel ke “Hitung dari grup”, centang setiap opsi serangan yang kamu terima, lalu minta 3 baris dari grup. Tabel menghitung peluang sebanyak itu baris item jatuh ke dalam pilihanmu, baris mana pun yang keluar — persis pertanyaan “ketiga barisnya serangan”, bukan satu baris tertentu. Pada senjata, PHY ATK saja di ketiga baris hanya sekitar 0,18% per cube; melebarkan grup menjadi PHY ATK, Crit ATK dan Crit DMG menaikkannya ke sekitar 3,6%.",
      },
      {
        question: "Bagian mana saja yang punya bonus potential?",
        answer:
          "Sebagian besar perlengkapan punya, tetapi Kalung, Cincin dan Item Saku tidak punya tabel bonus potential dalam pengungkapan Nexon, jadi kalkulator menonaktifkan opsi itu untuk mereka.",
      },
    ],
  },
};

export default id;
