// Locale registry.
//
// The locale is the *last* path segment, so the tool keeps its own URL and
// each translation hangs off it:
//
//   /            /flames/            /cubes/            English
//   /th/         /flames/th/         /cubes/th/         Thai
//   /zh/         /flames/zh/         /cubes/zh/         Simplified Chinese
//   /vi/         /flames/vi/         /cubes/vi/         Vietnamese
//   /id/         /flames/id/         /cubes/id/         Indonesian
//
// English is unprefixed and keeps the exact URLs the site already has
// indexed — nothing moves, the other locales are purely additive. Every
// page is prerendered per locale and carries canonical + hreflang.
//
// This shape is why the routes live under a single optional catch-all
// (app/[[...slug]]): the locale sits below the route, but <html lang> can
// only be set in a root layout, so the root layout has to be the one that
// sees it.

export const LOCALES = ["en", "th", "zh", "vi", "id"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export interface LocaleMeta {
  /** BCP-47 tag for <html lang> and hreflang — not always the URL segment. */
  hreflang: string;
  /** Name of the language written in that language, for the switcher. */
  label: string;
  /** Short label for the compact (mobile) switcher. */
  short: string;
  /** Browser language prefixes that should resolve to this locale. */
  match: string[];
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { hreflang: "en", label: "English", short: "EN", match: ["en"] },
  th: { hreflang: "th", label: "ไทย", short: "ไทย", match: ["th"] },
  zh: {
    hreflang: "zh-Hans",
    label: "简体中文",
    short: "中文",
    match: ["zh-cn", "zh-sg", "zh-hans", "zh"],
  },
  vi: { hreflang: "vi", label: "Tiếng Việt", short: "VI", match: ["vi"] },
  // "in" is the legacy ISO 639 code some browsers still send for Indonesian.
  id: {
    hreflang: "id",
    label: "Bahasa Indonesia",
    short: "ID",
    match: ["id", "in"],
  },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** The three tool routes, without locale prefix or slashes. */
export const ROUTES = ["", "flames", "cubes"] as const;

export type Route = (typeof ROUTES)[number];

/**
 * Canonical path for a route in a locale, with the trailing slash
 * next.config expects — so hrefs, canonicals, hreflang and the sitemap all
 * agree on one shape. English is unprefixed; every other locale is the
 * final segment.
 */
export function localePath(locale: Locale, route: Route = ""): string {
  const segments = [route, locale === DEFAULT_LOCALE ? "" : locale].filter(
    Boolean,
  );
  return segments.length ? `/${segments.join("/")}/` : "/";
}

/**
 * The catch-all params Next builds a page at — the inverse of localePath.
 * `[]` is the English home, i.e. `/`.
 */
export function routeSlug(locale: Locale, route: Route = ""): string[] {
  return [route, locale === DEFAULT_LOCALE ? "" : locale].filter(Boolean);
}

/**
 * Reads a catch-all slug back into a route + locale.
 *
 * Locale codes and route names never collide (th/zh/vi/id vs flames/cubes),
 * so a single leading segment is unambiguous: `["flames"]` is the English
 * flames page, `["th"]` is the Thai home.
 */
export function parseSlug(slug: string[] | undefined): {
  route: Route;
  locale: Locale;
} | null {
  const segments = slug ?? [];
  if (segments.length > 2) return null;

  const isRoute = (value: string): value is Route =>
    (ROUTES as readonly string[]).includes(value) && value !== "";

  const [first, second] = segments;

  if (second !== undefined) {
    if (!isRoute(first) || !isLocale(second) || second === DEFAULT_LOCALE) {
      return null;
    }
    return { route: first, locale: second };
  }

  if (first === undefined) return { route: "", locale: DEFAULT_LOCALE };
  if (isRoute(first)) return { route: first, locale: DEFAULT_LOCALE };
  // English is unprefixed, so a bare `/en/` is not a real URL
  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    return { route: "", locale: first };
  }
  return null;
}

/** hreflang → URL map for a route, with x-default pointing at English. */
export function languageAlternates(route: Route): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of LOCALES) {
    map[LOCALE_META[locale].hreflang] = localePath(locale, route);
  }
  map["x-default"] = localePath(DEFAULT_LOCALE, route);
  return map;
}
