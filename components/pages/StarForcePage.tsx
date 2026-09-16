import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import Emphasize from "@/components/Emphasize";
import StarForceCalculator from "@/components/StarForceCalculator";
import {
  compact,
  fill,
  getDictionary,
  localePath,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";
import { absoluteUrl } from "@/lib/i18n/site";
import { SITE_NAME } from "@/lib/site";
import {
  DEFAULT_OPTIONS,
  expectedPath,
  MAX_STAR,
  percentile,
  seededRng,
  simulatePath,
} from "@/lib/starforce";

/* The worked example and the FAQ figures are computed from the same table
   the calculator uses, so the prose can never drift from the tool. The
   simulated median is seeded so every build prints the same number. */
const EXAMPLE = { from: 10, to: 17 };

const figures = (() => {
  const full = expectedPath(0, MAX_STAR);
  const at = (star: number) => full[star - 1].cumulativeCost;
  const withMinigame = expectedPath(0, 20, { ...DEFAULT_OPTIONS, minigame: true });
  const to20mg = withMinigame[withMinigame.length - 1].cumulativeCost;

  const sim = simulatePath(0, 17, DEFAULT_OPTIONS, 2000, seededRng(17));
  const to17typical = percentile(sim[sim.length - 1].costs, 50);

  const path = expectedPath(EXAMPLE.from, EXAMPLE.to);
  const total = path[path.length - 1];
  const last = path[path.length - 1];
  return {
    to17: at(17),
    to18: at(18),
    to20: at(20),
    to20mg,
    mgSaving: Math.round((1 - to20mg / at(20)) * 100),
    to17typical,
    star21: full[20].expectedCost,
    example: {
      expected: total.cumulativeCost,
      taps: total.cumulativeAttempts,
      breaks: total.cumulativeBreaks,
      last: last.expectedCost,
      share: Math.round((last.expectedCost / total.cumulativeCost) * 100),
    },
  };
})();

function faqVars(t: Dictionary["starforce"]) {
  const f = (n: number) => compact(n, t.mesoUnits);
  return {
    to17: f(figures.to17),
    to18: f(figures.to18),
    to20: f(figures.to20),
    to20mg: f(figures.to20mg),
    mgSaving: figures.mgSaving,
    to17typical: f(figures.to17typical),
    star21: f(figures.star21),
    max: MAX_STAR,
  };
}

export default function StarForcePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.starforce;
  const url = absoluteUrl(localePath(locale, "starforce"));
  const format = (n: number) => compact(n, t.mesoUnits);
  const vars = faqVars(t);
  const faq = t.faq.map((item) => ({
    question: item.question,
    answer: fill(item.answer, vars),
  }));

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
        mainEntity: faq.map((item) => ({
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
        <StarForceCalculator dict={t} common={dict.common} />
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
                from: EXAMPLE.from,
                to: EXAMPLE.to,
                repair: format(DEFAULT_OPTIONS.repairCost),
              })}
            </p>
            <dl className="mt-3 space-y-2 text-xs">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-wood-light/40 pb-2">
                <dt className="text-ink-soft">{t.exampleExpected}</dt>
                <dd className="font-bold tabular-nums text-maple-deep">
                  {format(figures.example.expected)}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-wood-light/40 pb-2">
                <dt className="text-ink-soft">{t.exampleTaps}</dt>
                <dd className="font-bold tabular-nums text-ink">
                  {Math.round(figures.example.taps).toLocaleString()}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-wood-light/40 pb-2">
                <dt className="text-ink-soft">{t.exampleBreaks}</dt>
                <dd className="font-bold tabular-nums text-ink">
                  {figures.example.breaks.toLocaleString(undefined, {
                    maximumFractionDigits: 1,
                  })}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <dt className="text-ink-soft">{t.exampleLast}</dt>
                <dd className="font-bold tabular-nums text-ink">
                  {format(figures.example.last)}{" "}
                  <span className="text-maple-deep">
                    · {fill(t.exampleShare, { share: figures.example.share })}
                  </span>
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">
              {t.exampleGap}
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-ink">
              {dict.common.readingTheTable}
            </p>
            <ul className="mt-1 space-y-1.5 text-xs leading-relaxed text-ink-soft">
              <li>
                • <Emphasize text={t.readExpected} terms={[t.readExpectedTerm]} />
              </li>
              <li>
                •{" "}
                <Emphasize
                  text={t.readTypical}
                  terms={[t.readTypicalTerm, t.readTypicalTerm2]}
                />
              </li>
              {/* The emphasized terms are the toggle's own labels, so the
                  guide and the buttons can never drift apart in any locale. */}
              <li>
                •{" "}
                <Emphasize text={t.readLog} terms={[t.readLogTerm, t.readLogTerm2]} />
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold text-ink">
              {dict.common.beforeYouSpend}
            </p>
            <ul className="mt-1 space-y-1.5 text-xs leading-relaxed text-ink-soft">
              <li>• {t.spendDrops}</li>
              <li>• {t.spendBreak}</li>
              <li>• {t.spendTail}</li>
              <li>• {t.spendWall}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="window mt-10 max-w-2xl">
        <h2 className="window-title text-base">{dict.common.moreTools}</h2>
        <div className="space-y-4 p-4">
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
          <div>
            <Link
              href={localePath(locale, "flames")}
              className="text-sm font-bold text-maple-deep underline underline-offset-2 hover:text-maple"
            >
              {dict.home.flamesLink}
            </Link>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              {dict.home.flamesBlurb}
            </p>
          </div>
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
        </div>
      </section>

      <AdSlot slot="starforce-below-chart" className="mt-8" />

      <section className="window mt-10 max-w-2xl">
        <h2 className="window-title text-base">{dict.common.guide}</h2>
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
