import type { Locale } from "@/i18n/config";
import { isLocale, defaultLocale } from "@/i18n/config";

export type PageKey = "home" | "fleet" | "coverage" | "contact";

// Map a logical page to its path segment (home is the locale root).
const segments: Record<PageKey, string> = {
  home: "",
  fleet: "fleet",
  coverage: "coverage",
  contact: "contact",
};

export const pages: PageKey[] = ["home", "coverage", "fleet", "contact"];

/** Build the href for a page in a given locale, e.g. ("ar","fleet") → /ar/fleet */
export function pageHref(locale: Locale, page: PageKey): string {
  const seg = segments[page];
  return seg ? `/${locale}/${seg}` : `/${locale}`;
}

/** Replace the locale segment of the current path, preserving the rest. */
export function swapLocale(pathname: string, nextLocale: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${nextLocale}`;
  if (isLocale(parts[0])) {
    parts[0] = nextLocale;
  } else {
    parts.unshift(nextLocale);
  }
  return "/" + parts.join("/");
}

/** Which page does this pathname correspond to? */
export function activePage(pathname: string): PageKey {
  const parts = pathname.split("/").filter(Boolean);
  const tail = isLocale(parts[0]) ? parts[1] : parts[0];
  const match = (Object.keys(segments) as PageKey[]).find(
    (k) => segments[k] === (tail ?? ""),
  );
  return match ?? "home";
}

/** Extract the locale from a pathname, falling back to the default. */
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : defaultLocale;
}
