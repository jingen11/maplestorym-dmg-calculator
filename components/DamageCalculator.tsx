"use client";

import Image from "next/image";
import { Fragment, useEffect, useMemo, useState } from "react";
import { FOOD_IMAGES } from "./foodImages";
import { SwordSprite, WandSprite } from "./PixelSprites";
import {
  EXCLUSIVE_FOODS,
  FOOD_ITEMS,
  STACKABLE_FOOD_ITEMS,
  type FoodItem,
} from "@/lib/food";
import {
  applyModifiers,
  calculateDamage,
  DEFAULT_INPUTS,
  finalDefIgnoreRate,
  MODIFIABLE_STATS,
  ZERO_MODIFIERS,
  type DamageInputs,
  type DamageResult,
  type ModifiableStat,
} from "@/lib/damage";

interface NumberField {
  key: keyof Omit<DamageInputs, "targetIsBoss" | "nodeIed" | "defenseSmash4">;
  label: string;
  suffix?: string;
  hint: string;
}

const statFields: Array<NumberField & { key: ModifiableStat }> = [
  {
    key: "physAtk",
    label: "Phys Atk",
    hint: "Flat Phys/Mag Atk from the stat window",
  },
  {
    key: "atkPercent",
    label: "Phys/Mag Atk",
    suffix: "%",
    hint: "Total Phys/Mag Atk % from the stat window",
  },
  {
    key: "dmgPercent",
    label: "Phys/Mag Dmg",
    suffix: "%",
    hint: "Total Phys/Mag Dmg % from the stat window",
  },
  {
    key: "bossAtkPercent",
    label: "Boss Atk",
    suffix: "%",
    hint: "Only applies when the target is a boss",
  },
  {
    key: "critRatePercent",
    label: "Crit Rate",
    suffix: "%",
    hint: "Chance to land a critical hit (max 100%)",
  },
  {
    key: "critDmgPercent",
    label: "Crit Dmg",
    suffix: "%",
    hint: "Bonus damage on critical hits",
  },
  {
    key: "finalDmgPercent",
    label: "Final Dmg",
    suffix: "%",
    hint: "Total Final Dmg % from the stat window",
  },
];

/* In the My stats grid but not in statFields: the Modifiers window mirrors
   statFields, and DIR must not be offered as an additive modifier — DIR
   sources stack multiplicatively via finalDefIgnoreRate. */
const statDirField: NumberField = {
  key: "statDefIgnoreRatePercent",
  label: "Def Ignore Rate",
  suffix: "%",
  hint: "From the stat window — stacks with node DIR sources",
};

const modifierFields = statFields.map((field) => ({
  ...field,
  hint: `Added on top of your base ${field.label}`,
}));

type FieldKey = NumberField["key"];
type FieldText = Record<FieldKey, string>;

const numberFieldKeys = (
  Object.keys(DEFAULT_INPUTS) as Array<keyof DamageInputs>
).filter((key) => typeof DEFAULT_INPUTS[key] === "number") as FieldKey[];

/* Text inputs instead of number inputs: no spinner arrows, and the field
   can be fully cleared while typing ("" simply counts as 0). */
const DECIMAL_PATTERN = /^\d*\.?\d*$/;

const parseValue = (text: string) => {
  const value = parseFloat(text);
  return Number.isFinite(value) ? value : 0;
};

const initialFieldText = (): FieldText => {
  const out = {} as FieldText;
  for (const key of numberFieldKeys) out[key] = String(DEFAULT_INPUTS[key]);
  return out;
};

const ZERO_MOD_TEXT = Object.fromEntries(
  MODIFIABLE_STATS.map((key) => [key, "0"]),
) as Record<ModifiableStat, string>;

/* Inputs persist across visits. Restored after mount (so the static HTML
   hydrates cleanly), sanitized key-by-key in case the stored shape is
   from an older version of the calculator. */
const STORAGE_KEY = "msm-damage-calculator-v1";

interface StoredState {
  fields?: Partial<FieldText>;
  mods?: Partial<Record<ModifiableStat, string>>;
  isMag?: boolean;
  nodeIed?: boolean;
  defenseSmash4?: boolean;
  exclusiveFoods?: Partial<Record<ModifiableStat, string>>;
  stackedFoods?: Record<string, boolean>;
}

