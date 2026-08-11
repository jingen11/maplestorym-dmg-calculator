"use client";

import { useCallback, useMemo, useState } from "react";
import Interpolate from "./Interpolate";
import RollSimulator, { type SimRoll } from "./RollSimulator";
import type { Dictionary } from "@/lib/i18n";
import {
  fill,
  flameOptionName,
  partName,
  plural,
  rankName,
  type Terms,
} from "@/lib/i18n";
import {
  allOfChance,
  atLeastOneChance,
  attemptsFor,
  FLAME_SLOTS,
  FLAME_SOURCE,
  FLAME_UPDATED,
  getRolls,
  groupOfChance,
  RARITIES,
  rollKey as keyOf,
  selectedGroups,
  TWO_OPTION_CHANCE,
  type FlameRoll,
  type Rarity,
} from "@/lib/flames";
import type { MatchMode } from "@/lib/probability";
import { flameRoller } from "@/lib/simulate";

const fmt = (n: number, digits = 2) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export default function FlameTable({
  dict,
  common,
  terms,
}: {
  dict: Dictionary["flames"];
  common: Dictionary["common"];
  terms: Terms;
}) {
  const [slot, setSlot] = useState(FLAME_SLOTS[0]);
  const [rarity, setRarity] = useState<Rarity>("Legendary");
  const [eternal, setEternal] = useState(false);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<MatchMode>("any");
  /* How many of the flame's options have to fall inside the selection, in
     "group" mode only. A flame has at most two, so this is 1 or 2. */
  const [groupNeed, setGroupNeed] = useState(2);
  /* key → how many option slots must carry it. "All" mode reads the count;
     the other two only care that the key is there. */
  const [picked, setPicked] = useState<Map<string, number>>(new Map());

  const rolls = useMemo(() => getRolls(slot, rarity), [slot, rarity]);

  /* Grades collapse into one row per option so the table reads like the
     in-game option list rather than 64 near-duplicate lines. Values sort
     high→low: source order is descending for most options but ascending
     for Final DMG / DEF Ignore, so grade order would misrank those. */
  const rows = useMemo(() => {
    const byOption = new Map<string, FlameRoll[]>();
    for (const roll of rolls) {
      const list = byOption.get(roll.option);
      if (list) list.push(roll);
      else byOption.set(roll.option, [roll]);
    }
    return [...byOption.entries()].map(([option, grades]) => ({
      option,
      // Localized once here so both the filter and the cell labels use it
      label: flameOptionName(terms, option),
      grades: [...grades].sort((a, b) => b.value - a.value),
      // Every grade of an option shares one probability, so any value of
      // it lands with the sum — this is the number players care about.
      anyValue: grades.reduce((sum, g) => sum + g.prob, 0),
      each: grades[0]?.prob ?? 0,
    }));
  }, [rolls, terms]);

  /* Matches the localized label as well as the English source name, so a
     player who knows the in-game English term can still search for it. */
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.label.toLowerCase().includes(q) || r.option.toLowerCase().includes(q),
    );
  }, [rows, query]);

  const columnTotal = useMemo(
    () => rolls.reduce((sum, r) => sum + r.prob, 0),
    [rolls],
  );

  /* Selections are keyed by option+grade, so switching slot or rarity keeps
     any picks that still exist in the new table and quietly drops the rest */
  const perOption = useMemo(
    () =>
      rolls.reduce(
        (sum, r) => (picked.has(keyOf(r.option, r.grade)) ? sum + r.prob : sum),
        0,
      ),
    [rolls, picked],
  );

  /* "All" is a coverage problem, not a sum: every selected line has to land
     on the same flame. Two grades of one option are two separate lines —
     the two draws are independent, so an option can repeat. */
  const groups = useMemo(() => selectedGroups(rolls, picked), [rolls, picked]);

  const twoOptionPct = eternal
    ? TWO_OPTION_CHANCE.Eternal
    : TWO_OPTION_CHANCE[rarity];
  const perFlame =
    mode === "all"
      ? allOfChance(
          groups.map((g) => ({ prob: g.roll.prob, need: g.need })),
          twoOptionPct,
        )
      : mode === "group"
        ? groupOfChance(perOption, twoOptionPct, groupNeed)
        : atLeastOneChance(perOption, twoOptionPct);
  /* A flame rolls at most two options, so a third wanted line never fits. */
  const wantedLines = groups.reduce((sum, g) => sum + g.need, 0);
  const impossible = mode === "all" && wantedLines > 2;
  const need50 = attemptsFor(perFlame, 50);
  const need90 = attemptsFor(perFlame, 90);
  const pickedCount = picked.size;

  /* Whole-option tap: on or off for every grade of it, never a stack. */
  const toggle = (keys: string[]) =>
    setPicked((prev) => {
      const next = new Map(prev);
      const allOn = keys.every((k) => next.has(k));
      for (const k of keys) {
        if (allOn) next.delete(k);
        else next.set(k, 1);
      }
      return next;
    });

  /* Single-value tap. In "all" mode it walks 1× → 2× → off, since a flame
     has two option slots and can roll the same line into both. Counts mean
     nothing in "any" mode, so there it stays a plain toggle. */
  const cycle = (key: string) =>
    setPicked((prev) => {
      const next = new Map(prev);
      const cap = mode === "all" ? 2 : 1;
      const count = (next.get(key) ?? 0) + 1;
      if (count > cap) next.delete(key);
      else next.set(key, count);
      return next;
    });

  /* Built once per configuration rather than per roll: a bulk run draws
     tens of thousands of times, and getRolls rebuilds its array each call.
     `picked` is a dependency because the roller decides what counts as a hit. */
  const roller = useMemo(
    () => flameRoller(slot, rarity, twoOptionPct, picked, mode, groupNeed),
    [slot, rarity, twoOptionPct, picked, mode, groupNeed],
  );

  const rollFlame = useCallback((): SimRoll => {
    const result = roller.roll();
    return {
      hit: result.hit,
      slots: result.options.map((option, i) => ({
        label: flameOptionName(terms, option.option),
        value: `${fmt(option.value)}%`,
        hit: result.hitSlots.includes(i),
      })),
    };
  }, [roller, terms]);

  const maxGrades = Math.max(1, ...rows.map((r) => r.grades.length));

  const pill = (active: boolean) =>
    `rounded-lg border-2 px-3 py-1.5 text-xs font-bold transition ${
      active
        ? "border-wood bg-maple text-white shadow-[0_2px_0_rgba(67,48,31,0.25)]"
        : "border-wood-light bg-panel-deep text-ink hover:border-wood"
    }`;

  return (
    <section aria-label={dict.ariaTable} className="space-y-6">
      <div
        className="stage sticky top-2 z-20 px-3 py-3 backdrop-blur-md sm:px-5 sm:py-4 md:top-4"
        aria-live="polite"
      >
        <div className="grid grid-cols-2 items-start gap-3 divide-x-2 divide-wood-light/40 sm:gap-6 sm:divide-x-0 md:grid-cols-4 md:divide-x-0">
          <div className="min-w-0 text-center">
            <p className="stage-label">{dict.perOptionSlot}</p>
            <p className="mt-1 font-display text-xl text-ink sm:text-2xl">
              {fmt(perOption)}%
            </p>
          </div>
          <div className="min-w-0 text-center">
            <p className="stage-label">
              {mode === "all"
                ? dict.perFlameAll
                : mode === "group"
                  ? dict.perFlameGroup
                  : dict.perFlame}
            </p>
            <p className="mt-1 font-display text-xl text-maple-deep sm:text-2xl">
              {fmt(perFlame)}%
            </p>
          </div>
          <div className="min-w-0 text-center">
            <p className="stage-label">{dict.for50}</p>
            <p className="mt-1 font-display text-xl text-ink sm:text-2xl">
              {need50 ?? common.dash}
            </p>
          </div>
          <div className="min-w-0 text-center">
            <p className="stage-label">{dict.for90}</p>
            <p className="mt-1 font-display text-xl text-ink sm:text-2xl">
              {need90 ?? common.dash}
            </p>
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] font-semibold text-sky-ink">
          {pickedCount === 0 ? (
            dict.tapHint
          ) : (
            <>
              {mode === "all"
                ? fill(
                    plural(wantedLines, {
                      one: dict.selectedAllOne,
                      other: dict.selectedAllOther,
                    }),
                    { count: wantedLines, two: fmt(twoOptionPct, 1) },
                  )
                : mode === "group"
                  ? fill(
                      plural(groupNeed, {
                        one: dict.selectedGroupOne,
                        other: dict.selectedGroupOther,
                      }),
                      {
                        count: groupNeed,
                        options: pickedCount,
                        two: fmt(twoOptionPct, 1),
                      },
                    )
                  : fill(
                      plural(pickedCount, {
                        one: dict.selectedOne,
                        other: dict.selectedOther,
                      }),
                      { count: pickedCount, two: fmt(twoOptionPct, 1) },
                    )}
              <button
                type="button"
                onClick={() => setPicked(new Map())}
                className="ml-2 underline underline-offset-2 hover:text-maple-deep"
              >
                {common.clear}
              </button>
            </>
          )}
        </p>
      </div>

      <div className="window">
        <h2 className="window-title text-base">{dict.setup}</h2>
        <div className="space-y-4 p-4">
          <div>
            <p className="stage-label mb-2 text-ink-soft">
              {common.equipmentPart}
            </p>
            <div className="flex flex-wrap gap-2">
              {FLAME_SLOTS.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSlot(name)}
                  aria-pressed={slot === name}
                  className={pill(slot === name)}
                >
                  {partName(terms, name)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="stage-label mb-2 text-ink-soft">{dict.tier}</p>
            <div className="flex flex-wrap gap-2">
              {RARITIES.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setRarity(name)}
                  aria-pressed={rarity === name}
                  className={pill(rarity === name)}
                >
                  {rankName(terms, name)}
                </button>
              ))}
            </div>
            <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-lg border-2 border-wood-light bg-panel-deep px-3 py-2">
              <input
                type="checkbox"
                checked={eternal}
                onChange={(e) => setEternal(e.target.checked)}
                className="h-4 w-4 shrink-0 accent-maple"
              />
              <span className="text-xs font-bold text-ink">
                {dict.eternal}
                <span className="ml-1 font-semibold text-ink-soft">
                  {dict.eternalHint}
                </span>
              </span>
            </label>
          </div>

          <div>
            <p className="stage-label mb-2 text-ink-soft">{dict.matchLabel}</p>
            <div className="flex flex-wrap gap-2">
              {(["any", "all", "group"] as MatchMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={pill(mode === m)}
                >
                  {m === "any"
                    ? dict.matchAny
                    : m === "all"
                      ? dict.matchAll
                      : dict.matchGroup}
                </button>
              ))}
            </div>
            <p className="mt-1 text-[11px] font-semibold text-ink-soft">
              {mode === "all"
                ? dict.matchAllHint
                : mode === "group"
                  ? dict.matchGroupHint
                  : dict.matchAnyHint}
            </p>
            {/* How many of the flame's options have to land in the group.
                A flame rolls at most two, so the choice stops there. */}
            {mode === "group" && (
              <div className="mt-3">
                <p className="stage-label mb-2 text-ink-soft">
                  {dict.groupNeedLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[1, 2].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setGroupNeed(n)}
                      aria-pressed={groupNeed === n}
                      className={pill(groupNeed === n)}
                    >
                      {plural(n, {
                        one: dict.groupNeedOne,
                        other: dict.groupNeedOther,
                      })}
                    </button>
                  ))}
                </div>
                {groupNeed === 2 && (
                  <p className="mt-1 text-[11px] font-semibold text-ink-soft">
                    {dict.groupNeedTwoHint}
                  </p>
                )}
              </div>
            )}
            {impossible && (
              <p className="mt-1 text-[11px] font-bold text-maple-deep">
                {fill(dict.allImpossible, { count: wantedLines })}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="flame-search"
              className="stage-label mb-2 block text-ink-soft"
            >
              {common.filterOptions}
            </label>
            <input
              id="flame-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={dict.searchPlaceholder}
              className="w-full rounded-lg border-2 border-wood-light bg-panel-deep px-3 py-2 font-bold text-ink transition focus:border-maple"
            />
          </div>
        </div>
      </div>

      <div className="window">
        <h2 className="window-title text-base">
          {fill(dict.tableTitle, {
            slot: partName(terms, slot),
            rarity: rankName(terms, rarity),
          })}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-wood-light/60">
                <th className="stage-label px-3 py-2 text-left text-ink-soft">
                  {common.option}
                </th>
                <th className="stage-label px-2 py-2 text-right text-ink-soft">
                  {dict.anyValue}
                </th>
                {Array.from({ length: maxGrades }, (_, i) => (
                  <th
                    key={i}
                    className="stage-label px-2 py-2 text-center text-ink-soft"
                  >
                    {i === 0 ? dict.best : `#${i + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map(({ option, label, grades, anyValue }) => {
                const keys = grades.map((g) => keyOf(option, g.grade));
                const allOn = keys.every((k) => picked.has(k));
                return (
                  <tr
                    key={option}
                    className="border-b border-wood-light/30 last:border-0"
                  >
                    <th scope="row" className="px-3 py-1.5 text-left">
                      <button
                        type="button"
                        onClick={() => toggle(keys)}
                        aria-pressed={allOn}
                        className={`text-left text-xs font-bold transition hover:text-maple-deep ${
                          allOn ? "text-maple-deep" : "text-ink"
                        }`}
                      >
                        {label}
                      </button>
                    </th>
                    <td className="px-2 py-1.5 text-right font-bold tabular-nums text-sky-ink">
                      {fmt(anyValue)}%
                    </td>
                    {Array.from({ length: maxGrades }, (_, i) => {
                      const g = grades[i];
                      if (!g)
                        return (
                          <td
                            key={i}
                            className="px-2 py-1.5 text-center text-ink-soft"
                          >
                            {common.dash}
                          </td>
                        );
                      const count = picked.get(keyOf(option, g.grade)) ?? 0;
                      const on = count > 0;
                      return (
                        <td key={i} className="px-1 py-1 text-center">
                          <button
                            type="button"
                            onClick={() => cycle(keyOf(option, g.grade))}
                            aria-pressed={on}
                            aria-label={fill(
                              count > 1 ? dict.cellAriaStack : dict.cellAria,
                              {
                                option: label,
                                grade: g.grade,
                                value: g.value,
                                prob: g.prob,
                                count,
                              },
                            )}
                            className={`w-full rounded-md border-2 px-1.5 py-1 tabular-nums transition ${
                              on
                                ? "border-wood bg-maple/15 text-ink"
                                : "border-transparent hover:border-wood-light"
                            }`}
                          >
                            <span className="block font-bold">
                              {fmt(g.value)}%
                            </span>
                            {mode === "all" && count > 1 && (
                              <span className="mt-0.5 block text-[10px] font-bold text-maple-deep">
                                {fill(dict.stackBadge, { count })}
                              </span>
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              {visible.length === 0 && (
                <tr>
                  <td
                    colSpan={maxGrades + 2}
                    className="px-3 py-6 text-center text-ink-soft"
                  >
                    {fill(common.noMatch, { query })}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="border-t-2 border-wood-light/50 px-3 py-2 text-[11px] font-semibold text-ink-soft">
          {fill(dict.tableFootnote, { total: fmt(columnTotal) })}
        </p>
      </div>

      {/* Remounted whenever the setup or the selection changes: a running
          tally only means anything against one fixed target. */}
      <RollSimulator
        key={`${slot}|${rarity}|${eternal}|${mode}|${groupNeed}|${[...picked]
          .map(([k, n]) => `${k}×${n}`)
          .sort()
          .join("|")}`}
        strings={dict.sim}
        roll={rollFlame}
        hasTarget={picked.size > 0}
        perAttempt={perFlame}
        need50={need50}
      />

      <div className="window">
        <h2 className="window-title text-base">{common.notes}</h2>
        <ul className="space-y-1.5 p-4 text-xs leading-relaxed text-ink-soft">
          {dict.dataNotes.map((note) => (
            <li key={note}>• {note}</li>
          ))}
          <li>• {dict.noteIndependent}</li>
          <li>
            •{" "}
            <Interpolate
              template={dict.noteSource}
              vars={{
                date: FLAME_UPDATED,
                link: (
                  <a
                    href={FLAME_SOURCE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-maple-deep underline underline-offset-2"
                  >
                    {dict.sourceLabel}
                  </a>
                ),
              }}
            />
          </li>
        </ul>
      </div>
    </section>
  );
}
