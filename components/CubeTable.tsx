"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import Interpolate from "./Interpolate";
import type { Dictionary } from "@/lib/i18n";
import {
  cubeName,
  cubeOptionName,
  fill,
  partName,
  plural,
  rankName,
  type Terms,
} from "@/lib/i18n";
import {
  CUBE_PARTS,
  cubeChance,
  cubesFor,
  getLines,
  hasBonus,
  lineKey,
  RANK_UP,
  RANKS,
  selectedChance,
  sourceUrl,
  type CubeKind,
  type Pool,
  type Rank,
} from "@/lib/cubes";

const fmt = (n: number, digits = 2) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export default function CubeTable({
  dict,
  common,
  terms,
}: {
  dict: Dictionary["cubes"];
  common: Dictionary["common"];
  terms: Terms;
}) {
  const [part, setPart] = useState(CUBE_PARTS[0]);
  const [kind, setKind] = useState<CubeKind>("potential");
  const [rank, setRank] = useState<Rank>("Legendary");
  const [pool, setPool] = useState<Pool>("first");
  const [lineCount, setLineCount] = useState(3);
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<Set<string>>(new Set());

  const poolLabel: Record<Pool, string> = {
    first: dict.poolFirst,
    second: dict.poolSecond,
  };

  /* Pendant, Ring and Pocket have no bonus potential at all, so fall back
     rather than render an empty table if the part changes underneath. */
  const bonusAvailable = hasBonus(part);
  useEffect(() => {
    if (!bonusAvailable && kind === "bonus") setKind("potential");
  }, [bonusAvailable, kind]);
  const activeKind: CubeKind = bonusAvailable ? kind : "potential";

  const firstLines = useMemo(
    () => getLines(part, activeKind, rank, "first"),
    [part, activeKind, rank],
  );
  const secondLines = useMemo(
    () => getLines(part, activeKind, rank, "second"),
    [part, activeKind, rank],
  );
  const shown = pool === "first" ? firstLines : secondLines;

  /* Matches the localized option name as well as the English source name,
     so a player who knows the in-game English term can still search it. */
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return shown;
    return shown.filter(
      (l) =>
        cubeOptionName(terms, l.option).toLowerCase().includes(q) ||
        l.option.toLowerCase().includes(q),
    );
  }, [shown, query, terms]);

  const firstChance = selectedChance(firstLines, picked);
  const secondChance = selectedChance(secondLines, picked);
  const perCube = cubeChance(firstChance, secondChance, lineCount);
  const need50 = cubesFor(perCube, 50);
  const need90 = cubesFor(perCube, 90);
  const poolChance = pool === "first" ? firstChance : secondChance;
  const poolTotal = shown.reduce((sum, l) => sum + l.prob, 0);

  const toggle = (keys: string[]) =>
    setPicked((prev) => {
      const next = new Set(prev);
      const allOn = keys.every((k) => next.has(k));
      for (const k of keys) {
        if (allOn) next.delete(k);
        else next.add(k);
      }
      return next;
    });

  /* Group by option so one tap can take every value of a stat */
  const grouped = useMemo(() => {
    const map = new Map<string, typeof visible>();
    for (const line of visible) {
      const list = map.get(line.option);
      if (list) list.push(line);
      else map.set(line.option, [line]);
    }
    return [...map.entries()];
  }, [visible]);

  const pill = (active: boolean, disabled = false) =>
    `rounded-lg border-2 px-3 py-1.5 text-xs font-bold transition ${
      disabled
        ? "cursor-not-allowed border-wood-light/40 bg-panel-deep/50 text-ink-soft/50"
        : active
          ? "border-wood bg-maple text-white shadow-[0_2px_0_rgba(67,48,31,0.25)]"
          : "border-wood-light bg-panel-deep text-ink hover:border-wood"
    }`;

  return (
    <section aria-label={dict.ariaTable} className="space-y-6">
      <div
        className="stage sticky top-2 z-20 px-3 py-3 backdrop-blur-md sm:px-5 sm:py-4 md:top-4"
        aria-live="polite"
      >
        <div className="grid grid-cols-2 items-start gap-3 divide-x-2 divide-wood-light/40 sm:gap-6 sm:divide-x-0 md:grid-cols-4">
          <div className="min-w-0 text-center">
            <p className="stage-label">{dict.onThisLine}</p>
            <p className="mt-1 font-display text-xl text-ink sm:text-2xl">
              {fmt(poolChance)}%
            </p>
          </div>
          <div className="min-w-0 text-center">
            <p className="stage-label">{dict.perCube}</p>
            <p className="mt-1 font-display text-xl text-maple-deep sm:text-2xl">
              {fmt(perCube)}%
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
          {picked.size === 0 ? (
            dict.tapHint
          ) : (
            <>
              {fill(
                plural(picked.size, {
                  one: dict.selectedOne,
                  other: dict.selectedOther,
                }),
                {
                  count: picked.size,
                  first: fmt(firstChance),
                  second: fmt(secondChance),
                },
              )}
              <button
                type="button"
                onClick={() => setPicked(new Set())}
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
              {CUBE_PARTS.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setPart(name)}
                  aria-pressed={part === name}
                  className={pill(part === name)}
                >
                  {partName(terms, name)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="stage-label mb-2 text-ink-soft">{dict.cubeType}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setKind("potential")}
                  aria-pressed={activeKind === "potential"}
                  className={pill(activeKind === "potential")}
                >
                  {dict.potential}
                </button>
                <button
                  type="button"
                  onClick={() => bonusAvailable && setKind("bonus")}
                  disabled={!bonusAvailable}
                  aria-pressed={activeKind === "bonus"}
                  className={pill(activeKind === "bonus", !bonusAvailable)}
                >
                  {dict.bonusPotential}
                </button>
              </div>
              {!bonusAvailable && (
                <p className="mt-1 text-[11px] font-semibold text-ink-soft">
                  {fill(dict.noBonus, { part: partName(terms, part) })}
                </p>
              )}
            </div>

            <div>
              <p className="stage-label mb-2 text-ink-soft">{dict.rank}</p>
              <div className="flex flex-wrap gap-2">
                {RANKS.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setRank(name)}
                    aria-pressed={rank === name}
                    className={pill(rank === name)}
                  >
                    {rankName(terms, name)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="stage-label mb-2 text-ink-soft">
                {dict.showingPool}
              </p>
              <div className="flex flex-wrap gap-2">
                {(["first", "second"] as Pool[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPool(p)}
                    aria-pressed={pool === p}
                    className={pill(pool === p)}
                  >
                    {poolLabel[p]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="stage-label mb-2 text-ink-soft">
                {dict.linesOnItem}
              </p>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setLineCount(n)}
                    aria-pressed={lineCount === n}
                    className={pill(lineCount === n)}
                  >
                    {plural(n, {
                      one: dict.lineCountOne,
                      other: dict.lineCountOther,
                    })}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="cube-search"
              className="stage-label mb-2 block text-ink-soft"
            >
              {common.filterOptions}
            </label>
            <input
              id="cube-search"
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
            part: partName(terms, part),
            rank: rankName(terms, rank),
            pool: poolLabel[pool],
          })}
        </h2>
        <div className="max-h-[32rem] overflow-y-auto">
          <table className="w-full border-collapse text-xs">
            <thead className="sticky top-0 z-10 bg-panel-deep">
              <tr className="border-b-2 border-wood-light/60">
                <th className="stage-label px-3 py-2 text-left text-ink-soft">
                  {common.option}
                </th>
                <th className="stage-label px-2 py-2 text-right text-ink-soft">
                  {dict.value}
                </th>
                <th className="stage-label px-3 py-2 text-right text-ink-soft">
                  {dict.chance}
                </th>
              </tr>
            </thead>
            <tbody>
              {grouped.map(([option, lines]) => {
                const keys = lines.map(lineKey);
                const allOn = keys.every((k) => picked.has(k));
                const optionTotal = lines.reduce((s, l) => s + l.prob, 0);
                const label = cubeOptionName(terms, option);
                return (
                  <Fragment key={option}>
                    <tr className="border-y border-wood-light/40 bg-panel-deep/60">
                      <th scope="colgroup" className="px-3 py-1.5 text-left">
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
                      <td className="px-2 py-1.5 text-right text-[11px] text-ink-soft">
                        {plural(lines.length, {
                          one: dict.valueCountOne,
                          other: dict.valueCountOther,
                        })}
                      </td>
                      <td className="px-3 py-1.5 text-right font-bold tabular-nums text-sky-ink">
                        {fmt(optionTotal)}%
                      </td>
                    </tr>
                    {lines.map((line) => {
                      const on = picked.has(lineKey(line));
                      return (
                        <tr
                          key={lineKey(line)}
                          className="border-b border-wood-light/20 last:border-0"
                        >
                          <td colSpan={2} className="px-3 py-0.5">
                            <button
                              type="button"
                              onClick={() => toggle([lineKey(line)])}
                              aria-pressed={on}
                              aria-label={fill(dict.cellAria, {
                                option: label,
                                value: line.value,
                                prob: line.prob,
                              })}
                              className={`w-full rounded px-2 py-1 text-left tabular-nums transition ${
                                on
                                  ? "bg-maple/15 font-bold text-ink"
                                  : "text-ink-soft hover:bg-wood-light/15"
                              }`}
                            >
                              {line.value}
                            </button>
                          </td>
                          <td
                            className={`px-3 py-0.5 text-right tabular-nums ${
                              on ? "font-bold text-ink" : "text-ink-soft"
                            }`}
                          >
                            {fmt(line.prob)}%
                          </td>
                        </tr>
                      );
                    })}
                  </Fragment>
                );
              })}
              {grouped.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
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
          {fill(dict.tableFootnote, {
            count: shown.length,
            total: fmt(poolTotal),
          })}
        </p>
      </div>

      <div className="window">
        <h2 className="window-title text-base">{dict.rankUpTitle}</h2>
        <div className="p-4">
          <dl className="space-y-1.5 text-xs">
            {Object.entries(RANK_UP[activeKind]).map(([cube, chance]) => (
              <div
                key={cube}
                className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-wood-light/30 pb-1.5 last:border-0"
              >
                <dt className="text-ink-soft">{cubeName(terms, cube)}</dt>
                <dd className="font-bold tabular-nums text-ink">
                  {fill(dict.rankUpRow, { chance: fmt(chance, 0) })}
                  <span className="text-maple-deep">
                    {fill(dict.rankUpCubes, {
                      count: cubesFor(chance, 50) ?? common.dash,
                    })}
                  </span>{" "}
                  {common.forACoinFlip}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[11px] leading-relaxed text-ink-soft">
            {dict.rankUpNote}
          </p>
        </div>
      </div>

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
                link: (
                  <a
                    href={sourceUrl(part)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-maple-deep underline underline-offset-2"
                  >
                    {dict.sourceLabel} ({partName(terms, part)})
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
