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
