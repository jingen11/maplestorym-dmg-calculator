// Dictionaries hold plain strings so a server component can hand one to a
// client component as a prop. Placeholders are filled in at use site.

/** Replaces {name} placeholders. Unknown keys are left alone, not blanked. */
export function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

/**
 * Picks the "1 line" / "N lines" form. English-style plurals only; the other
 * locales supported here have no plural inflection, so their dictionaries
 * simply repeat the same string in both slots.
 */
export function plural(
  count: number,
  forms: { one: string; other: string },
): string {
  return fill(count === 1 ? forms.one : forms.other, { count });
}

/** One rung of a compact-number ladder: amounts >= `value` are divided by it. */
export interface CompactUnit {
  value: number;
  suffix: string;
}

/**
 * Compacts a meso amount to the unit players say — "24.2 mil", "1.35 bil" —
 * using the locale's own ladder (English counts in thousands, Chinese in
 * 万/亿). `units` runs largest first. Precision drops as the scaled number
 * grows so the string stays about the same width: 2 decimals under 10,
 * 1 under 100, none above.
 */
export function compact(n: number, units: CompactUnit[]): string {
  if (!Number.isFinite(n)) return "∞";
  const abs = Math.abs(n);
  for (const unit of units) {
    if (abs >= unit.value) {
      const scaled = n / unit.value;
      /* Past ten thousand of the largest unit the ladder has run out — the
         ★21+ climbs reach 10^25 mesos — so switch to powers of ten rather
         than print a twenty-digit number of "bil". */
      if (Math.abs(scaled) >= 1e4) return exponent(n);
      const digits = Math.abs(scaled) < 10 ? 2 : Math.abs(scaled) < 100 ? 1 : 0;
      return (
        scaled.toLocaleString(undefined, { maximumFractionDigits: digits }) +
        unit.suffix
      );
    }
  }
  return Math.round(n).toLocaleString();
}

const SUPERSCRIPT = "⁰¹²³⁴⁵⁶⁷⁸⁹";

/** 2.6×10²⁵ — for the numbers no unit word covers. */
function exponent(n: number): string {
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const mantissa = n / 10 ** exp;
  const sup = String(exp)
    .split("")
    .map((d) => SUPERSCRIPT[Number(d)])
    .join("");
  return `${mantissa.toLocaleString(undefined, { maximumFractionDigits: 1 })}×10${sup}`;
}
