"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { fill } from "@/lib/i18n";

/* Hand-rolled SVG: the site ships no chart library, and the chart is one
   climb — a line for the expected total, a line for the median run and a
   band for the middle 80% of runs — so a few hundred lines of geometry
   beats a dependency. */

export interface ChartPoint {
  star: number;
  /** Cumulative expected mesos to first reach this star. */
  expected: number;
  /** Simulated percentiles of the same total, or null past the sim cap. */
  p10: number | null;
  median: number | null;
  p90: number | null;
  /** Expected cost and taps of this star alone, for the tooltip. */
  stepCost: number;
  stepTaps: number;
}

export type Scale = "log" | "linear";

/* A five-point star, tip up. The markers are the one place the chart says
   "these are stars" without a label — a circle would read as any chart. */
function starPath(cx: number, cy: number, outer: number, inner: number) {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    points.push(
      `${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`,
    );
  }
  return `M${points.join("L")}Z`;
}

/* 1 / 2 / 2.5 / 5 × 10^k, the smallest that gives at most `count` steps */
function niceStep(max: number, count: number) {
  const raw = max / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  for (const m of [1, 2, 2.5, 5, 10]) {
    if (m * mag >= raw) return m * mag;
  }
  return 10 * mag;
}

const MARGIN = { top: 18, right: 20, bottom: 34, left: 60 };

