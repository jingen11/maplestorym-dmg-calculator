import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import DamageCalculator from "@/components/DamageCalculator";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "MapleStory M Damage Calculator",
  description:
    "Free MapleStory M damage calculator. Enter your stats to see mob and boss damage per hit — with the level-difference modifier, boss defense (IED), food buffs, hyper skill modifiers and crit min–max, based on the community-verified damage formula.",
  alternates: { canonical: "/" },
};

const faq = [
  {
    question: "How is damage calculated in MapleStory M?",
    answer:
      "A hit is Attack × (1 + Damage %) × (1 + Attack %) × Skill % × (1 + Final Damage %). Against bosses, Boss Attack % × Skill % is added into the Attack % bracket, and the result is further reduced by the level-difference modifier and the boss's defense (PDR) after your Ignore Defense. The formulas come from the community Damage & Emblem Calculator spreadsheet, verified by in-game testing and datamined defense values.",
  },
  {
    question: "Why is my boss damage so much lower than my mob damage?",
    answer:
      "Two reductions apply only to bosses: a level-difference modifier based on datamined defense ratings (fighting above your level cuts damage hard), and the boss's defense (PDR), which removes a share of your damage unless you stack Def Ignore Rate. Expand 'Boss damage breakdown' in the results card to see each stage.",
  },
  {
    question: "Should I prioritize Critical Rate or Critical Damage?",
    answer:
      "They scale off each other: Critical Damage does nothing without Critical Rate, and vice versa. Crits also roll a random 0–50% bonus on top of your Crit Damage — the calculator shows the min, midpoint and max of that roll. Compare your average hit before and after a stat change to decide.",
  },
  {
    question: "How does Def Ignore Rate (IED) work?",
    answer:
      "Def Ignore Rate shrinks the damage reduction from a boss's defense (PDR). Sources stack multiplicatively, not additively: your stat window DIR, Node IED (+15% once the skill's node reaches Lv 40) and Defense Smash 4 (+25%) combine as 1 − (1−a)(1−b)(1−c).",
  },
  {
    question: "Do food buffs stack in MapleStory M?",
    answer:
      "Regular food buffs are mutually exclusive per effect — eating a second food of the same stat replaces the first, though different stats combine. A few special items (Boss Rush Boost Potion, Noodle Soup With Mushroom, Stir-Fried Pork, Escargot, Cold Jellyfish Salad) stack with the regular buff and each other. The Food section models exactly this.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: `${SITE_NAME} — MapleStory M Damage Calculator`,
      url: SITE_URL,
      applicationCategory: "GameApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="font-display text-3xl text-ink [text-shadow:0_2px_0_rgba(67,48,31,0.15)] sm:text-4xl">
        MapleStory M Damage Calculator
      </h1>
      <p className="mt-2 max-w-2xl font-semibold text-ink-soft">
        Enter your stats from the in-game stat window to see your mob and
        boss damage side by side — normal, critical and average per hit,
        with the level penalty, boss defense and food buffs factored in.
        Test a stat change before you spend mesos; your inputs are saved in
        your browser.
      </p>

      <div className="mt-8">
        <DamageCalculator />
      </div>

      <AdSlot slot="homepage-below-calculator" className="mt-8" />

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
