import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import CubeTable from "@/components/CubeTable";
import Emphasize from "@/components/Emphasize";
import {
  cubeChance,
  cubesFor,
  getLines,
  lineKey,
  RANK_UP,
  selectedChance,
} from "@/lib/cubes";
import {
  cubeOptionName,
  fill,
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
  const picked = new Map([[lineKey(top), 1]]);
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

export default function CubesPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const terms: Terms = getTerms(locale);
  const t = dict.cubes;
  const url = absoluteUrl(localePath(locale, "cubes"));

  /* The rank-up FAQ quotes numbers computed above, so the answer can never
     contradict the table further down the page. */
  const faq = t.faq.map((item) => ({
    question: item.question,
    answer: fill(item.answer, {
      slow: example.rankUpSlow ?? "—",
      fast: example.rankUpFast ?? "—",
    }),
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
        <CubeTable dict={t} common={dict.common} terms={terms} />
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
                option: cubeOptionName(terms, example.option),
                value: example.value,
                rank: rankName(terms, example.rank),
                part: partName(terms, example.part),
              })}
            </p>
            <dl className="mt-3 space-y-2 text-xs">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-wood-light/40 pb-2">
                <dt className="text-ink-soft">{t.exampleOne}</dt>
                <dd className="font-bold tabular-nums text-ink">
                  {fill(t.examplePerCube, { chance: example.oneLine })}
                  <span className="text-maple-deep">
                    {fill(t.exampleCubes, {
                      count: example.oneAttempts ?? "—",
                    })}
                  </span>{" "}
                  {dict.common.forACoinFlip}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <dt className="text-ink-soft">{t.exampleThree}</dt>
                <dd className="font-bold tabular-nums text-ink">
                  {fill(t.examplePerCube, { chance: example.threeLine })}
                  <span className="text-maple-deep">
                    {fill(t.exampleCubes, {
                      count: example.threeAttempts ?? "—",
                    })}
                  </span>{" "}
                  {dict.common.forACoinFlip}
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
              <li>• {t.readHeaderRows}</li>
              <li>
                •{" "}
                <Emphasize
                  text={t.readPools}
                  terms={[t.readPoolsTerm, t.readPoolsTerm2]}
                />
              </li>
              <li>• {t.readPersist}</li>
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
              <li>• {t.spendSeparate}</li>
              <li>
                • {fill(t.spendPity, { count: example.rankUpFast ?? "—" })}
              </li>
              <li>
                •{" "}
                <Emphasize text={t.spendAny} terms={[t.matchAny, t.matchAll]} />
              </li>
              <li>• {t.spendStack}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="window mt-10 max-w-2xl">
        <h2 className="window-title text-base">{dict.common.moreTools}</h2>
        <div className="space-y-4 p-4">
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
              href={localePath(locale, "starforce")}
              className="text-sm font-bold text-maple-deep underline underline-offset-2 hover:text-maple"
            >
              {dict.home.starforceLink}
            </Link>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              {dict.home.starforceBlurb}
            </p>
          </div>
        </div>
      </section>

      <AdSlot slot="cubes-below-table" className="mt-8" />

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
