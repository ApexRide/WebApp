// Locale configuration. The site ships in four languages; Arabic is RTL.
export const locales = ["en", "fr", "de", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale =
  (process.env.NEXT_PUBLIC_DEFAULT_LANG as Locale) || "en";

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