const levelFields: NumberField[] = [
  {
    key: "characterLevel",
    label: "Character Level",
    hint: "Your current level",
  },
  {
    key: "monsterLevel",
    label: "Monster Level",
    hint: "Higher-level monsters reduce your damage",
  },
  {
    key: "bossPdrPercent",
    label: "Boss Defense (PDR)",
    suffix: "%",
    hint: "Damage the boss's defense removes — reduced by Def Ignore Rate",
  },
  {
    key: "monsterCritResPercent",
    label: "Monster Crit Resistance",
    suffix: "%",
    hint: "Subtracts from your Crit Rate before the 100% cap",
  },
];

const skillFields: NumberField[] = [
  {
    key: "skillPercent",
    label: "Skill Dmg",
    suffix: "%",
    hint: "Damage % of the skill line you are testing",
  },
  {
    key: "skillFinalDmgPercent",
    label: "Final Dmg",
    suffix: "%",
    hint: "From the skill's enhancement — enter the value at your level",
  },
];

/* Jagged starburst flash behind the front of a crit number, like the
   in-game crit effect. Outline traced from the game (app/path.svg),
   near-white fill with a yellow glow around the spikes. */
const BANG_PATH =
  "M 996 108 L 919 163 L 815 229 L 749 259 L 725 264 L 712 263 L 697 255 " +
  "L 679 237 L 643 182 L 608 109 L 564 0 L 491 216 L 470 262 L 457 277 " +
  "L 413 283 L 366 283 L 281 275 L 144 250 L 0 215 L 97 318 L 164 397 " +
  "L 206 460 L 221 499 L 212 511 L 225 529 L 225 538 L 217 554 L 198 575 " +
  "L 132 623 L 0 699 L 106 717 L 167 732 L 227 756 L 248 774 L 248 801 " +
  "L 233 842 L 193 915 L 126 1023 L 226 979 L 308 951 L 383 935 L 430 931 " +
  "L 457 932 L 483 879 L 490 882 L 529 881 L 562 893 L 579 905 L 602 928 " +
  "L 629 964 L 646 930 L 697 864 L 744 822 L 785 795 L 832 778 L 902 777 " +
  "L 942 784 L 905 719 L 882 656 L 881 622 L 895 590 L 922 561 L 1023 586 " +
  "L 949 540 L 921 510 L 922 492 L 936 472 L 970 441 L 952 438 L 943 431 " +
  "L 940 419 L 944 375 L 959 274 L 996 108 Z";

function CritBang({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      className={className}
      style={{
        filter:
          "drop-shadow(0 0 0.04em #fbbf24) drop-shadow(0 0 0.12em #ffd43b)",
      }}
      aria-hidden
    >
      <path fill="#fffdf2" d={BANG_PATH} />
    </svg>
  );
}

/* Damage numbers render digit-by-digit like in-game: no thousand
   separators, a bigger leading digit, and the rest waving up and down */
function DamageNumber({
  value,
  crit = false,
  className = "",
}: {
  value: number;
  crit?: boolean;
  className?: string;
}) {
  const digits = [...String(value)];
  return (
    <span className={`dmg-pop dmg-number ${className}`}>
      {digits.map((digit, i) => (
        <span
          key={i}
          className={`${crit ? "dmg-text-crit" : "dmg-text"} dmg-digit ${
            i === 0 ? "dmg-digit-lead " : ""
          }${i % 2 === 0 ? "dmg-digit-up" : "dmg-digit-down"}`}
        >
          {digit}
        </span>
      ))}
    </span>
  );
}

/* Each panel is only half the viewport on phones, so long values step
   the type down rather than getting clipped by the stage's overflow */
function headlineSize(value: number) {
  const len = String(value).length;
  if (len >= 10) return "text-base sm:text-2xl md:text-4xl";
  if (len >= 8) return "text-xl sm:text-3xl md:text-4xl";
  return "text-2xl sm:text-3xl md:text-4xl";
}

