// Entry point for both server and client code.
//
// Dictionaries are imported statically rather than with dynamic import():
// the whole site is a static export, and the pages hand the dictionary to
// client components as a prop, so the bundler needs the module graph up
// front. Each locale's page bundle only pulls in the dictionary it uses.

import en, { type Dictionary } from "./dict/en";
import id from "./dict/id";
import th from "./dict/th";
import vi from "./dict/vi";
import zh from "./dict/zh";
import termsEn, { type Terms } from "./terms/en";
import termsId from "./terms/id";
import termsTh from "./terms/th";
import termsVi from "./terms/vi";
import termsZh from "./terms/zh";
import type { Locale } from "./config";

const DICTIONARIES: Record<Locale, Dictionary> = { en, th, zh, vi, id };
const TERMS: Record<Locale, Terms> = {
  en: termsEn,
  th: termsTh,
  zh: termsZh,
  vi: termsVi,
  id: termsId,
};

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export function getTerms(locale: Locale): Terms {
  return TERMS[locale];
}

export type { Dictionary, Terms };
export * from "./config";
export * from "./format";
export * from "./terms";
