import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import CubeTable from "@/components/CubeTable";
import {
  cubeChance,
  cubesFor,
  getLines,
  RANK_UP,
  selectedChance,
  lineKey,
} from "@/lib/cubes";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const CUBES_TITLE = "MapleStory M Cube Probabilities";
const CUBES_DESCRIPTION =
  "Every MapleStory M potential and bonus potential option with its exact chance, ported from Nexon's official probability disclosure. Pick a part, rank and line, select the options you want, and see your chance per cube and how many cubes it takes.";

export const metadata: Metadata = {
  title: CUBES_TITLE,
  description: CUBES_DESCRIPTION,
  keywords: [
    "MapleStory M cube",
    "cube probabilities",
    "potential probabilities",
    "bonus potential",
    "MSM cube odds",
    "black cube",
    "red cube",
    "occult cube",
    "MapleStory M potential calculator",
  ],
  alternates: { canonical: "/cubes" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/cubes/`,
    siteName: SITE_NAME,
    title: `${CUBES_TITLE} | ${SITE_NAME}`,
    description: CUBES_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${CUBES_TITLE} | ${SITE_NAME}`,
    description: CUBES_DESCRIPTION,
  },
};

/* Computed from the same tables the calculator uses, so the guide cannot
   drift from the tool. Targets the top PHY ATK line on a Legendary weapon. */
const example = (() => {
  const part = "Weapon";
  const rank = "Legendary" as const;
  const first = getLines(part, "potential", rank, "first");
  const second = getLines(part, "potential", rank, "second");
  const top = first
    .filter((l) => l.option === "PHY ATK")
    .reduce((a, b) => (Number(b.value) > Number(a.value) ? b : a));
  const picked = new Set([lineKey(top)]);
  const q1 = selectedChance(first, picked);
  const q2 = selectedChance(second, picked);
  const oneLine = cubeChance(q1, 0, 1);
  const threeLine = cubeChance(q1, q2, 3);
  const pct = (n: number) => `${n.toFixed(2)}%`;
  return {
    part,
    rank,
    option: top.option,
    value: top.value,
    oneLine: pct(oneLine),
    oneAttempts: cubesFor(oneLine, 50),
    threeLine: pct(threeLine),
    threeAttempts: cubesFor(threeLine, 50),
    rankUpSlow: cubesFor(RANK_UP.potential["Occult Cube / Red Cube"], 50),
    rankUpFast: cubesFor(RANK_UP.potential["Black Cube / Choice Cube"], 50),
  };
})();

const steps = [
  {
    title: "Pick the part and rank",
    body: "Every equipment part has its own option pool, and the pool changes completely with the potential rank. Pendant, Ring and Pocket have no bonus potential, so that option is disabled for them.",
  },
  {
    title: "Choose potential or bonus potential",
    body: "They are separate systems with separate tables and separate cubes. Bonus potential lines come from a smaller pool than regular potential.",
  },
  {
    title: "Pick the line pool",
    body: "The first potential line rolls from a different, usually smaller pool than the second and third lines. Switch pools to see each one — anything you select stays selected in both.",
  },
  {
    title: "Select what you want and read the odds",
    body: "Tap an option name to take every value of that stat, or tap a single value to target exactly that roll. The card shows your chance on the shown line, your chance per cube across the whole item, and how many cubes reach a 50% or 90% shot.",
  },
];

