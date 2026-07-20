import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import FlameTable from "@/components/FlameTable";
import {
  atLeastOneChance,
  attemptsFor,
  getRolls,
  TWO_OPTION_CHANCE,
} from "@/lib/flames";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const FLAMES_TITLE = "MapleStory M Rebirth Flame Probabilities";
const FLAMES_DESCRIPTION =
  "Every MapleStory M Rebirth Flame option and its exact drop rate, ported from Nexon's official probability disclosure. Pick an equipment part and flame tier, select the options you want, and see your chance per flame and how many flames you need.";

export const metadata: Metadata = {
  title: FLAMES_TITLE,
  description: FLAMES_DESCRIPTION,
  keywords: [
    "MapleStory M rebirth flame",
    "rebirth flame probabilities",
    "MSM flame odds",
    "eternal rebirth flame",
    "flame options",
    "MapleStory M flame calculator",
    "boss atk flame",
    "final damage flame",
  ],
  alternates: { canonical: "/flames" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/flames/`,
    siteName: SITE_NAME,
    title: `${FLAMES_TITLE} | ${SITE_NAME}`,
    description: FLAMES_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${FLAMES_TITLE} | ${SITE_NAME}`,
    description: FLAMES_DESCRIPTION,
  },
};

/* The worked example below is computed from the same tables the calculator
   uses, so the guide can never drift from what the tool actually shows. */
const example = (() => {
  const slot = "Weapon";
  const rarity = "Legendary" as const;
  const option = "PHY ATK scales with Boss ATK";
  const lines = getRolls(slot, rarity).filter((r) => r.option === option);
  const two = TWO_OPTION_CHANCE[rarity];
  const best = lines.reduce((a, b) => (b.value > a.value ? b : a));
  const bestChance = atLeastOneChance(best.prob, two);
  const anyChance = atLeastOneChance(
    lines.reduce((sum, r) => sum + r.prob, 0),
    two,
  );
  const pct = (n: number) => `${n.toFixed(2)}%`;
  return {
    slot,
    rarity,
    option,
    count: lines.length,
    bestValue: pct(best.value),
    bestChance: pct(bestChance),
    bestAttempts: attemptsFor(bestChance, 50),
    anyChance: pct(anyChance),
    anyAttempts: attemptsFor(anyChance, 50),
  };
})();

const steps = [
  {
    title: "Pick the equipment part",
    body: "Each part rolls from its own option pool — weapons get attack-scaling lines, armour gets defence-scaling lines. Changing the part rebuilds the whole table.",
  },
  {
    title: "Pick the flame tier",
    body: "The tier sets both the option values and the chance of a second option. Tick Eternal Rebirth Flame if you are using one — it always rolls two options, using the values of the tier you selected.",
  },
  {
    title: "Tap the values you want",
    body: "Tap a single value to target exactly that roll, or tap the option name to select all four of its values at once. Selecting more lines makes the target easier, never harder.",
  },
  {
    title: "Read your odds",
    body: "The card at the top updates live: your chance on one option slot, your real chance per flame, and how many flames it takes to reach a 50% or 90% cumulative shot.",
  },
];

