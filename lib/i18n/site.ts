// Metadata shared by every localized page: absolute URLs, canonical +
// hreflang alternates, and the OpenGraph locale.

import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  languageAlternates,
  localePath,
  LOCALE_META,
  LOCALES,
  type Locale,
  type Route,
} from "./config";

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

/** OpenGraph wants an underscore locale (zh_CN), not the hreflang tag. */
const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  th: "th_TH",
  zh: "zh_CN",
  vi: "vi_VN",
};

interface PageMetaOptions {
  locale: Locale;
  route: Route;
  title: string;
  description: string;
  keywords?: string[];
  /** Home uses the site-wide "website" type; the tool pages are articles. */
  ogType?: "website" | "article";
}

export function pageMetadata({
  locale,
  route,
  title,
  description,
  keywords,
  ogType = "article",
}: PageMetaOptions): Metadata {
  const url = absoluteUrl(localePath(locale, route));
  const fullTitle = route === "" ? `${SITE_NAME} — ${title}` : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: localePath(locale, route),
      languages: languageAlternates(route),
    },
    openGraph: {
      type: ogType,
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => OG_LOCALE[l],
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export { LOCALE_META };
