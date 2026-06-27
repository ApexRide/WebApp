import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales, localeHreflang, defaultLocale } from "@/i18n/config";
import { pages, pageHref } from "@/lib/routes";

// One entry per locale × page, each carrying hreflang alternates so search
// engines understand the localised variants. ~16 URLs total.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (path: string) => `${siteConfig.url}${path}`;

  return locales.flatMap((locale) =>
    pages.map((page) => {
      const languages: Record<string, string> = {};
      for (const l of locales) languages[localeHreflang[l]] = abs(pageHref(l, page));
      languages["x-default"] = abs(pageHref(defaultLocale, page));

      return {
        url: abs(pageHref(locale, page)),
        lastModified: now,
        changeFrequency: page === "home" ? ("weekly" as const) : ("monthly" as const),
        priority: page === "home" ? 1 : 0.8,
        alternates: { languages },
      };
    }),
  );
}
