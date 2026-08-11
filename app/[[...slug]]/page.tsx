import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CubesPage from "@/components/pages/CubesPage";
import FlamesPage from "@/components/pages/FlamesPage";
import HomePage from "@/components/pages/HomePage";
import { getDictionary, parseSlug } from "@/lib/i18n";
import { pageMetadata } from "@/lib/i18n/site";

/* One catch-all route because the locale is the last path segment
   (/flames/th/) while <html lang> can only be set in a root layout — so the
   root layout has to be the segment that sees the locale. The layout owns
   generateStaticParams; this page just dispatches on what parseSlug reads
   back out of the slug. */

const KEYWORDS = {
  "": [
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
  ],
  flames: [
    "MapleStory M rebirth flame",
    "rebirth flame probabilities",
    "MSM flame odds",
    "eternal rebirth flame",
    "flame options",
    "MapleStory M flame calculator",
    "boss atk flame",
    "final damage flame",
    "two flame options at once",
  ],
  cubes: [
    "MapleStory M cube",
    "cube probabilities",
    "potential probabilities",
    "bonus potential",
    "MSM cube odds",
    "black cube",
    "red cube",
    "occult cube",
    "MapleStory M potential calculator",
    "two potential lines on one item",
  ],
};

export async function generateMetadata({
  params,
}: PageProps<"/[[...slug]]">): Promise<Metadata> {
  const parsed = parseSlug((await params).slug);
  if (!parsed) return {};

  const { route, locale } = parsed;
  const dict = getDictionary(locale);
  const page =
    route === "" ? dict.home : route === "flames" ? dict.flames : dict.cubes;

  return pageMetadata({
    locale,
    route,
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: KEYWORDS[route],
    ogType: route === "" ? "website" : "article",
  });
}

export default async function Page({ params }: PageProps<"/[[...slug]]">) {
  const parsed = parseSlug((await params).slug);
  if (!parsed) notFound();

  const { route, locale } = parsed;
  if (route === "flames") return <FlamesPage locale={locale} />;
  if (route === "cubes") return <CubesPage locale={locale} />;
  return <HomePage locale={locale} />;
}
