// Shared probability maths for the cube and flame tables.
//
// Both tables answer three different questions about the same selection:
//
//   "any"   — at least one wanted line lands (the union; probabilities add)
//   "all"   — every wanted line lands at once on the same item
//   "group" — N of the slots land somewhere inside the selection, whichever
//             lines those turn out to be
//
// Only the first is a sum. "All" is a filling problem over the item's line
// slots — what a player is really asking when they want, say, Boss DMG *and*
// ATT% on one weapon. "Group" is the same machinery pointed at a count rather
// than at named lines, which is how "three lines of attack, any of them" gets
// asked; it collapses back onto "any" at N = 1.

/** Which question a selection is asking. */
export type MatchMode = "any" | "all" | "group";

/** One thing the item has to end up with, and how many slots must carry it. */
export interface Requirement {
  /** Probability (0–1) that each slot draws this exact line, per slot. */
  probs: number[];
  /** How many slots have to land it — 1 for a plain pick, 2 or 3 for a stack. */
  need: number;
}

/**
 * Chance every requirement is met at once, counting duplicates.
 *
 * Requirements are one per selected line, so they are mutually exclusive —
 * a slot that draws one cannot also draw another — and slots are assumed
 * independent, the same assumption the "any" formulas already make. Asking
 * for more lines than the item has returns 0 before any work.
 *
 * Walks the slots one at a time, carrying a distribution over "how many of
 * each requirement are filled so far", each count capped at its `need` since
 * extra copies neither help nor hurt. That state space is tiny — the caps
 * multiply out to a handful of entries for any selection that can fit — and
 * unlike an inclusion–exclusion sum it handles `need > 1` directly.
 */
export function requirementChance(reqs: Requirement[]): number {
  if (reqs.length === 0) return 0;
  const slots = reqs[0].probs.length;
  const totalNeed = reqs.reduce((sum, r) => sum + r.need, 0);
  if (slots === 0 || totalNeed > slots) return 0;

  /* Counts packed into one integer, mixed-radix: requirement i contributes
     its filled count (0…need) times strides[i]. The all-filled state is the
     last index, which is what the answer reads out of. */
  const strides: number[] = [];
  let size = 1;
  for (const req of reqs) {
    strides.push(size);
    size *= req.need + 1;
  }

  let dp = new Float64Array(size);
  dp[0] = 1;
  for (let slot = 0; slot < slots; slot++) {
    const next = new Float64Array(size);
    const wanted = reqs.reduce((sum, r) => sum + r.probs[slot], 0);
    const other = Math.max(0, 1 - wanted);
    for (let state = 0; state < size; state++) {
      const carried = dp[state];
      if (carried === 0) continue;
      // The slot draws nothing wanted, and every count stays put.
      next[state] += carried * other;
      for (let i = 0; i < reqs.length; i++) {
        const p = reqs[i].probs[slot];
        if (p <= 0) continue;
        const filled = Math.floor(state / strides[i]) % (reqs[i].need + 1);
        // Past its cap the draw is a duplicate: it still happened, it just
        // does not advance the state.
        const to = filled < reqs[i].need ? state + strides[i] : state;
        next[to] += carried * p;
      }
    }
    dp = next;
  }
  return Math.min(Math.max(dp[size - 1], 0), 1);
}
