import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { locales, localeHreflang, defaultLocale, type Locale } from "@/i18n/config";
import type { PageKey } from "@/lib/routes";
import { pageHref } from "@/lib/routes";

const absolute = (path: string) => `${siteConfig.url}${path}`;

/**
 * Canonical URL + hreflang alternates for a page across every locale.
 * Includes an x-default pointing at the default locale.
 */
export function alternatesFor(locale: Locale, page: PageKey): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeHreflang[l]] = absolute(pageHref(l, page));
  }
  languages["x-default"] = absolute(pageHref(defaultLocale, page));
  return {
    canonical: absolute(pageHref(locale, page)),
    languages,
  };
}

/** Shared OpenGraph/Twitter config for a page. */
export function buildMetadata({
  locale,
  page,
  title,
  description,
}: {
  locale: Locale;
  page: PageKey;
  title: string;
  description: string;
}): Metadata {
  const url = absolute(pageHref(locale, page));
  const ogLocaleMap: Record<Locale, string> = {
    en: "en_GB",
    fr: "fr_FR",
    de: "de_DE",
    ar: "ar_AR",
  };

  return {
    title,
    description,
    alternates: alternatesFor(locale, page),
    openGraph: {
      type: "website",
      siteName: siteConfig.companyName,
      title,
      description,
      url,
      locale: ogLocaleMap[locale],
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.companyName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.social.twitterHandle || undefined,
      images: ["/opengraph-image"],
    },
  };
}
