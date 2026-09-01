# TODO

Short backlog of work that's been scoped but not built.

## Add `og:image` to every page

**Status:** not started. The site currently ships **no** `og:image` at all —
`pageMetadata` in `lib/i18n/site.ts` sets `openGraph.title/description/url` and
`twitter.card: "summary_large_image"`, but never an image. A `summary_large_image`
card with no image degrades to a bare text link.

**Why it matters:** Google doesn't use `og:image` for ranking or for the mobile
snippet, so this is not an SEO fix — the win is off-search. MapleStory M traffic
moves through Discord, Reddit and Facebook groups, and every share of these tools
in those places currently renders as an unillustrated link. That suppresses
click-through on exactly the channels that would otherwise seed organic links.

**What to build:**

- One image per route (damage / flames / cubes) at **1200×630**. The three pages
  should be visually distinguishable at thumbnail size — the existing pixel-art
  direction (`components/PixelSprites.tsx`, the maple/wood palette in
  `app/globals.css`) is the obvious source material.
- Include the page name in large type. Social thumbnails are often rendered at
  ~400px wide, so anything below ~40px in the source is unreadable.
- Wire into `pageMetadata` so `openGraph.images` and `twitter.images` are both
  set. `metadataBase` is already configured in the layout, so a root-relative
  path resolves to an absolute URL automatically.

**Constraint — read before choosing an approach:** `next.config.ts` sets
`output: "export"`. Next's `opengraph-image.tsx` file convention generates images
at request time via `ImageResponse`, which a static export cannot do. Either
pre-render the PNGs at build time and commit them under `app/`, or use the
static-file form of the convention (`opengraph-image.png` next to the route).
Check `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md`
for the current contract before starting — this Next version's conventions differ
from older ones.

**Locales:** there are 4 shipping locales (`en`, `th`, `zh`, `vi`) and `id` is
being added. Decide whether the card art is localized or one shared image per
route; shared is fine to start, since the card already carries a localized
`og:title` and `og:description`.
