import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { Fleet } from "@/components/sections/Fleet";
import { Cta } from "@/components/sections/Cta";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return buildMetadata({
    locale: params.locale,
    page: "fleet",
    title: dict.fleet.title,
    description: dict.fleet.sub,
  });
}

export default function FleetPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  return (
    <>
      <Fleet dict={dict} locale={locale} />
      <Cta dict={dict} locale={locale} />
    </>
  );
}
