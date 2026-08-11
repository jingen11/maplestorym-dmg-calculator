"use client";

import { useState } from "react";
import { fill, plural } from "@/lib/i18n";
import { runBatch, runUntilHit } from "@/lib/simulate";

/**
 * The chrome around a roll is identical for cubes and flames — only the
 * shape of a result differs — so each table adapts its own roller into
 * these two neutral types and hands over a `roll` closure.
 */
export interface SimSlot {
  /** Localized option name. */
  label: string;
  /** Pre-formatted value, exactly as the table above renders it. */
  value: string;
  /** Whether this slot matched the player's selection. */
  hit: boolean;
}

export interface SimRoll {
  slots: SimSlot[];
  hit: boolean;
}

/** Same key shape in dict.cubes.sim and dict.flames.sim, worded per unit. */
export interface SimStrings {
  title: string;
  intro: string;
  needPick: string;
  rollOnce: string;
  untilHit: string;
  rollBatch: string;
  reset: string;
  empty: string;
  hit: string;
  miss: string;
  slot: string;
  spent: string;
  hits: string;
  observed: string;
  expected: string;
  untilHitOne: string;
  untilHitOther: string;
  vsMedian: string;
  exhausted: string;
  batch: string;
  disclaimer: string;
}

/**
 * Guard, not a pity counter. At a low enough per-roll chance a run can
 * genuinely go this long, and the UI says the run stopped at its limit
 * rather than presenting the cap as a result.
 */
const LIMIT = 100_000;

const pct = (n: number) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function RollSimulator({
  strings,
  roll,
  hasTarget,
  perAttempt,
  need50,
  batchSize = 100,
}: {
  strings: SimStrings;
  /** Draws one cube/flame from the prepared decks. */
  roll: () => SimRoll;
  /** False when nothing is selected — a hit is then impossible. */
  hasTarget: boolean;
  /** Theoretical chance per roll, to compare the observed rate against. */
  perAttempt: number;
  /** Rolls the table says reach a coin flip, for the until-hit verdict. */
  need50: number | null;
  batchSize?: number;
}) {
  const [last, setLast] = useState<SimRoll | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [spent, setSpent] = useState(0);
  const [hits, setHits] = useState(0);

  const record = (attempts: number, got: number) => {
    setSpent((s) => s + attempts);
    setHits((h) => h + got);
  };

  const rollOnce = () => {
    const result = roll();
    setLast(result);
    setNote(null);
    record(1, result.hit ? 1 : 0);
  };

  const rollUntilHit = () => {
    const run = runUntilHit(roll, LIMIT);
    setLast(run.first);
    record(run.attempts, run.hits);
    if (run.exhausted) {
      setNote(fill(strings.exhausted, { count: run.attempts }));
      return;
    }
    const verdict = plural(run.attempts, {
      one: strings.untilHitOne,
      other: strings.untilHitOther,
    });
    setNote(
      need50 === null
        ? verdict
        : `${verdict} ${fill(strings.vsMedian, { count: need50 })}`,
    );
  };

  const rollMany = () => {
    const run = runBatch(roll, batchSize);
    // Keep the previous roll on screen when a batch lands nothing, rather
    // than blanking the panel — the note already reports the zero.
    if (run.first) setLast(run.first);
    record(run.attempts, run.hits);
    setNote(fill(strings.batch, { hits: run.hits, count: run.attempts }));
  };

  const reset = () => {
    setLast(null);
    setNote(null);
    setSpent(0);
    setHits(0);
  };

  const action = (primary = false, disabled = false) =>
    `rounded-lg border-2 px-3 py-2 text-xs font-bold transition ${
      disabled
        ? "cursor-not-allowed border-wood-light/40 bg-panel-deep/50 text-ink-soft/50"
        : primary
          ? "border-wood bg-maple text-white shadow-[0_2px_0_rgba(67,48,31,0.25)] hover:bg-maple-deep"
          : "border-wood-light bg-panel-deep text-ink hover:border-wood"
    }`;

  return (
    <div className="window">
      <h2 className="window-title text-base">{strings.title}</h2>
      <div className="space-y-4 p-4">
        <p className="text-xs leading-relaxed text-ink-soft">
          {strings.intro}
        </p>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={rollOnce} className={action(true)}>
            {strings.rollOnce}
          </button>
          <button
            type="button"
            onClick={rollUntilHit}
            disabled={!hasTarget}
            className={action(false, !hasTarget)}
          >
            {strings.untilHit}
          </button>
          <button
            type="button"
            onClick={rollMany}
            disabled={!hasTarget}
            className={action(false, !hasTarget)}
          >
            {strings.rollBatch}
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={spent === 0}
            className={action(false, spent === 0)}
          >
            {strings.reset}
          </button>
        </div>

        {!hasTarget && (
          <p className="text-[11px] font-semibold text-sky-ink">
            {strings.needPick}
          </p>
        )}

        {/* The rolled item. aria-live so a screen reader hears each result
            without having to go hunting for what changed. */}
        <div
          aria-live="polite"
          className="rounded-lg border-2 border-wood-light bg-panel-deep p-3"
        >
          {last === null ? (
            <p className="py-4 text-center text-xs font-semibold text-ink-soft">
              {strings.empty}
            </p>
          ) : (
            <>
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="stage-label text-ink-soft">
                  {last.hit ? strings.hit : strings.miss}
                </span>
                <span
                  aria-hidden
                  className={`h-2.5 w-2.5 rounded-full border-2 ${
                    last.hit
                      ? "border-wood bg-maple"
                      : "border-wood-light bg-transparent"
                  }`}
                />
              </div>
              <ol className="space-y-1">
                {last.slots.map((slotResult, i) => (
                  <li
                    key={i}
                    className={`flex flex-wrap items-baseline justify-between gap-x-3 rounded-md border-2 px-2.5 py-1.5 text-xs ${
                      slotResult.hit
                        ? "border-wood bg-maple/20 font-bold text-ink"
                        : "border-transparent bg-panel/60 text-ink-soft"
                    }`}
                  >
                    <span className="flex min-w-0 items-baseline gap-2">
                      <span className="stage-label shrink-0 text-ink-soft">
                        {fill(strings.slot, { n: i + 1 })}
                      </span>
                      <span className="min-w-0">{slotResult.label}</span>
                    </span>
                    <span className="shrink-0 tabular-nums">
                      {slotResult.value}
                    </span>
                  </li>
                ))}
              </ol>
            </>
          )}
          {note && (
            <p className="mt-3 border-t-2 border-wood-light/40 pt-2 text-[11px] font-semibold text-sky-ink">
              {note}
            </p>
          )}
        </div>

        {spent > 0 && (
          <dl className="grid grid-cols-3 gap-3 text-center">
            <div>
              <dt className="stage-label text-ink-soft">{strings.spent}</dt>
              <dd className="mt-0.5 font-display text-lg tabular-nums text-ink">
                {spent.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="stage-label text-ink-soft">{strings.hits}</dt>
              <dd className="mt-0.5 font-display text-lg tabular-nums text-maple-deep">
                {hits.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="stage-label text-ink-soft">{strings.observed}</dt>
              <dd className="mt-0.5 font-display text-lg tabular-nums text-ink">
                {pct((hits / spent) * 100)}%
              </dd>
              <p className="text-[10px] font-semibold text-ink-soft">
                {fill(strings.expected, { chance: pct(perAttempt) })}
              </p>
            </div>
          </dl>
        )}

        <p className="text-[11px] leading-relaxed text-ink-soft">
          {strings.disclaimer}
        </p>
      </div>
    </div>
  );
}