const faq = [
  {
    question: "What are the odds of a specific cube line in MapleStory M?",
    answer:
      "Each line has its own published chance, and it depends on the equipment part, the potential rank, and whether it is the first line or the second/third line. Select the lines you want in the table and the calculator sums them, then combines the pools to give your chance per cube.",
  },
  {
    question: "Do Occult, Red, Black and Choice Cubes have different options?",
    answer:
      "No. Nexon states the option probabilities are identical across Occult, Red, Black and Choice Cubes — they differ only in function and in rank-up chance. Occult and Red rank up 1% of the time, Black and Choice 2%.",
  },
  {
    question: "Why is the second line different from the first line?",
    answer:
      "Nexon publishes two separate pools per rank. The first potential line draws from one pool and the second and third lines draw from another, which is usually much larger — so a line that is common in the first slot can be rare in the others.",
  },
  {
    question: "How many cubes does it take to rank up potential?",
    answer:
      `Rank-up is a separate roll from the options: 1% per cube for Occult and Red Cubes, 2% for Black and Choice Cubes. That is about ${example.rankUpSlow} cubes for a 50% chance at 1%, or ${example.rankUpFast} cubes at 2%. There is no pity — each cube is independent.`,
  },
  {
    question: "Which parts have bonus potential?",
    answer:
      "Most equipment does, but Pendant, Ring and Pocket have no bonus potential table in Nexon's disclosure, so the calculator disables that option for them.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: `${SITE_NAME} — Cube Probabilities`,
      url: `${SITE_URL}/cubes/`,
      applicationCategory: "GameApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "HowTo",
      name: "How to read the MapleStory M cube probability table",
      description:
        "Work out your real chance of rolling a specific potential line, and how many cubes it takes.",
      step: steps.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step.title,
        text: step.body,
        url: `${SITE_URL}/cubes/#step-${i + 1}`,
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

export default function CubesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="font-display text-3xl text-ink [text-shadow:0_2px_0_rgba(67,48,31,0.15)] sm:text-4xl">
        Cube Probabilities
      </h1>
      <p className="mt-2 max-w-2xl font-semibold text-ink-soft">
        Nexon&apos;s official potential and bonus potential tables, made
        interactive. Pick a part, rank and line pool, tap the options you
        actually want, and see your chance per cube — plus how many cubes it
        takes to get there.
      </p>

      <div className="mt-8">
        <CubeTable />
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
              Chasing <strong className="text-ink">{example.option}</strong>{" "}
              <strong className="text-ink">{example.value}</strong> on a{" "}
              <strong className="text-ink">{example.rank}</strong>{" "}
              {example.part}:
            </p>
            <dl className="mt-3 space-y-2 text-xs">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-wood-light/40 pb-2">
                <dt className="text-ink-soft">On the 1st line only</dt>
                <dd className="font-bold tabular-nums text-ink">
                  {example.oneLine} per cube ·{" "}
                  <span className="text-maple-deep">
                    {example.oneAttempts} cubes
                  </span>{" "}
                  for a coin flip
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <dt className="text-ink-soft">Anywhere on a 3-line item</dt>
                <dd className="font-bold tabular-nums text-ink">
                  {example.threeLine} per cube ·{" "}
                  <span className="text-maple-deep">
                    {example.threeAttempts} cubes
                  </span>{" "}
                  for a coin flip
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">
              Accepting the line anywhere on the item instead of demanding it
              in the first slot is dramatically cheaper — which is why it pays
              to decide up front how strict you actually need to be.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-ink">Reading the table</p>
            <ul className="mt-1 space-y-1.5 text-xs leading-relaxed text-ink-soft">
              <li>
                • Each option is a header row showing the combined chance of
                that stat at any value, with its individual values listed
                underneath.
              </li>
              <li>
                • <strong className="text-ink">On this line</strong> is your
                chance on the pool currently shown;{" "}
                <strong className="text-ink">per cube</strong> combines the
                first and second/third pools across all the lines on your
                item.
              </li>
              <li>
                • Selections persist when you switch pools, so you can pick
                the same stat in both and see the true per-cube number.
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-ink">Before you spend</p>
            <ul className="mt-1 space-y-1.5 text-xs leading-relaxed text-ink-soft">
              <li>
                • Ranking up and rolling options are separate rolls. A cube
                that fails to rank up still rerolls your lines.
              </li>
              <li>
                • There is no pity on either roll. Cube number{" "}
                {example.rankUpFast} has the same rank-up chance as the first.
              </li>
              <li>
                • Selecting several lines means <strong className="text-ink">any</strong>{" "}
                of them, not all of them.
              </li>
            </ul>
          </div>
        </div>
      </section>


      <section className="window mt-10 max-w-2xl">
        <h2 className="window-title text-base">More tools</h2>
        <div className="space-y-4 p-4">
          <div>
            <Link
              href="/flames"
              className="text-sm font-bold text-maple-deep underline underline-offset-2 hover:text-maple"
            >
              Rebirth Flame probabilities →
            </Link>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Every flame option and its exact drop rate, with the flames needed to land the options you want.
            </p>
          </div>
          <div>
            <Link
              href="/"
              className="text-sm font-bold text-maple-deep underline underline-offset-2 hover:text-maple"
            >
              Damage calculator →
            </Link>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Mob and boss damage per hit, with the level penalty, boss
              defense and food buffs factored in.
            </p>
          </div>
        </div>
      </section>

      <AdSlot slot="cubes-below-table" className="mt-8" />

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