export default function StarForceChart({
  points,
  from,
  scale,
  hovered,
  onHover,
  format,
  dict,
}: {
  points: ChartPoint[];
  from: number;
  scale: Scale;
  hovered: number | null;
  onHover: (star: number | null) => void;
  format: (mesos: number) => string;
  dict: Dictionary["starforce"];
}) {
  /* Rendered in pixels, not a scaled viewBox: scaling the viewBox would
     shrink the axis text to unreadable on a phone. The server render uses a
     desktop width and the observer corrects it on mount. */
  const wrap = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const w = Math.floor(entry.contentRect.width);
      if (w > 0) setWidth(w);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const height = Math.round(Math.min(340, Math.max(240, width * 0.5)));
  const plotLeft = MARGIN.left;
  const plotRight = width - MARGIN.right;
  const plotTop = MARGIN.top;
  const plotBottom = height - MARGIN.bottom;
  const plotW = Math.max(1, plotRight - plotLeft);
  const plotH = Math.max(1, plotBottom - plotTop);

  const n = points.length;
  const bandW = plotW / Math.max(1, n);
  const x = (i: number) => plotLeft + bandW * (i + 0.5);

  /* The domain covers the band, not only the lines, so the unlucky tail is
     never clipped. Log floors at the nearest power of ten below the first
     star so the lowest point still sits off the axis. */
  const values = points.flatMap((p) =>
    [p.expected, p.p10, p.p90].filter((v): v is number => v !== null && v > 0),
  );
  const maxV = Math.max(1, ...values);
  const minV = Math.min(maxV, ...values);

  let y: (v: number) => number;
  let ticks: number[];
  if (scale === "log") {
    const lo = Math.floor(Math.log10(minV));
    const hi = Math.max(lo + 1, Math.ceil(Math.log10(maxV)));
    y = (v) =>
      plotBottom - ((Math.log10(Math.max(v, 1)) - lo) / (hi - lo)) * plotH;
    const every = hi - lo > 8 ? 2 : 1;
    ticks = [];
    for (let e = lo; e <= hi; e += every) ticks.push(10 ** e);
  } else {
    const top = maxV * 1.05;
    y = (v) => plotBottom - (v / top) * plotH;
    const step = niceStep(top, 4);
    ticks = [];
    for (let v = 0; v <= top; v += step) ticks.push(v);
  }

  const simmed = points.filter(
    (p): p is ChartPoint & { p10: number; median: number; p90: number } =>
      p.p10 !== null && p.median !== null && p.p90 !== null,
  );
  const indexOf = new Map(points.map((p, i) => [p.star, i]));
  const px = (p: ChartPoint) => x(indexOf.get(p.star) ?? 0);

  const bandPath =
    simmed.length > 1
      ? `M${simmed.map((p) => `${px(p).toFixed(1)},${y(p.p10).toFixed(1)}`).join("L")}` +
        `L${[...simmed]
          .reverse()
          .map((p) => `${px(p).toFixed(1)},${y(p.p90).toFixed(1)}`)
          .join("L")}Z`
      : null;
  const line = (pick: (p: ChartPoint) => number | null, list: ChartPoint[]) =>
    list
      .map((p, i) => {
        const v = pick(p);
        return v === null ? "" : `${i === 0 ? "M" : "L"}${px(p).toFixed(1)},${y(v).toFixed(1)}`;
      })
      .join("");

  /* X labels thin out when the bands get narrower than a "★12" label,
     counted back from the target so it always keeps its label and the
     gaps stay even. */
  const labelEvery = Math.max(1, Math.ceil(28 / bandW));
  const labelled = (i: number) => (n - 1 - i) % labelEvery === 0;

  const hoveredIndex = hovered === null ? undefined : indexOf.get(hovered);
  const hoveredPoint =
    hoveredIndex === undefined ? undefined : points[hoveredIndex];
  const last = points[n - 1];

  /* Tooltip sits beside the crosshair, flipping sides past the midpoint so
     it never leaves the card, and rides the hovered star's height rather
     than the top of the plot — the sticky headline card can cover the top
     of the chart on a phone. */
  const tipLeft =
    hoveredIndex === undefined
      ? 0
      : x(hoveredIndex) < width / 2
        ? x(hoveredIndex) + 12
        : undefined;
  const tipRight =
    hoveredIndex === undefined || tipLeft !== undefined
      ? undefined
      : width - x(hoveredIndex) + 12;
  const TIP_HEIGHT = 120;
  const tipTop = hoveredPoint
    ? Math.min(
        Math.max(y(hoveredPoint.expected) - TIP_HEIGHT / 2, 0),
        height - TIP_HEIGHT,
      )
    : 0;

  return (
    <div
      ref={wrap}
      className="relative w-full select-none"
      onPointerLeave={() => onHover(null)}
    >
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={fill(dict.chartAria, { from, to: last?.star ?? from })}
        className="block overflow-visible"
      >
        {/* gridlines + y ticks: hairline, one shade off the panel */}
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={plotLeft}
              x2={plotRight}
              y1={y(t)}
              y2={y(t)}
              className="stroke-wood-light/35"
              strokeWidth={1}
              shapeRendering="crispEdges"
            />
            <text
              x={plotLeft - 8}
              y={y(t)}
              dy="0.35em"
              textAnchor="end"
              className="fill-ink-soft text-[10px] font-bold tabular-nums"
            >
              {format(t)}
            </text>
          </g>
        ))}
        {/* baseline */}
        <line
          x1={plotLeft}
          x2={plotRight}
          y1={plotBottom}
          y2={plotBottom}
          className="stroke-wood-light/70"
          strokeWidth={1}
          shapeRendering="crispEdges"
        />

        {/* x labels */}
        {points.map((p, i) =>
          labelled(i) ? (
            <text
              key={p.star}
              x={x(i)}
              y={plotBottom + 18}
              textAnchor="middle"
              className={`text-[10px] font-bold ${
                hovered === p.star ? "fill-ink" : "fill-ink-soft"
              }`}
            >
              {fill(dict.starValue, { star: p.star })}
            </text>
          ) : null,
        )}

        {/* 10–90% band: a wash of the series blue */}
        {bandPath && (
          <path d={bandPath} className="fill-sky-deep/20" stroke="none" />
        )}

        {/* median run */}
        {simmed.length > 0 && (
          <path
            d={line((p) => p.median, simmed)}
            fill="none"
            className="stroke-sky-deep"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}

        {/* expected total */}
        <path
          d={line((p) => p.expected, points)}
          fill="none"
          className="stroke-maple"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* crosshair */}
        {hoveredIndex !== undefined && (
          <line
            x1={x(hoveredIndex)}
            x2={x(hoveredIndex)}
            y1={plotTop}
            y2={plotBottom}
            className="stroke-ink/40"
            strokeWidth={1}
            shapeRendering="crispEdges"
          />
        )}

        {/* star markers, ringed in the panel colour so they stay legible
            where the two lines cross */}
        {points.map((p, i) => {
          const active = hovered === p.star;
          return (
            <path
              key={p.star}
              d={starPath(x(i), y(p.expected), active ? 8 : 6, active ? 3.6 : 2.7)}
              className="fill-maple stroke-panel"
              strokeWidth={2}
              strokeLinejoin="round"
            />
          );
        })}
        {simmed.map((p) => (
          <circle
            key={p.star}
            cx={px(p)}
            cy={y(p.median)}
            r={hovered === p.star ? 4.5 : 3}
            className="fill-sky-deep stroke-panel"
            strokeWidth={2}
          />
        ))}

        {/* one direct label: the target */}
        {last && (
          <text
            x={x(n - 1) - 10}
            y={y(last.expected) - 10}
            textAnchor="end"
            className="fill-ink text-[11px] font-bold tabular-nums"
          >
            {format(last.expected)}
          </text>
        )}

        {/* hit bands: the whole column is the target, and each is focusable
            so keyboard users get the same readout as hover */}
        {points.map((p, i) => (
          <rect
            key={p.star}
            x={plotLeft + bandW * i}
            y={plotTop}
            width={bandW}
            height={plotH + MARGIN.bottom}
            fill="transparent"
            tabIndex={0}
            role="img"
            aria-label={fill(dict.pointAria, {
              star: p.star,
              expected: format(p.expected),
              median: p.median === null ? dict.tooltipNoSim : format(p.median),
              p90: p.p90 === null ? dict.tooltipNoSim : format(p.p90),
            })}
            className="outline-none focus-visible:stroke-maple"
            strokeWidth={2}
            onPointerEnter={() => onHover(p.star)}
            onPointerDown={() => onHover(p.star)}
            onFocus={() => onHover(p.star)}
            onBlur={() => onHover(null)}
          />
        ))}
      </svg>

      {hoveredPoint && (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-10 w-max max-w-[16rem] rounded-lg border-2 border-wood bg-panel px-3 py-2 text-xs shadow-[0_3px_0_rgba(67,48,31,0.25)]"
          style={{ left: tipLeft, right: tipRight, top: tipTop }}
        >
          <p className="font-display text-sm text-ink">
            {fill(dict.starValue, { star: hoveredPoint.star })}
          </p>
          <dl className="mt-1 space-y-0.5">
            <TipRow
              swatch="bg-maple"
              value={format(hoveredPoint.expected)}
              label={dict.legendExpected}
            />
            <TipRow
              swatch="bg-sky-deep"
              value={
                hoveredPoint.median === null
                  ? dict.tooltipNoSim
                  : format(hoveredPoint.median)
              }
              label={dict.legendMedian}
            />
            <TipRow
              swatch="bg-sky-deep/30"
              value={
                hoveredPoint.p90 === null
                  ? dict.tooltipNoSim
                  : format(hoveredPoint.p90)
              }
              label={dict.unlucky}
            />
          </dl>
          <p className="mt-1.5 border-t border-wood-light/40 pt-1.5 text-[11px] font-semibold text-ink-soft">
            {fill(dict.tooltipStep, {
              cost: format(hoveredPoint.stepCost),
              taps:
                hoveredPoint.stepTaps >= 1e6
                  ? format(hoveredPoint.stepTaps)
                  : hoveredPoint.stepTaps.toLocaleString(undefined, {
                      maximumFractionDigits: hoveredPoint.stepTaps < 10 ? 1 : 0,
                    }),
            })}
          </p>
        </div>
      )}
    </div>
  );
}

/* Value first, label second: the reader already knows which star they are
   on and wants the number. Identity rides the swatch, never the text. */
function TipRow({
  swatch,
  value,
  label,
}: {
  swatch: string;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span aria-hidden className={`h-[3px] w-3 shrink-0 rounded-full ${swatch}`} />
      <dt className="order-last text-ink-soft">{label}</dt>
      <dd className="font-bold tabular-nums text-ink">{value}</dd>
    </div>
  );
}
