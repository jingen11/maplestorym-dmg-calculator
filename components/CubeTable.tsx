"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import {
  CUBE_NOTES,
  CUBE_PARTS,
  CUBE_SOURCE_LABEL,
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

const POOL_LABEL: Record<Pool, string> = {
  first: "1st line",
  second: "2nd / 3rd line",
};

export default function CubeTable() {
  const [part, setPart] = useState(CUBE_PARTS[0]);
  const [kind, setKind] = useState<CubeKind>("potential");
  const [rank, setRank] = useState<Rank>("Legendary");
  const [pool, setPool] = useState<Pool>("first");
  const [lineCount, setLineCount] = useState(3);
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<Set<string>>(new Set());

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

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? shown.filter((l) => l.option.toLowerCase().includes(q))
      : shown;
  }, [shown, query]);

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
    <section aria-label="Cube probabilities" className="space-y-6">
      <div
        className="stage sticky top-2 z-20 px-3 py-3 backdrop-blur-md sm:px-5 sm:py-4 md:top-4"
        aria-live="polite"
      >
        <div className="grid grid-cols-2 items-start gap-3 divide-x-2 divide-wood-light/40 sm:gap-6 sm:divide-x-0 md:grid-cols-4">
          <div className="min-w-0 text-center">
            <p className="stage-label">On this line</p>
            <p className="mt-1 font-display text-xl text-ink sm:text-2xl">
              {fmt(poolChance)}%
            </p>
          </div>
          <div className="min-w-0 text-center">
            <p className="stage-label">Per cube</p>
            <p className="mt-1 font-display text-xl text-maple-deep sm:text-2xl">
              {fmt(perCube)}%
            </p>
          </div>
          <div className="min-w-0 text-center">
            <p className="stage-label">Cubes for 50%</p>
            <p className="mt-1 font-display text-xl text-ink sm:text-2xl">
              {need50 ?? "—"}
            </p>
          </div>
          <div className="min-w-0 text-center">
            <p className="stage-label">Cubes for 90%</p>
            <p className="mt-1 font-display text-xl text-ink sm:text-2xl">
              {need90 ?? "—"}
            </p>
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] font-semibold text-sky-ink">
          {picked.size === 0 ? (
            <>Tap the lines you want. Picks apply to both pools.</>
          ) : (
            <>
              {picked.size} line{picked.size === 1 ? "" : "s"} selected · 1st{" "}
              {fmt(firstChance)}% · 2nd/3rd {fmt(secondChance)}%
              <button
                type="button"
                onClick={() => setPicked(new Set())}
                className="ml-2 underline underline-offset-2 hover:text-maple-deep"
              >
                clear
              </button>
            </>
          )}
        </p>
      </div>

      <div className="window">
        <h2 className="window-title text-base">Cube setup</h2>
        <div className="space-y-4 p-4">
          <div>
            <p className="stage-label mb-2 text-ink-soft">Equipment part</p>
            <div className="flex flex-wrap gap-2">
              {CUBE_PARTS.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setPart(name)}
                  aria-pressed={part === name}
                  className={pill(part === name)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="stage-label mb-2 text-ink-soft">Cube type</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setKind("potential")}
                  aria-pressed={activeKind === "potential"}
                  className={pill(activeKind === "potential")}
                >
                  Potential
                </button>
                <button
                  type="button"
                  onClick={() => bonusAvailable && setKind("bonus")}
                  disabled={!bonusAvailable}
                  aria-pressed={activeKind === "bonus"}
                  className={pill(activeKind === "bonus", !bonusAvailable)}
                >
                  Bonus Potential
                </button>
              </div>
              {!bonusAvailable && (
                <p className="mt-1 text-[11px] font-semibold text-ink-soft">
                  {part} has no bonus potential.
                </p>
              )}
            </div>

            <div>
              <p className="stage-label mb-2 text-ink-soft">Potential rank</p>
              <div className="flex flex-wrap gap-2">
                {RANKS.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setRank(name)}
                    aria-pressed={rank === name}
                    className={pill(rank === name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="stage-label mb-2 text-ink-soft">Showing pool</p>
              <div className="flex flex-wrap gap-2">
                {(["first", "second"] as Pool[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPool(p)}
                    aria-pressed={pool === p}
                    className={pill(pool === p)}
                  >
                    {POOL_LABEL[p]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="stage-label mb-2 text-ink-soft">
                Lines on your item
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
                    {n} line{n === 1 ? "" : "s"}
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
              Filter options
            </label>
            <input
              id="cube-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. PHY ATK, Boss, Crit"
              className="w-full rounded-lg border-2 border-wood-light bg-panel-deep px-3 py-2 font-bold text-ink transition focus:border-maple"
            />
          </div>
        </div>
      </div>

      <div className="window">
        <h2 className="window-title text-base">
          {part} — {rank} · {POOL_LABEL[pool]}
        </h2>
        <div className="max-h-[32rem] overflow-y-auto">
          <table className="w-full border-collapse text-xs">
            <thead className="sticky top-0 z-10 bg-panel-deep">
              <tr className="border-b-2 border-wood-light/60">
                <th className="stage-label px-3 py-2 text-left text-ink-soft">
                  Option
                </th>
                <th className="stage-label px-2 py-2 text-right text-ink-soft">
                  Value
                </th>
                <th className="stage-label px-3 py-2 text-right text-ink-soft">
                  Chance
                </th>
              </tr>
            </thead>
            <tbody>
              {grouped.map(([option, lines]) => {
                const keys = lines.map(lineKey);
                const allOn = keys.every((k) => picked.has(k));
                const optionTotal = lines.reduce((s, l) => s + l.prob, 0);
                return (
                  <Fragment key={option}>
                    <tr className="border-y border-wood-light/40 bg-panel-deep/60">
                      <th scope="colgroup" className="px-3 py-1.5 text-left">
                        <button
                          type="button"
                          onClick={() => toggle(keys)}
                          aria-pressed={allOn}
                          className={`text-xs font-bold transition hover:text-maple-deep ${
                            allOn ? "text-maple-deep" : "text-ink"
                          }`}
                        >
                          {option}
                        </button>
                      </th>
                      <td className="px-2 py-1.5 text-right text-[11px] text-ink-soft">
                        {lines.length} value{lines.length === 1 ? "" : "s"}
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
                              aria-label={`${option} ${line.value}, ${line.prob}% chance`}
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
                    No options match “{query}”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="border-t-2 border-wood-light/50 px-3 py-2 text-[11px] font-semibold text-ink-soft">
          {shown.length} lines in this pool, totalling {fmt(poolTotal)}%.
          Nexon rounds each entry to two decimals.
        </p>
      </div>

      <div className="window">
        <h2 className="window-title text-base">Rank-up chance per cube</h2>
        <div className="p-4">
          <dl className="space-y-1.5 text-xs">
            {Object.entries(RANK_UP[activeKind]).map(([cube, chance]) => (
              <div
                key={cube}
                className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-wood-light/30 pb-1.5 last:border-0"
              >
                <dt className="text-ink-soft">{cube}</dt>
                <dd className="font-bold tabular-nums text-ink">
                  {fmt(chance, 0)}% rank up ·{" "}
                  <span className="text-maple-deep">
                    {cubesFor(chance, 50)} cubes
                  </span>{" "}
                  for a coin flip
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[11px] leading-relaxed text-ink-soft">
            Ranking up is a separate roll from the option lines — these cubes
            differ only in rank-up chance and function, never in the option
            probabilities.
          </p>
        </div>
      </div>

      <div className="window">
        <h2 className="window-title text-base">Notes</h2>
        <ul className="space-y-1.5 p-4 text-xs leading-relaxed text-ink-soft">
          {CUBE_NOTES.map((note) => (
            <li key={note}>• {note}</li>
          ))}
          <li>
            • “Per cube” assumes the lines roll independently — Nexon does not
            disclose whether one line can repeat another.
          </li>
          <li>
            • Data from{" "}
            <a
              href={sourceUrl(part)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-maple-deep underline underline-offset-2"
            >
              {CUBE_SOURCE_LABEL} ({part})
            </a>
            .
          </li>
        </ul>
      </div>
    </section>
  );
}
