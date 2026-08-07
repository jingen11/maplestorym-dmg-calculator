import { CF_BEACON_TOKEN } from "@/lib/site";

/* Cloudflare Web Analytics: cookieless pageviews-per-route plus Core Web
   Vitals. The beacon patches history.pushState and listens for popstate, so
   Next's client-side navigation between /cubes/ and /flames/vi is counted
   as separate views — that internal traffic is invisible to Search Console,
   which only reports Google organic clicks.

   Rendered as a plain tag rather than next/script so it matches Cloudflare's
   published snippet exactly (including `type="module"`, which next/script
   does not emit) and ships in the prerendered HTML instead of waiting on
   hydration. */
export default function WebAnalytics() {
  if (!CF_BEACON_TOKEN) return null;

  return (
    <script
      type="module"
      /* No-op for module scripts, which already defer; silences
         @next/next/no-sync-scripts, which does not know that. */
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
    />
  );
}
