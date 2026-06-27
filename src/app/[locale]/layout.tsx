import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { fontVariables } from "@/app/fonts";
import { AppProvider, ThemeScript } from "@/components/providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, isLocale, dir as dirFor, localeHreflang, type Locale } from "@/i18n/config";

// Only the known locales are valid; any other [locale] value 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale;
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.companyName} — ${dict.meta.title}`,
      template: `%s · ${siteConfig.companyName}`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: siteConfig.companyName,
    authors: [{ name: siteConfig.legalName }],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
    manifest: "/manifest.webmanifest",
    formatDetection: { telephone: true, address: true, email: true },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [localeHreflang[l], `/${l}`])),
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#13100e" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <html lang={localeHreflang[locale]} dir={dirFor(locale)} className={fontVariables} suppressHydrationWarning>
      <body>
        <ThemeScript defaultTheme={siteConfig.defaults.theme} />
        <AppProvider locale={locale} dict={dict} defaultTheme={siteConfig.defaults.theme}>
          <a href="#top" className="vc-skip-link">
            {dict.nav.home}
          </a>
          <Header />
          <main id="top">{children}</main>
          <Footer dict={dict} locale={locale} />
        </AppProvider>
        <StructuredData locale={locale} />
      </body>
    </html>
  );
}
