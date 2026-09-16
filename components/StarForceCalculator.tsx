"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Interpolate from "./Interpolate";
import StarForceChart, { type ChartPoint, type Scale } from "./StarForceChart";
import type { Dictionary } from "@/lib/i18n";
import { compact, fill } from "@/lib/i18n";
import {
  DEFAULT_REPAIR_COST,
  expectedPath,
  MAX_STAR,
  percentile,
  seededRng,
  simulatePath,
  simulationPlan,
  STARFORCE_SOURCE,
  STARFORCE_UPDATED,
  type StarOptions,
} from "@/lib/starforce";

const pct = (fraction: number) =>
  `${(fraction * 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}%`;


interface SimSummary {
  simTo: number;
  runs: number;
  /** star → [p10, median, p90] of the cumulative cost to first reach it */
  stars: Map<number, [number, number, number]>;
}

export default function StarForceCalculator({
  dict,
  common,
}: {
  dict: Dictionary["starforce"];
  common: Dictionary["common"];
}) {
  /* 10 → 20 is the climb players actually ask about: below 10 nothing can
     drop or break, so the cost is trivial next to what follows. */
  const [from, setFrom] = useState(10);
  const [to, setTo] = useState(20);
  const [minigame, setMinigame] = useState(false);
  const [repairCost, setRepairCost] = useState(DEFAULT_REPAIR_COST);
  const [scale, setScale] = useState<Scale>("log");
  const [hovered, setHovered] = useState<number | null>(null);

  const options = useMemo<StarOptions>(
    () => ({ minigame, repairCost }),
    [minigame, repairCost],
  );
  const path = useMemo(
    () => expectedPath(from, to, options),
    [from, to, options],
  );
  const total = path[path.length - 1];

  /* The simulation is the slow part (up to ~50ms), so it reads deferred
     copies of the inputs: the expected numbers follow the slider instantly
     and the band catches up a frame later, holding the previous batch in
     the meantime. Seeded from the inputs so the server render and the
     client render agree — and so the same climb always shows the same
     numbers instead of wobbling on every re-render. */
  const simFrom = useDeferredValue(from);
  const simTo = useDeferredValue(to);
  const simOptions = useDeferredValue(options);
  const sim = useMemo<SimSummary>(() => {
    const plan = simulationPlan(simFrom, simTo, simOptions);
    const stars = new Map<number, [number, number, number]>();
    if (plan.runs > 0) {
      const seed =
        simFrom * 1_000_003 +
        simTo * 7_919 +
        (simOptions.minigame ? 31 : 0) +
        (simOptions.repairCost % 1_000_000_007);
      const rng = seededRng(seed);
      for (const s of simulatePath(
        simFrom,
        plan.simTo,
        simOptions,
        plan.runs,
        rng,
      )) {
        stars.set(s.star, [
          percentile(s.costs, 10),
          percentile(s.costs, 50),
          percentile(s.costs, 90),
        ]);
      }
    }
    return { simTo: plan.simTo, runs: plan.runs, stars };
  }, [simFrom, simTo, simOptions]);

  const format = (mesos: number) => compact(mesos, dict.mesoUnits);
  /* Taps and breaks read as plain numbers until they stop being countable
     — the climb to ★30 expects 10^22 taps. */
  const count = (n: number) =>
    n >= 1e6
      ? compact(n, dict.mesoUnits)
      : n.toLocaleString(undefined, { maximumFractionDigits: n < 10 ? 1 : 0 });

  const points: ChartPoint[] = path.map((step) => {
    const s = sim.stars.get(step.star);
    return {
      star: step.star,
      expected: step.cumulativeCost,
      p10: s?.[0] ?? null,
      median: s?.[1] ?? null,
      p90: s?.[2] ?? null,
      stepCost: step.expectedCost,
      stepTaps: step.expectedAttempts,
    };
  });

  const targetSim = sim.stars.get(to);
  const simShort = sim.simTo < to;

  const pill = (active: boolean) =>
    `rounded-lg border-2 px-3 py-1.5 text-xs font-bold transition ${
      active
        ? "border-wood bg-maple text-white shadow-[0_2px_0_rgba(67,48,31,0.25)]"
        : "border-wood-light bg-panel-deep text-ink hover:border-wood"
    }`;

  return (
    <section aria-label={dict.ariaTool} className="space-y-6">
      <div
        className="stage sticky top-2 z-20 px-3 py-3 backdrop-blur-md sm:px-5 sm:py-4 md:top-4"
        aria-live="polite"
      >
        <p className="text-center font-display text-base text-sky-ink sm:text-lg">
          {fill(dict.climb, { from, to })}
        </p>
        <div className="mt-2 grid grid-cols-3 items-start gap-3 divide-x-2 divide-wood-light/40 sm:gap-6">
          <div className="min-w-0 text-center">
            <p className="stage-label">{dict.expected}</p>
            <p className="mt-1 font-display text-xl text-maple-deep sm:text-2xl">
              {total ? format(total.cumulativeCost) : common.dash}
            </p>
          </div>
          <div className="min-w-0 text-center">
            <p className="stage-label">{dict.typical}</p>
            <p className="mt-1 font-display text-xl text-ink sm:text-2xl">
              {targetSim ? format(targetSim[1]) : common.dash}
            </p>
          </div>
          <div className="min-w-0 text-center">
            <p className="stage-label">{dict.unlucky}</p>
            <p className="mt-1 font-display text-xl text-ink sm:text-2xl">
              {targetSim ? format(targetSim[2]) : common.dash}
            </p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 items-start gap-3 divide-x-2 divide-wood-light/40 border-t-2 border-wood-light/40 pt-3 sm:gap-6">
          <div className="min-w-0 text-center">
            <p className="stage-label">{dict.taps}</p>
            <p className="mt-1 font-display text-lg text-ink sm:text-xl">
              {total ? count(total.cumulativeAttempts) : common.dash}
            </p>
          </div>
          <div className="min-w-0 text-center">
            <p className="stage-label">{dict.breaks}</p>
            <p className="mt-1 font-display text-lg text-ink sm:text-xl">
              {total ? count(total.cumulativeBreaks) : common.dash}
            </p>
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] font-semibold text-sky-ink">
          {simShort
            ? fill(dict.simCapped, { star: sim.simTo })
            : fill(dict.typicalHint, { runs: sim.runs.toLocaleString() })}
        </p>
      </div>

      <div className="window">
        <h2 className="window-title text-base">{dict.setup}</h2>
        <div className="space-y-5 p-4">
          <div className="grid gap-5 sm:grid-cols-2">
            <StarSlider
              id="sf-from"
              label={dict.from}
              value={from}
              min={0}
              max={MAX_STAR - 1}
              display={fill(dict.starValue, { star: from })}
              onChange={(v) => {
                setFrom(v);
                if (v >= to) setTo(Math.min(MAX_STAR, v + 1));
              }}
            />
            <StarSlider
              id="sf-to"
              label={dict.to}
              value={to}
              min={1}
              max={MAX_STAR}
              display={fill(dict.starValue, { star: to })}
              onChange={(v) => {
                setTo(v);
                if (v <= from) setFrom(Math.max(0, v - 1));
              }}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-wood-light bg-panel-deep px-3 py-2">
            <input
              type="checkbox"
              checked={minigame}
              onChange={(e) => setMinigame(e.target.checked)}
              className="h-4 w-4 shrink-0 accent-maple"
            />
            <span className="text-xs font-bold text-ink">
              {dict.minigame}
              <span className="ml-1 font-semibold text-ink-soft">
                {dict.minigameHint}
              </span>
            </span>
          </label>

          <label className="block">
            <span className="stage-label mb-2 block text-ink-soft">
              {dict.repair}
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={repairCost.toLocaleString()}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "");
                setRepairCost(digits ? Math.min(Number(digits), 1e12) : 0);
              }}
              className="w-full max-w-xs rounded-lg border-2 border-wood-light bg-panel-deep px-3 py-2 font-bold text-ink tabular-nums transition focus:border-maple"
            />
            <span className="mt-1 block text-xs text-ink-soft">
              {dict.repairHint}
            </span>
          </label>
        </div>
      </div>

      <div className="window">
        <div className="window-title flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-base">
          <h2>{dict.chartTitle}</h2>
          <div
            role="group"
            aria-label={dict.scale}
            className="flex gap-1.5 font-sans tracking-normal"
          >
            {(["log", "linear"] as Scale[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setScale(s)}
                aria-pressed={scale === s}
                className={pill(scale === s)}
              >
                {s === "log" ? dict.scaleLog : dict.scaleLinear}
              </button>
            ))}
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <p className="text-xs font-semibold text-ink-soft">
            {fill(dict.chartSubtitle, { from })}
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold text-ink">
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="h-[3px] w-4 rounded-full bg-maple" />
              {dict.legendExpected}
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="h-[3px] w-4 rounded-full bg-sky-deep" />
              {dict.legendMedian}
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="h-3 w-4 rounded-sm bg-sky-deep/20" />
              {dict.legendBand}
            </li>
          </ul>
          <div className="mt-3">
            <StarForceChart
              points={points}
              from={from}
              scale={scale}
              hovered={hovered}
              onHover={setHovered}
              format={format}
              dict={dict}
            />
          </div>
        </div>
      </div>

      <div className="window">
        <h2 className="window-title text-base">{dict.tableTitle}</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-wood-light/60">
                <th className="stage-label px-3 py-2 text-left text-ink-soft">
                  {dict.colStar}
                </th>
                <th className="stage-label px-2 py-2 text-right text-ink-soft">
                  {dict.colTap}
                </th>
                <th className="stage-label px-2 py-2 text-right text-ink-soft">
                  {dict.colSuccess}
                </th>
                <th className="stage-label px-2 py-2 text-right text-ink-soft">
                  {dict.colKeep}
                </th>
                <th className="stage-label px-2 py-2 text-right text-ink-soft">
                  {dict.colDrop}
                </th>
                <th className="stage-label px-2 py-2 text-right text-ink-soft">
                  {dict.colBreak}
                </th>
                <th className="stage-label px-2 py-2 text-right text-ink-soft">
                  {dict.colStep}
                </th>
                <th className="stage-label px-2 py-2 text-right text-ink-soft">
                  {dict.colCumulative}
                </th>
                <th className="stage-label px-2 py-2 text-right text-ink-soft">
                  {dict.colMedian}
                </th>
                <th className="stage-label px-3 py-2 text-right text-ink-soft">
                  {dict.colP90}
                </th>
              </tr>
            </thead>
            <tbody>
              {path.map((step) => {
                const s = sim.stars.get(step.star);
                const active = hovered === step.star;
                return (
                  <tr
                    key={step.star}
                    onPointerEnter={() => setHovered(step.star)}
                    onPointerLeave={() => setHovered(null)}
                    className={`border-b border-wood-light/30 tabular-nums last:border-0 ${
                      active ? "bg-maple/10" : ""
                    }`}
                  >
                    <th scope="row" className="px-3 py-1.5 text-left font-bold text-ink">
                      {fill(dict.starValue, { star: step.star })}
                    </th>
                    <td className="px-2 py-1.5 text-right text-ink">
                      {format(step.cost)}
                    </td>
                    <td className="px-2 py-1.5 text-right font-bold text-leaf">
                      {pct(step.rates.success)}
                    </td>
                    <td className="px-2 py-1.5 text-right text-ink-soft">
                      {pct(step.rates.maintain)}
                    </td>
                    <td className="px-2 py-1.5 text-right text-ink-soft">
                      {step.rates.degrade > 0 ? pct(step.rates.degrade) : common.dash}
                    </td>
                    <td className="px-2 py-1.5 text-right text-ink-soft">
                      {step.rates.break > 0 ? pct(step.rates.break) : common.dash}
                    </td>
                    <td className="px-2 py-1.5 text-right text-ink">
                      {format(step.expectedCost)}
                    </td>
                    <td className="px-2 py-1.5 text-right font-bold text-maple-deep">
                      {format(step.cumulativeCost)}
                    </td>
                    <td className="px-2 py-1.5 text-right font-bold text-sky-deep">
                      {s ? format(s[1]) : common.dash}
                    </td>
                    <td className="px-3 py-1.5 text-right text-ink">
                      {s ? format(s[2]) : common.dash}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="border-t-2 border-wood-light/50 px-3 py-2 text-[11px] font-semibold text-ink-soft">
          {fill(dict.tableFootnote, { from, repair: format(repairCost) })}
        </p>
      </div>

      <div className="window">
        <h2 className="window-title text-base">{common.notes}</h2>
        <ul className="space-y-1.5 p-4 text-xs leading-relaxed text-ink-soft">
          {dict.dataNotes.map((note) => (
            <li key={note}>• {note}</li>
          ))}
          <li>
            •{" "}
            <Interpolate
              template={dict.noteSource}
              vars={{
                date: STARFORCE_UPDATED,
                link: (
                  <a
                    href={STARFORCE_SOURCE}
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

/* A slider with the star written large beside it: on a phone a range thumb
   is the quickest way to move ten stars, and the readout is the thing you
   actually look at while dragging. */
function StarSlider({
  id,
  label,
  value,
  min,
  max,
  display,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="stage-label text-ink-soft">
          {label}
        </label>
        <output
          htmlFor={id}
          className="font-display text-2xl text-ink tabular-nums"
        >
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 h-2 w-full cursor-pointer accent-maple"
      />
      <div className="mt-0.5 flex justify-between text-[10px] font-bold text-ink-soft">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
