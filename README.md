This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Analytics

Pageviews per route come from [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/)
(free, cookieless, no consent banner). Nothing to configure — the site token
lives in `lib/site.ts` and `npm run build` emits the beacon automatically.
The token is a public site identifier, not a secret; it ships in the HTML of
every page.

`npm run dev` omits the beacon entirely, so local work never lands in the
stats. To report into a different dashboard, override with
`NEXT_PUBLIC_CF_BEACON_TOKEN=<token> npm run build`.

The beacon tracks client-side route changes (it patches `history.pushState`),
so navigation between tools counts as separate views — the traffic Search
Console can't see, since it only reports Google organic clicks.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
