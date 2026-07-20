// Ad configuration. To go live with AdSense later:
// 1. Set ADSENSE_CLIENT_ID to your publisher id (ca-pub-XXXXXXXXXXXXXXXX).
// 2. Flip ADS_ENABLED to true.
// 3. Add the AdSense loader to app/layout.tsx inside <body>:
//      <Script
//        async
//        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
//        crossOrigin="anonymous"
//      />
//    (import Script from "next/script")
// 4. Create ad units in AdSense and pass their slot ids to <AdSlot slot="..." />.

export const ADS_ENABLED = false;
export const ADSENSE_CLIENT_ID = "ca-pub-0000000000000000";
