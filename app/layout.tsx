import type { Metadata } from "next";
import Link from "next/link";
import { Lilita_One, Nunito, Press_Start_2P } from "next/font/google";
import { LogoLeafSprite } from "@/components/PixelSprites";
import {
  SPREADSHEET_CREDITS,
  SPREADSHEET_LAST_UPDATED,
  SPREADSHEET_NAME,
} from "@/lib/credits";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel-2p",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — MapleStory M Damage Calculator`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "MapleStory M",
    "damage calculator",
    "MapleStory M calculator",
    "MSM damage",
    "boss damage",
    "critical damage",
    "MapleStory Mobile",
    "IED",
    "def ignore rate",
    "boss PDR",
    "level modifier",
    "food buffs",
    "MSM boss damage calculator",
    "rebirth flame",
    "MapleStory M flames",
    "flame probabilities",
    "flame odds",
    "eternal rebirth flame",
    "MSM flame calculator",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — MapleStory M Damage Calculator`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — MapleStory M Damage Calculator`,
    description: SITE_DESCRIPTION,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lilita.variable} ${nunito.variable} ${pixel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b-[3px] border-wood bg-panel">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-xl text-maple [text-shadow:0_2px_0_rgba(67,48,31,0.2)]"
            >
              <LogoLeafSprite className="h-7 w-7" />
              {SITE_NAME}
            </Link>
            <div className="flex gap-4 text-sm font-bold text-ink">
              <Link href="/" className="hover:text-maple">
                Damage
              </Link>
              <Link href="/flames" className="hover:text-maple">
                Flames
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
          {children}
        </main>
        <footer className="border-t-[3px] border-wood bg-panel py-5 text-center text-xs text-ink-soft">
          <div className="mx-auto max-w-2xl space-y-3 px-4">
            <p>
              Based on the community &ldquo;{SPREADSHEET_NAME}&rdquo;
              spreadsheet (last updated {SPREADSHEET_LAST_UPDATED}). Credits:
            </p>
            <p className="leading-relaxed">
              {SPREADSHEET_CREDITS.map((credit, i) => (
                <span key={credit.name}>
                  {i > 0 && " · "}
                  <span className="font-bold text-ink">{credit.name}</span>{" "}
                  ({credit.contribution.toLowerCase()})
                </span>
              ))}
            </p>
            <p>
              {SITE_NAME} is a fan-made tool and is not affiliated with
              Nexon. MapleStory M is a trademark of Nexon Co., Ltd.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
