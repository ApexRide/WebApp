import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { Contact } from "@/components/sections/Contact";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return buildMetadata({
    locale: params.locale,
    page: "contact",
    title: dict.contact.title,
    description: dict.contact.sub,
  });
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  return <Contact />;
}
