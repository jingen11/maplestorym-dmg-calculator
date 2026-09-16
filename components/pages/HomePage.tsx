import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import DamageCalculator from "@/components/DamageCalculator";
import {
  getDictionary,
  getTerms,
  localePath,
  type Locale,
} from "@/lib/i18n";
import { absoluteUrl } from "@/lib/i18n/site";
import { SITE_NAME } from "@/lib/site";

export default function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const terms = getTerms(locale);
  const { faq } = dict.home;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: `${SITE_NAME} — ${dict.home.h1}`,
        url: absoluteUrl(localePath(locale)),
        inLanguage: locale,
        applicationCategory: "GameApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
        {dict.home.h1}
      </h1>
      <p className="mt-2 max-w-2xl font-semibold text-ink-soft">
        {dict.home.intro}
      </p>

      <div className="mt-8">
        <DamageCalculator dict={dict.damage} terms={terms} />
      </div>

      <AdSlot slot="homepage-below-calculator" className="mt-8" />

      <section className="window mt-10 max-w-2xl">
        <h2 className="window-title text-base">{dict.common.moreTools}</h2>
        <div className="p-4">
          <Link
            href={localePath(locale, "flames")}
            className="text-sm font-bold text-maple-deep underline underline-offset-2 hover:text-maple"
          >
            {dict.home.flamesLink}
          </Link>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            {dict.home.flamesBlurb}
          </p>
          <Link
            href={localePath(locale, "cubes")}
            className="mt-4 block text-sm font-bold text-maple-deep underline underline-offset-2 hover:text-maple"
          >
            {dict.home.cubesLink}
          </Link>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            {dict.home.cubesBlurb}
          </p>
          <Link
            href={localePath(locale, "starforce")}
            className="mt-4 block text-sm font-bold text-maple-deep underline underline-offset-2 hover:text-maple"
          >
            {dict.home.starforceLink}
          </Link>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            {dict.home.starforceBlurb}
          </p>
        </div>
      </section>

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
