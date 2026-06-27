// Locale configuration. The site ships in four languages; Arabic is RTL.
import siteData from "@/config/site.json";

export const locales = ["en", "fr", "de", "ar"] as const;

export type Locale = (typeof locales)[number];

// Default language comes from site.json (defaults.lang), with a safe fallback.
export const defaultLocale: Locale =
  (locales as readonly string[]).includes(siteData.defaults.lang)
    ? (siteData.defaults.lang as Locale)
    : "en";

// Human-readable names for the language switcher and hreflang tags.
export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
  ar: "العربية",
};

// Short labels shown in the in-header language pills.
export const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  de: "DE",
  ar: "ع",
};

// BCP-47 tags used for <html lang> and hreflang alternates.
export const localeHreflang: Record<Locale, string> = {
  en: "en-GB",
  fr: "fr-FR",
  de: "de-DE",
  ar: "ar",
};

export const rtlLocales: Locale[] = ["ar"];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function dir(locale: Locale): "rtl" | "ltr" {
  return isRtl(locale) ? "rtl" : "ltr";
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