const faq = [
  {
    question: "What are the odds of getting a specific Rebirth Flame option?",
    answer:
      "Each option line has its own published chance — most sit near 1.5–1.7% per option slot. Select the lines you want in the table and the calculator sums them, then factors in the chance of a second option to give your real chance per flame.",
  },
  {
    question: "How does the second Rebirth Flame option work?",
    answer:
      "A flame normally rolls one option, with a tier-based chance of rolling a second: 0% for Rare, 0.1% Epic, 0.3% Unique, 3% Legendary and 8% Mythic. The Eternal Rebirth Flame always rolls two options.",
  },
  {
    question: "Do all equipment parts share the same flame options?",
    answer:
      "No. The available option pool depends on the part. Weapons roll attack-scaling lines, armour parts roll defence-scaling lines, and Final DMG Increase or DEF Ignore Rate only appear on Legendary and Mythic tiers.",
  },
  {
    question: "Why don't the probabilities add up to exactly 100%?",
    answer:
      "Nexon rounds every entry to two decimal places, so a column totals slightly above or below 100%. The table shows the real column total so you can see the rounding drift.",
  },
  {
    question: "What does 'flames for 50%' mean?",
    answer:
      "It is how many flames you need before your cumulative chance of hitting at least one selected option reaches 50%. It is not a guarantee and not a countdown — there is no pity system, so every flame has the same chance as the first. Half of players hit the option by that point and half do not, and the 90% figure shows how long the unlucky tail runs.",
  },
  {
    question: "What happens when I select more than one value?",
    answer:
      "Selecting multiple values means 'any of these', not 'all of these'. An option slot draws exactly one line, so the selected chances add together and every extra line you tick makes the target easier. The calculator cannot yet answer the reverse question — the chance of landing two specific options on the same item — which is far rarer because it requires a two-option roll.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: `${SITE_NAME} — Rebirth Flame Probabilities`,
      url: `${SITE_URL}/flames/`,
      applicationCategory: "GameApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "HowTo",
      name: "How to read the MapleStory M Rebirth Flame probability table",
      description:
        "Work out your real chance of rolling a specific Rebirth Flame option, and how many flames it takes.",
      step: steps.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step.title,
        text: step.body,
        url: `${SITE_URL}/flames/#step-${i + 1}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function FlamesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="font-display text-3xl text-ink [text-shadow:0_2px_0_rgba(67,48,31,0.15)] sm:text-4xl">
        Rebirth Flame Probabilities
      </h1>
      <p className="mt-2 max-w-2xl font-semibold text-ink-soft">
        Nexon&apos;s official Rebirth Flame tables, made interactive. Pick an
        equipment part and flame tier, tap the option values you actually
        want, and see your chance per flame — plus how many flames it takes
        for a coin-flip or a near-certain hit.
      </p>

      <div className="mt-8">
        <FlameTable />
      </div>

      <section className="window mt-10">
        <h2 className="window-title text-base">How to use this table</h2>
        <div className="space-y-5 p-4">
          <ol className="space-y-3">
            {steps.map((step, i) => (
              <li
                key={step.title}
                id={`step-${i + 1}`}
                className="flex scroll-mt-24 gap-3"
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-wood bg-maple font-display text-xs text-white"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{step.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="rounded-lg border-2 border-wood-light bg-panel-deep p-4">
            <p className="stage-label text-ink-soft">Worked example</p>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              On a <strong className="text-ink">{example.slot}</strong> with a{" "}
              <strong className="text-ink">{example.rarity}</strong> flame,
              chasing{" "}
              <strong className="text-ink">{example.option}</strong>:
            </p>
            <dl className="mt-3 space-y-2 text-xs">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-wood-light/40 pb-2">
                <dt className="text-ink-soft">
                  Only the max roll ({example.bestValue})
                </dt>
                <dd className="font-bold tabular-nums text-ink">
                  {example.bestChance} per flame ·{" "}
                  <span className="text-maple-deep">
                    {example.bestAttempts} flames
                  </span>{" "}
                  for a coin flip
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <dt className="text-ink-soft">
                  Any of its {example.count} values
                </dt>
                <dd className="font-bold tabular-nums text-ink">
                  {example.anyChance} per flame ·{" "}
                  <span className="text-maple-deep">
                    {example.anyAttempts} flames
                  </span>{" "}
                  for a coin flip
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">
              That gap is the decision most players are actually making.
              Holding out for the max roll costs roughly{" "}
              {Math.round(
                (example.bestAttempts ?? 0) / (example.anyAttempts || 1),
              )}
              × as many flames as accepting any roll of the option.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-ink">Reading the table</p>
            <ul className="mt-1 space-y-1.5 text-xs leading-relaxed text-ink-soft">
              <li>
                • <strong className="text-ink">Any value</strong> is the chance
                of rolling that option at all, no matter which of its four
                values you get.
              </li>
              <li>
                • <strong className="text-ink">Best → #4</strong> are the four
                possible values, strongest first. All four are equally likely,
                so a single value is always “any value” ÷ 4.
              </li>
              <li>
                • <strong className="text-ink">Per option slot</strong> is your
                chance on one draw;{" "}
                <strong className="text-ink">per flame</strong> is higher
                because a flame can roll a second option.
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-ink">Before you spend</p>
            <ul className="mt-1 space-y-1.5 text-xs leading-relaxed text-ink-soft">
              <li>
                • There is no pity. Flame number {example.bestAttempts} has the
                same odds as flame number one — “flames for 50%” describes a
                spread across many players, not a countdown for you.
              </li>
              <li>
                • Selecting several lines means{" "}
                <strong className="text-ink">any</strong> of them, not all of
                them. Two specific options on one item is a much rarer event,
                since it needs a two-option roll.
              </li>
              <li>
                • The counts assume every flame is the tier you picked. A Rare
                flame can never roll a second option at all.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <AdSlot slot="flames-below-table" className="mt-8" />

      <section className="window mt-10 max-w-2xl">
        <h2 className="window-title text-base">Guide</h2>
        <dl className="space-y-3 p-4">
          {faq.map((item) => (
            <div key={item.question}>
              <dt className="text-sm font-bold text-ink">{item.question}</dt>
              <dd className="mt-0.5 text-xs leading-relaxed text-ink-soft">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
