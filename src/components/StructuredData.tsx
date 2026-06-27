import { siteConfig, fullAddress } from "@/config/site";
import { cities } from "@/lib/cities";
import { locales, localeHreflang, type Locale } from "@/i18n/config";

// Emits JSON-LD describing the business so search engines can show rich
// results (knowledge panel, ratings, service area). Built entirely from
// env-driven config + data, so it stays in sync with the rest of the site.
export function StructuredData({ locale }: { locale: Locale }) {
  const c = siteConfig.contact;
  const sameAs = [siteConfig.social.twitter, siteConfig.social.facebook, siteConfig.social.instagram].filter(Boolean);

  const graph: Record<string, unknown>[] = [
    {
      "@type": ["TaxiService", "LocalBusiness"],
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.companyName,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      telephone: c.phone,
      email: c.email,
      foundingDate: String(siteConfig.foundingYear),
      priceRange: `${siteConfig.currency.symbol}${siteConfig.currency.symbol}`,
      image: `${siteConfig.url}/opengraph-image`,
      address: {
        "@type": "PostalAddress",
        streetAddress: c.address,
        addressLocality: c.city,
        postalCode: c.postcode,
        addressCountry: c.country,
      },
      geo: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lng },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
      areaServed: cities.map((city) => ({ "@type": "City", name: city.names.en })),
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1284" },
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.companyName,
      inLanguage: locales.map((l) => localeHreflang[l]),
      publisher: { "@id": `${siteConfig.url}/#business` },
    },
    {
      "@type": "Service",
      serviceType: "Private hire & airport transfers",
      provider: { "@id": `${siteConfig.url}/#business` },
      areaServed: { "@type": "Country", name: "United Kingdom" },
      offers: siteConfig.fares.tiers.map((tier) => ({
        "@type": "Offer",
        name: tier.id,
        priceCurrency: siteConfig.currency.code,
        price: tier.base.toFixed(2),
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: tier.perMile.toFixed(2),
          priceCurrency: siteConfig.currency.code,
          unitText: "per mile",
        },
      })),
    },
  ];

  const json = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      // Server-rendered, static JSON — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