function subSize(value: number) {
  const len = String(value).length;
  if (len >= 10) return "text-[11px] sm:text-base md:text-xl";
  if (len >= 8) return "text-sm sm:text-lg md:text-xl";
  return "text-base sm:text-lg md:text-xl";
}

export default function DamageCalculator() {
  const [fields, setFields] = useState<FieldText>(initialFieldText);
  const [mods, setMods] = useState<Record<ModifiableStat, string>>(
    ZERO_MOD_TEXT,
  );
  // Physical vs magical is cosmetic — the math is identical. It swaps the
  // Phys/Mag wording and shows only the relevant foods.
  const [isMag, setIsMag] = useState(false);
  const [nodeIed, setNodeIed] = useState(DEFAULT_INPUTS.nodeIed);
  const [defenseSmash4, setDefenseSmash4] = useState(
    DEFAULT_INPUTS.defenseSmash4,
  );
  // Regular foods are exclusive per effect: picking a second food of the
  // same stat replaces the first, while different stats coexist.
  const [exclusiveFoods, setExclusiveFoods] = useState<
    Partial<Record<ModifiableStat, string>>
  >({});
  const [stackedFoods, setStackedFoods] = useState<Record<string, boolean>>(
    {},
  );

  // Restore saved inputs once on mount, then persist on every change.
  // `restored` gates the save effect so defaults don't clobber storage
  // before the load has happened.
  const [restored, setRestored] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect -- the saved inputs can
     only be applied after mount: reading localStorage during render would
     make the client's first render differ from the prerendered static HTML
     and break hydration. One cascading render on mount is the cost. */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored: StoredState = JSON.parse(raw);
        if (stored.fields) {
          const saved = stored.fields;
          setFields((prev) => {
            const next = { ...prev };
            for (const key of numberFieldKeys) {
              const value = saved[key];
              if (typeof value === "string" && DECIMAL_PATTERN.test(value)) {
                next[key] = value;
              }
            }
            return next;
          });
        }
        if (stored.mods) {
          const saved = stored.mods;
          setMods((prev) => {
            const next = { ...prev };
            for (const key of MODIFIABLE_STATS) {
              const value = saved[key];
              if (typeof value === "string" && DECIMAL_PATTERN.test(value)) {
                next[key] = value;
              }
            }
            return next;
          });
        }
        if (typeof stored.isMag === "boolean") setIsMag(stored.isMag);
        if (typeof stored.nodeIed === "boolean") setNodeIed(stored.nodeIed);
        if (typeof stored.defenseSmash4 === "boolean") {
          setDefenseSmash4(stored.defenseSmash4);
        }
        if (stored.exclusiveFoods) {
          const saved = stored.exclusiveFoods;
          setExclusiveFoods(() => {
            const next: Partial<Record<ModifiableStat, string>> = {};
            for (const key of MODIFIABLE_STATS) {
              if (typeof saved[key] === "string") next[key] = saved[key];
            }
            return next;
          });
        }
        if (stored.stackedFoods) {
          const saved = stored.stackedFoods;
          setStackedFoods(() => {
            const next: Record<string, boolean> = {};
            for (const [name, on] of Object.entries(saved)) {
              if (typeof on === "boolean") next[name] = on;
            }
            return next;
          });
        }
      }
    } catch {
      // Corrupt or inaccessible storage: fall back to defaults
    }
    setRestored(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!restored) return;
    try {
      const state: StoredState = {
        fields,
        mods,
        isMag,
        nodeIed,
        defenseSmash4,
        exclusiveFoods,
        stackedFoods,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage full or blocked — the calculator still works, just
      // without persistence
    }
  }, [
    restored,
    fields,
    mods,
    isMag,
    nodeIed,
    defenseSmash4,
    exclusiveFoods,
    stackedFoods,
  ]);

  const foodActive = (item: FoodItem) =>
    item.stackable
      ? !!stackedFoods[item.name]
      : exclusiveFoods[item.stat] === item.name;

  const foodVisible = (item: FoodItem) =>
    isMag
      ? item.effect !== "PA" && item.effect !== "PD"
      : item.effect !== "MA" && item.effect !== "MD";

  const { mobResult, bossResult } = useMemo(() => {
    const inputs: DamageInputs = {
      ...DEFAULT_INPUTS,
      nodeIed,
      defenseSmash4,
    };
    for (const key of numberFieldKeys) inputs[key] = parseValue(fields[key]);
    const modValues = { ...ZERO_MODIFIERS };
    for (const key of MODIFIABLE_STATS) modValues[key] = parseValue(mods[key]);
    for (const item of FOOD_ITEMS) {
      const active = item.stackable
        ? stackedFoods[item.name]
        : exclusiveFoods[item.stat] === item.name;
      // Foods hidden by the phys/mag switch stop counting even if they
      // were selected before the switch flipped.
      const hidden = isMag
        ? item.effect === "PA" || item.effect === "PD"
        : item.effect === "MA" || item.effect === "MD";
      if (active && !hidden) modValues[item.stat] += item.percent;
    }
    const merged = applyModifiers(inputs, modValues);
    return {
      mobResult: calculateDamage({ ...merged, targetIsBoss: false }),
      bossResult: calculateDamage({ ...merged, targetIsBoss: true }),
    };
  }, [
    fields,
    mods,
    isMag,
    nodeIed,
    defenseSmash4,
    exclusiveFoods,
    stackedFoods,
  ]);

  const totalDir = finalDefIgnoreRate(
    parseValue(fields.statDefIgnoreRatePercent),
    nodeIed,
    defenseSmash4,
  );

  const setField = (key: FieldKey, value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  const setMod = (key: ModifiableStat, value: string) =>
    setMods((prev) => ({ ...prev, [key]: value }));

  // Swap Phys/Mag wording to match the attack-type switch
  const typedText = (text: string) =>
    isMag
      ? text.replace("Phys/Mag", "Mag").replace(/^(Flat )?Phys\b/, "$1Mag")
      : text.replace("Phys/Mag", "Phys");

  const renderField = (
    field: NumberField,
    value: string,
    onValue: (value: string) => void,
  ) => (
    <label key={field.key} className="block">
      <span className="mb-1 flex items-baseline justify-between text-sm font-bold text-ink">
        {typedText(field.label)}
        {field.suffix && (
          <span className="text-xs text-ink-soft">{field.suffix}</span>
        )}
      </span>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => {
          if (DECIMAL_PATTERN.test(e.target.value)) onValue(e.target.value);
        }}
        className="w-full rounded-lg border-2 border-wood-light bg-panel-deep px-3 py-2 font-bold text-ink tabular-nums transition focus:border-maple"
      />
      <span className="mt-1 block text-xs text-ink-soft">
        {typedText(field.hint)}
      </span>
    </label>
  );

  const renderInputField = (field: NumberField) =>
    renderField(field, fields[field.key], (value) =>
      setField(field.key, value),
    );

  const toggleFood = (item: FoodItem) => {
    if (item.stackable) {
      setStackedFoods((prev) => ({ ...prev, [item.name]: !prev[item.name] }));
    } else {
      setExclusiveFoods((prev) => ({
        ...prev,
        [item.stat]: prev[item.stat] === item.name ? undefined : item.name,
      }));
    }
  };

  const renderFoodCard = (item: FoodItem) => {
    const active = foodActive(item);
    return (
      <button
        key={item.name}
        type="button"
        aria-pressed={active}
        onClick={() => toggleFood(item)}
        className={`flex items-center gap-2 rounded-lg border-2 px-2 py-2 text-left transition ${
          active
            ? "border-maple bg-maple/10 shadow-[0_0_0_1px_var(--color-maple)]"
            : "border-wood-light bg-panel-deep hover:border-wood"
        }`}
      >
        <Image
          src={FOOD_IMAGES[item.imagePath]}
          alt=""
          className="h-9 w-9 rounded border border-wood-light"
        />
        <span className="min-w-0">
          <span className="block truncate text-xs font-bold text-ink">
            {item.name}
          </span>
          <span className="block text-[11px] text-ink-soft">
            {item.effectLabel}
          </span>
        </span>
      </button>
    );
  };

  /* Panels sit side by side at every width, so everything here scales
     down on narrow screens to keep the sticky card off most of the
     viewport. The boss breakdown renders separately, full width. */
  const renderDamagePanel = (
    title: string,
    shortTitle: string,
    result: DamageResult
  ) => (
    <div className="min-w-0 text-center">
      <p className="stage-label">
        <span className="sm:hidden">{shortTitle}</span>
        <span className="hidden sm:inline">{title} — average hit</span>
      </p>
      <p className="mt-1 sm:mt-2">
        <DamageNumber
          key={result.expectedHit}
          value={result.expectedHit}
          className={headlineSize(result.expectedHit)}
        />
      </p>
      <p className="mt-1 text-[10px] font-bold tabular-nums text-sky-ink sm:mt-2 sm:text-xs">
        {result.nonCritHit.toLocaleString()} –{" "}
        {result.critHitMax.toLocaleString()}
      </p>
      <p className="stage-label hidden sm:block">lower – upper bound</p>

      <div className="mt-2 flex items-start justify-center gap-3 sm:mt-3 sm:gap-8">
        <div>
          <p className="stage-label">Normal</p>
          <p className="mt-1 sm:mt-2">
            <DamageNumber
              key={result.nonCritHit}
              value={result.nonCritHit}
              className={subSize(result.nonCritHit)}
            />
          </p>
        </div>
        <div>
          <p className="stage-label">Critical</p>
          <p className="mt-1 text-base sm:mt-2 sm:text-lg md:text-xl">
            <span className="relative inline-block">
              <CritBang className="absolute -left-[0.45em] -top-1 h-[0.95em] w-[0.95em]" />
              <DamageNumber
                key={result.critHit}
                value={result.critHit}
                crit
                className="relative"
              />
            </span>
          </p>
          <p className="mt-1 hidden text-[11px] font-bold tabular-nums text-sky-ink sm:block">
            {result.critHitMin.toLocaleString()} –{" "}
            {result.critHitMax.toLocaleString()}
          </p>
          <p className="stage-label hidden sm:block">min – max roll</p>
        </div>
      </div>
    </div>
  );

  const renderBossBreakdown = (result: DamageResult) =>
    result.stages && (
      <details className="mt-3 text-left">
        <summary className="stage-label cursor-pointer text-center">
          Boss damage breakdown
        </summary>
        <div className="mx-auto mt-2 grid max-w-xs grid-cols-[1fr_auto_auto] gap-x-4 gap-y-0.5 text-xs text-sky-ink">
          <span />
          <span className="stage-label text-right">Normal</span>
          <span className="stage-label text-right">Crit</span>
          {(
            [
              ["Raw formula", result.stages.preLevel],
              ["After level modifier", result.stages.postLevel],
              ["After boss defense (IED)", result.stages.postIed],
            ] as const
          ).map(([label, line]) => (
            <Fragment key={label}>
              <span>{label}</span>
              <span className="text-right font-bold tabular-nums">
                {line.nonCritHit.toLocaleString()}
              </span>
              <span className="text-right font-bold tabular-nums">
                {line.critHit.toLocaleString()}
              </span>
            </Fragment>
          ))}
        </div>
      </details>
    );

  return (
    <section aria-label="Damage calculator" className="space-y-6">
      <div
        className="stage sticky top-2 z-20 px-3 py-3 backdrop-blur-md sm:px-5 sm:py-4 md:top-4"
        aria-live="polite"
      >
        <div className="grid grid-cols-2 items-start gap-3 divide-x-2 divide-wood-light/40 sm:gap-6 sm:divide-x-0">
          {renderDamagePanel("Normal monsters", "Normal", mobResult)}
          {renderDamagePanel("Boss", "Boss", bossResult)}
        </div>
        {renderBossBreakdown(bossResult)}
      </div>

      <div className="window">
        <h2 className="window-title text-lg">Character setup</h2>
        <div className="divide-y-2 divide-wood-light/50">
          <section className="p-5" aria-label="My stats">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base text-ink">My stats</h3>
                <p className="text-xs text-ink-soft">
                  {isMag ? "Magical class" : "Physical class"}
                </p>
                <p className="mt-1 text-xs text-ink-soft">
                  Input base stats here. Exclude any food buffs &amp; party
                  buffs. Include self buffs.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isMag}
                aria-label="Toggle between physical and magical attack"
                onClick={() => setIsMag((prev) => !prev)}
                className="relative inline-flex h-11 w-[5.5rem] items-center rounded-full border-2 border-wood bg-panel-deep shadow-[0_2px_0_rgba(67,48,31,0.25)] transition"
              >
                <span
                  aria-hidden
                  className={`absolute top-1 h-8 w-9 rounded-full bg-maple/20 ring-2 ring-maple transition-all ${
                    isMag ? "left-[calc(100%-2.5rem)]" : "left-1"
                  }`}
                />
                <SwordSprite
                  className={`relative z-10 mx-auto h-7 w-7 transition-opacity ${
                    isMag ? "opacity-40" : ""
                  }`}
                />
                <WandSprite
                  className={`relative z-10 mx-auto h-7 w-7 transition-opacity ${
                    isMag ? "" : "opacity-40"
                  }`}
                />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {statFields.map(renderInputField)}
              {renderInputField(statDirField)}
            </div>
          </section>

          <section className="p-5" aria-label="Skill">
            <h3 className="mb-4 font-display text-base text-ink">Skill</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skillFields.map(renderInputField)}
            </div>
          </section>

          <section className="p-5" aria-label="Nodes">
            <h3 className="mb-4 font-display text-base text-ink">Nodes</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-wood-light bg-panel-deep px-3 py-2">
                <input
                  type="checkbox"
                  checked={nodeIed}
                  onChange={(e) => setNodeIed(e.target.checked)}
                  className="h-5 w-5 accent-maple"
                />
                <span>
                  <span className="block text-sm font-bold text-ink">
                    Node IED
                  </span>
                  <span className="block text-xs text-ink-soft">
                    +15% Def Ignore Rate — activates once the skill&apos;s
                    node reaches Lv 40. Check this only if your node is Lv
                    40 or above.
                  </span>
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-wood-light bg-panel-deep px-3 py-2">
                <input
                  type="checkbox"
                  checked={defenseSmash4}
                  onChange={(e) => setDefenseSmash4(e.target.checked)}
                  className="h-5 w-5 accent-maple"
                />
                <span>
                  <span className="block text-sm font-bold text-ink">
                    Defense Smash 4
                  </span>
                  <span className="block text-xs text-ink-soft">
                    +25% Def Ignore Rate
                  </span>
                </span>
              </label>
            </div>
            <p className="mt-4 text-xs text-ink-soft">
              Final Def Ignore Rate:{" "}
              <span className="font-bold text-ink tabular-nums">
                {(totalDir * 100).toFixed(2)}%
              </span>{" "}
              — sources stack multiplicatively, then reduce the boss&apos;s
              defense (PDR).
            </p>
          </section>

          <section className="p-5" aria-label="Target">
            <h3 className="font-display text-base text-ink">Target</h3>
            <p className="mb-4 mt-1 text-xs text-ink-soft">
              These only affect the boss damage — mob damage skips the level
              and defense reductions.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {levelFields.map(renderInputField)}
            </div>
          </section>

          <section className="p-5" aria-label="Modifiers">
            <h3 className="font-display text-base text-ink">Modifiers</h3>
            <p className="mb-4 mt-1 text-xs text-ink-soft">
              Hyper skill bonuses only, stacked on top of your base stats.
              Self and party buffs belong in your base stats; food gets its
              own section.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {modifierFields.map((field) =>
                renderField(field, mods[field.key], (value) =>
                  setMod(field.key, value),
                ),
              )}
            </div>
          </section>

          <section className="p-5" aria-label="Food">
            <h3 className="font-display text-base text-ink">Food</h3>
            <p className="mb-3 mt-1 text-xs text-ink-soft">
              Regular food buffs are mutually exclusive per effect — picking
              a second food of the same stat replaces the first. Different
              stats can be combined.
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {EXCLUSIVE_FOODS.filter(foodVisible).map(renderFoodCard)}
            </div>
            <p className="mb-3 mt-5 text-xs text-ink-soft">
              These stack with the regular buff and with each other.
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {STACKABLE_FOOD_ITEMS.filter(foodVisible).map(renderFoodCard)}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
