import type { Metadata } from "next";
import Link from "next/link";
import {
  Lilita_One,
  Noto_Sans_SC,
  Noto_Sans_Thai,
  Nunito,
  Press_Start_2P,
} from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { LogoLeafSprite } from "@/components/PixelSprites";
import { SPREADSHEET_CREDITS, SPREADSHEET_NAME } from "@/lib/credits";
import {
  fill,
  getDictionary,
  DEFAULT_LOCALE,
  languageAlternates,
  localePath,
  LOCALES,
  LOCALE_META,
  parseSlug,
  ROUTES,
  routeSlug,
} from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "../globals.css";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-lilita",
});

const nunito = Nunito({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-nunito",
});

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel-2p",
});

/* Lilita One and Nunito have no Thai or Han glyphs. These carry the body
   text for those locales — `preload: false` because only one locale's pages
   ever reference them, and the Han face in particular is far too heavy to
   preload on every page. globals.css picks them up per `html[lang]`. */
const notoThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-thai",
  preload: false,
});

const notoSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sc",
  preload: false,
});

/* Every (route, locale) pair the site has. This is the only place routes
   are enumerated for the build; parseSlug reads the result back. */
/* Only reachable if a hand-typed URL slips past generateStaticParams —
   with `output: export` nothing else is ever built. */
const FALLBACK = { route: "" as const, locale: DEFAULT_LOCALE };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({ slug: routeSlug(locale, route) })),
  );
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = parseSlug(slug) ?? FALLBACK;
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — ${dict.home.metaTitle}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: dict.site.description,
    alternates: {
      canonical: localePath(locale),
      languages: languageAlternates(""),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[[...slug]]">) {
  const { slug } = await params;
  const { locale } = parseSlug(slug) ?? FALLBACK;
  const dict = getDictionary(locale);

  return (
    <html
      lang={LOCALE_META[locale].hreflang}
      className={`${lilita.variable} ${nunito.variable} ${pixel.variable} ${notoThai.variable} ${notoSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <header className="border-b-[3px] border-wood bg-panel">
          <nav className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
            <Link
              href={localePath(locale)}
              className="flex shrink-0 items-center gap-2 font-display text-xl text-maple [text-shadow:0_2px_0_rgba(67,48,31,0.2)]"
            >
              <LogoLeafSprite className="h-7 w-7" />
              {SITE_NAME}
            </Link>
            <div className="flex items-center gap-3 text-sm font-bold text-ink sm:gap-4">
              <Link href={localePath(locale)} className="hover:text-maple">
                {dict.nav.damage}
              </Link>
              <Link
                href={localePath(locale, "flames")}
                className="hover:text-maple"
              >
                {dict.nav.flames}
              </Link>
              <Link
                href={localePath(locale, "cubes")}
                className="hover:text-maple"
              >
                {dict.nav.cubes}
              </Link>
              <LanguageSwitcher locale={locale} label={dict.nav.language} />
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
          {children}
        </main>
        <footer className="border-t-[3px] border-wood bg-panel py-5 text-center text-xs text-ink-soft">
          <div className="mx-auto max-w-2xl space-y-3 px-4">
            <p>
              {fill(dict.footer.basedOn, {
                name: SPREADSHEET_NAME,
                date: dict.footer.lastUpdated,
              })}
            </p>
            <p className="leading-relaxed">
              {SPREADSHEET_CREDITS.map((credit, i) => (
                <span key={credit.name}>
                  {i > 0 && " · "}
                  <span className="font-bold text-ink">{credit.name}</span>{" "}
                  ({dict.credits[credit.name]})
                </span>
              ))}
            </p>
            <p>{fill(dict.footer.disclaimer, { site: SITE_NAME })}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
