import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import Emphasize from "@/components/Emphasize";
import FlameTable from "@/components/FlameTable";
import {
  atLeastOneChance,
  attemptsFor,
  getRolls,
  TWO_OPTION_CHANCE,
} from "@/lib/flames";
import {
  fill,
  flameOptionName,
  getDictionary,
  getTerms,
  localePath,
  partName,
  rankName,
  type Locale,
  type Terms,
} from "@/lib/i18n";
import { absoluteUrl } from "@/lib/i18n/site";
import { SITE_NAME } from "@/lib/site";

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

export default function FlamesPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const terms: Terms = getTerms(locale);
  const t = dict.flames;
  const url = absoluteUrl(localePath(locale, "flames"));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: `${SITE_NAME} — ${t.appName}`,
        url,
        inLanguage: locale,
        applicationCategory: "GameApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "HowTo",
        name: t.howToName,
        inLanguage: locale,
        description: t.howToDescription,
        step: t.steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.title,
          text: step.body,
          url: `${url}#step-${i + 1}`,
        })),
      },
      {
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: t.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="font-display text-3xl text-ink [text-shadow:0_2px_0_rgba(67,48,31,0.15)] sm:text-4xl">
        {t.h1}
      </h1>
      <p className="mt-2 max-w-2xl font-semibold text-ink-soft">{t.intro}</p>

      <div className="mt-8">
        <FlameTable dict={t} common={dict.common} terms={terms} />
      </div>

      <section className="window mt-10">
        <h2 className="window-title text-base">{dict.common.howToUse}</h2>
        <div className="space-y-5 p-4">
          <ol className="space-y-3">
            {t.steps.map((step, i) => (
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
            <p className="stage-label text-ink-soft">
              {dict.common.workedExample}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              {fill(t.exampleIntro, {
                slot: partName(terms, example.slot),
                rarity: rankName(terms, example.rarity),
                option: flameOptionName(terms, example.option),
              })}
            </p>
            <dl className="mt-3 space-y-2 text-xs">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-wood-light/40 pb-2">
                <dt className="text-ink-soft">
                  {fill(t.exampleBest, { value: example.bestValue })}
                </dt>
                <dd className="font-bold tabular-nums text-ink">
                  {fill(t.examplePerFlame, { chance: example.bestChance })}
                  <span className="text-maple-deep">
                    {fill(t.exampleFlames, {
                      count: example.bestAttempts ?? "—",
                    })}
                  </span>{" "}
                  {dict.common.forACoinFlip}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <dt className="text-ink-soft">
                  {fill(t.exampleAny, { count: example.count })}
                </dt>
                <dd className="font-bold tabular-nums text-ink">
                  {fill(t.examplePerFlame, { chance: example.anyChance })}
                  <span className="text-maple-deep">
                    {fill(t.exampleFlames, {
                      count: example.anyAttempts ?? "—",
                    })}
                  </span>{" "}
                  {dict.common.forACoinFlip}
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">
              {fill(t.exampleGap, {
                ratio: Math.round(
                  (example.bestAttempts ?? 0) / (example.anyAttempts || 1),
                ),
              })}
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-ink">
              {dict.common.readingTheTable}
            </p>
            <ul className="mt-1 space-y-1.5 text-xs leading-relaxed text-ink-soft">
              <li>
                • <Emphasize text={t.readAnyValue} terms={[t.readAnyValueTerm]} />
              </li>
              <li>
                • <Emphasize text={t.readGrades} terms={[t.readGradesTerm]} />
              </li>
              <li>
                •{" "}
                <Emphasize
                  text={t.readSlots}
                  terms={[t.readSlotsTerm, t.readSlotsTerm2]}
                />
              </li>
              {/* The emphasized terms are the toggle's own labels, so the
                  guide and the button can never drift apart in any locale. */}
              <li>
                •{" "}
                <Emphasize text={t.readModes} terms={[t.matchAny, t.matchAll]} />
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-ink">
              {dict.common.beforeYouSpend}
            </p>
            <ul className="mt-1 space-y-1.5 text-xs leading-relaxed text-ink-soft">
              <li>
                •{" "}
                {fill(t.spendPity, { count: example.bestAttempts ?? "—" })}
              </li>
              <li>
                •{" "}
                <Emphasize text={t.spendAny} terms={[t.matchAny, t.matchAll]} />
              </li>
              <li>• {t.spendStack}</li>
              <li>• {t.spendTier}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="window mt-10 max-w-2xl">
        <h2 className="window-title text-base">{dict.common.moreTools}</h2>
        <div className="space-y-4 p-4">
          <div>
            <Link
              href={localePath(locale, "cubes")}
              className="text-sm font-bold text-maple-deep underline underline-offset-2 hover:text-maple"
            >
              {dict.home.cubesLink}
            </Link>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              {dict.home.cubesBlurb}
            </p>
          </div>
          <div>
            <Link
              href={localePath(locale)}
              className="text-sm font-bold text-maple-deep underline underline-offset-2 hover:text-maple"
            >
              {dict.home.damageLink}
            </Link>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              {dict.home.damageBlurb}
            </p>
          </div>
        </div>
      </section>

      <AdSlot slot="flames-below-table" className="mt-8" />

      <section className="window mt-10 max-w-2xl">
        <h2 className="window-title text-base">{dict.common.guide}</h2>
        <dl className="space-y-3 p-4">
          {t.faq.map((item) => (
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
