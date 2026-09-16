import type { MetadataRoute } from "next";
import {
  languageAlternates,
  localePath,
  LOCALES,
  ROUTES,
  type Route,
} from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const PRIORITY: Record<Route, number> = {
  "": 1,
  flames: 0.8,
  cubes: 0.8,
  starforce: 0.8,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const absolute = (path: string) => `${SITE_URL}${path}`;

  /* One entry per locale per route, each carrying the full hreflang set.
     The URLs come from localePath, so they keep the trailing slash the
     export and the page canonicals use — and English stays unprefixed. */
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: absolute(localePath(locale, route)),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: PRIORITY[route],
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(route)).map(([tag, path]) => [
            tag,
            absolute(path),
          ]),
        ),
      },
    })),
  );
}
