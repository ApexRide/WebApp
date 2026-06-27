import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Band } from "@/components/sections/Band";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reviews } from "@/components/sections/Reviews";
import { Cta } from "@/components/sections/Cta";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return buildMetadata({
    locale: params.locale,
    page: "home",
    title: `${siteConfig.companyName} — ${dict.meta.title}`,
    description: dict.meta.description,
  });
}

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} locale={locale} />
      {siteConfig.defaults.showCityMarquee && <Marquee locale={locale} />}
      <Band dict={dict} />
      <HowItWorks dict={dict} locale={locale} />
      <Reviews dict={dict} />
      <Cta dict={dict} locale={locale} />
    </>
  );
}
