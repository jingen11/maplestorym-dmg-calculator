/**
 * Bolds the UI terms a sentence refers to ("Any value is the chance…").
 *
 * The emphasis is found inside the sentence rather than spliced around it:
 * the term lands in a different position in every language, so splitting
 * the sentence in the dictionary would not survive translation.
 */
export default function Emphasize({
  text,
  terms,
}: {
  text: string;
  terms: string[];
}) {
  const escaped = terms
    .filter(Boolean)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (escaped.length === 0) return <>{text}</>;

  // Longest first, so "per option slot" wins over a nested "per option"
  escaped.sort((a, b) => b.length - a.length);

  const parts = text.split(new RegExp(`(${escaped.join("|")})`));
  return (
    <>
      {parts.map((chunk, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-ink">
            {chunk}
          </strong>
        ) : (
          <span key={i}>{chunk}</span>
        ),
      )}
    </>
  );
}
