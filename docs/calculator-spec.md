# Damage & Emblem Calculator — spec from the community spreadsheet

Source: `Damage & Emblem Calculator_2024.07.30.xlsx` (last updated 30/7/2024).
This document is the reference for porting the spreadsheet's functionality to the site.
All percentages below are decimals (1.2048 = 120.48%) unless noted.

## Credits (MUST be displayed on the site)

The spreadsheet is community work. The site must show a credits section with:

| Who | For |
| --- | --- |
| Paulpork | Damage formula |
| 櫻櫻美代套子 | Initial buffed stats calculator |
| KaitouKiddo | Initial damage + emblem calculator |
| 殘風⎝( OωO)⎠ | Crit Rate + damage cap tests |
| Whaku | The spreadsheet itself; also similar crit rate tests |
| S3phy | Updating the spreadsheet |
| Noodlesoup | Testing and correlating empirical data |
| Astralmist | Datamined defense values and formula |

Suggested framing: "Based on the community Damage & Emblem Calculator spreadsheet
(last updated 2024-07-30). Credits: …"

## 1. Inputs

### Base stats (from the in-game stats page, self-buffs included, food/party buffs excluded)

| Input | Spreadsheet cell | Example |
| --- | --- | --- |
| Phys/Mag Atk (flat) | B2 | 36779 |
| Phys/Mag Atk % | B3 | 1.2048 |
| Phys/Mag Dmg % | B4 | 1.261 |
| Boss Atk % | B5 | 1.008 |
| Crit Rate % | B6 | 0.696 |
| Crit Dmg % | B7 | 2.7294 |
| Skill % (skill coefficient of the skill being used) | B8 | 2.3 |
| Final Dmg % | B9 | 0.508 |
| Max Dmg (damage cap) | B10 | 370,560,099 |
| Current (character) level | B11 | 222 |
| Monster level | B12 | 200 |
| Boss PDR ("Boss IED") | B14 | 0.2 |
| DIR from stats page | B18 | 0.024 |
| Monster Crit Resist | B25 | 0 |

### Party buffs (checkbox 0/1 each; user picks ones that apply)

| Buff | Effect used by the sheet |
| --- | --- |
| Advance Blessing (H2) | +35% Atk%, +15% Boss Atk% |
| Speed Infusion / Bucc (H3) | +9.6% Boss Atk% |
| Unmanaged Anger / Hero (H4) | +21% Atk% |
| Combat Orders / Pally (H5) | +15% Dmg% |
| Call of the Wild / WH (H6) | +15% Atk% |
| Evan buff (H7) | +15% Dmg% |
| Lv 200 buff (H8) | +30% Crit Dmg% |

### Food buffs (checkbox 0/1 each)

| Food | Effect |
| --- | --- |
| Boss Atk food (K2) | +Boss Atk% (entered as value) |
| Phys/MA Atk food (K3) | +Atk% (entered as value) |
| Candy Basket / Cane (K4) | +30% Dmg% |
| Chestnut (K5) | +30% Crit Dmg% |
| Carrot Juice (K6) | +30% Crit Rate% |
| Noodle Soup (K7) | +20% Crit Rate% |
| Jellyfish (K8) | +20% Boss Atk% |
| Pork / Snail (K9) | +20% Dmg% |
| Boss Rush (K10) | +50% Boss Atk% |
| Fever, maxed (K11) | +10% Atk%, +10% Crit Rate%, +20% Crit Dmg% |

### Hyper skill (G13–G16) and additional modifiers (K15–K19)

Free-form additive entries: Atk% (G13), Boss Atk% (G14), Crit Dmg% (G15), FD% (G16);
and Dmg% (K15), Crit Rate% (K16), Boss Atk% (K17), Crit Dmg% (K18), FD% (K19).

## 2. Buffed stats (aggregation)

