import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { Coverage } from "@/components/sections/Coverage";
import { Cta } from "@/components/sections/Cta";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return buildMetadata({
    locale: params.locale,
    page: "coverage",
    title: dict.coverage.title,
    description: dict.coverage.sub,
  });
}

export default function CoveragePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  return (
    <>
      <Coverage dict={dict} locale={locale} />
      <Cta dict={dict} locale={locale} />
    </>
  );
}
