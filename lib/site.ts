// Central site config. The site description is per-locale and lives in
// lib/i18n/dict/*.ts under `site.description`.
export const SITE_URL = "https://maplestorym.com";
export const SITE_NAME = "MapleStory M Toolbox";

/* Cloudflare Web Analytics site token. Not a secret — it ships in the public
   HTML and only identifies which dashboard to report into — so it lives here
   rather than in deploy config, and production builds need no extra env.
   NEXT_PUBLIC_CF_BEACON_TOKEN overrides it for a separate dashboard; `next
   dev` omits the beacon entirely so local work stays out of the stats. */
const CF_BEACON_TOKEN_DEFAULT = "be3420cb0bc6474a9f543d37bdff2159";

export const CF_BEACON_TOKEN =
  process.env.NODE_ENV === "development"
    ? ""
    : (process.env.NEXT_PUBLIC_CF_BEACON_TOKEN ?? CF_BEACON_TOKEN_DEFAULT);