```
Atk        = B2
Atk%       = B3 + K3 + 0.35·H2 + 0.15·H6 + 0.21·H4 + 0.10·K11 + G13
Dmg%       = B4 + 0.30·K4 + 0.20·K9 + 0.15·H5 + 0.15·H7 + K15
BossAtk%   = B5 + K2 + 0.20·K8 + 0.50·K10 + 0.15·H2 + 0.096·H3 + G14 + K17
CritRate%  = B6 + 0.30·K6 + 0.20·K7 + 0.10·K11 + K16 − MonsterCritRes
CritRate   = min(CritRate%, 100%)          // hard cap
CritDmg%   = B7 + 0.30·K5 + 0.30·H8 + 0.20·K11 + G15 + K18
Skill%     = B8
FD%        = B9 + G16 + K19
```

## 3. Damage lines

```
NonCritMob  = Atk · (1 + Dmg%) · (1 + Atk%) · Skill% · (1 + FD%)
NonCritBoss = Atk · (1 + Dmg%) · (1 + Atk% + Skill%·BossAtk%) · Skill% · (1 + FD%)
```

Note the quirk (empirically verified by the community): Boss Atk% is multiplied by
Skill% and added into the Atk% bracket — it is NOT added to Dmg%.

Crit lines: in-game crit adds a random bonus of 0–50% on top of Crit Dmg%.
The sheet shows three columns:

```
CritLine(min) = NonCrit · (1 + CritDmg%)            // +0% roll
CritLine(mid) = NonCrit · (1 + 0.25 + CritDmg%)     // +25% midpoint (headline value)
CritLine(max) = NonCrit · (1 + 0.50 + CritDmg%)     // +50% roll
```

Average damage: `Avg = NonCrit · (1 − CritRate) + CritLine · CritRate`.

## 4. Boss pipeline: level modifier → IED → damage cap

Applied in order to the boss lines (mob lines skip level modifier and IED):

**a) Level-difference modifier** (data-mined, the current method):

```
levelMod = 1 − TargetDefense / (PlayerDR + TargetDefense)
```

where `PlayerDR = defenseRating[playerLevel]` and `TargetDefense = defenseRating[monsterLevel]`
from `lib/data/defenseRatings.json` (levels 1–250 datamined; 251–300 linearly
extrapolated by the sheet author). TargetDefense equals the monster's own defense
rating except for special cases (e.g. Lotus Phase 1, Guild Dungeon) which override it.
Datamined mob (non-boss) defense is boss defense ÷ 9 — computed in the sheet but not
used in the main output.

(The workbook also contains an older FORECAST.LINEAR-based "S3 level modifier" on a
hidden sheet; it is legacy and not used by the output — do not port it.)

**b) IED**. Total Defense-Ignore Rate stacks multiplicatively:

```
totalDIR = 1 − (1 − DIRstats) · (0.85)^nodeIED · (0.75)^DS4
             · (1 − 0.03·x − 0.03·y − 0.04·z)     // three optional extra sources
appliedReduction = BossPDR · (1 − totalDIR)
damage ×= (1 − appliedReduction)
```

The sheet also has a "NEW IED breakdown" showing per-equip IED (Mythic SW 4%,
hat/outfit/glove/belt/shoe/shoulder/cape 8% each) combined multiplicatively:
`DIR = 1 − Π(1 − ied_i)` — useful as a helper for users to compute their DIR.

**c) Damage cap**: crit lines are clamped to Max Dmg (B10). Phys damage cap on
non-crit was removed from the game as of the May (2024) update.

## 5. Emblem / stat-equivalence comparator

Second calculator on the sheet: user enters how much of each stat comes from their
*current* emblems/potentials (Crit Dmg%, Boss Atk%, Atk%, Dmg%, flat Atk, FD%) and
the values of a *candidate* set. The sheet recomputes every damage line with
`stat − current + candidate` substituted and reports the % variance vs. current —
i.e. "would swapping this emblem/potential be a damage gain?"

## 6. Spreadsheet notes worth surfacing in the UI

- Don't double-count self buffs in both base stats and party-buff/hyper checkboxes.
- To change "current emblems", first update base stats to reflect them.
- Crit rate hard caps at 100%; monster crit resist subtracts before the cap.
