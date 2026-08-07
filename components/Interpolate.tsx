import { Fragment, type ReactNode } from "react";

/**
 * Fills `{placeholders}` in a dictionary string with React nodes — for the
 * sentences that wrap a link or bold run around a value.
 *
 * The string version (lib/i18n/format.ts `fill`) cannot do this, and
 * splitting the sentence into "before" and "after" halves in the dictionary
 * would not survive translation: the placeholder sits in a different
 * position in every language.
 */
export default function Interpolate({
  template,
  vars,
}: {
  template: string;
  vars: Record<string, ReactNode>;
}) {
  const parts = template.split(/\{(\w+)\}/g);
  return (
    <>
      {parts.map((part, i) =>
        // Odd indices are the captured placeholder names
        i % 2 === 1 ? (
          <Fragment key={i}>{part in vars ? vars[part] : `{${part}}`}</Fragment>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
