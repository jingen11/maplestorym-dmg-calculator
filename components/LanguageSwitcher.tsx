"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  localePath,
  LOCALES,
  LOCALE_META,
  parseSlug,
  type Locale,
  type Route,
} from "@/lib/i18n";

/**
 * Reads the route out of the current path so each language links to the
 * page the reader is actually on, not back to the home page.
 */
function currentRoute(pathname: string): Route {
  const segments = pathname.split("/").filter(Boolean);
  return parseSlug(segments)?.route ?? "";
}

export default function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const route = currentRoute(pathname);
  const ref = useRef<HTMLDetailsElement>(null);

  // A <details> dropdown works without JS (important on a static export),
  // so the only script here is the niceties: close on outside click and on
  // Escape, and close after a navigation.
  useEffect(() => {
    const close = () => ref.current?.removeAttribute("open");

    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);

  return (
    <details ref={ref} className="relative">
      <summary
        aria-label={label}
        className="flex list-none items-center gap-1 rounded-lg border-2 border-wood-light bg-panel-deep px-2 py-1 text-xs font-bold text-ink transition hover:border-wood [&::-webkit-details-marker]:hidden"
      >
        <GlobeIcon />
        <span>{LOCALE_META[locale].short}</span>
      </summary>
      <ul className="window absolute right-0 z-30 mt-2 min-w-[9rem] p-1 text-left">
        {LOCALES.map((option) => (
          <li key={option}>
            <Link
              href={localePath(option, route)}
              hrefLang={LOCALE_META[option].hreflang}
              aria-current={option === locale ? "true" : undefined}
              className={`block rounded-md px-3 py-1.5 text-xs font-bold transition ${
                option === locale
                  ? "bg-maple/15 text-maple-deep"
                  : "text-ink hover:bg-wood-light/15"
              }`}
            >
              {LOCALE_META[option].label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="8" cy="8" r="6" />
        <path d="M2 8h12M8 2c1.8 2 1.8 10 0 12M8 2C6.2 4 6.2 12 8 14" />
      </g>
    </svg>
  );
}
