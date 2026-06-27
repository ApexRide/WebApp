# Apex Ride

A production-ready marketing & fare-estimate website for a licensed UK
private-hire (taxi) operator, built with **Next.js 14 (App Router)** and
**TypeScript**. Rebuilt from the Figma HTML export (`Volt Cabs.html`).

## Highlights

- ⚡ **Instant fare estimator** — pick-up/drop-off, passengers, return trip and
  vehicle tier, priced live from distance × configurable rates.
- 🌍 **Four languages** (English, Français, Deutsch, العربية) with full **RTL**
  support for Arabic, path-based locales and `hreflang` alternates.
- 🌗 **Light / dark theme** with system-preference detection and no flash on load.
- 🔍 **Top-tier SEO** — per-locale metadata, canonical + hreflang, `sitemap.xml`,
  `robots.txt`, JSON-LD structured data, OpenGraph/Twitter cards, PWA manifest,
  favicons.
- ♿ **Accessible & fast** — semantic HTML, skip link, focus styles, reduced-motion
  support, self-hosted fonts, statically prerendered pages.
- 🛠 **Env-driven content** — company name, contact details and fares all live in
  environment variables, so non-developers can update them without touching code.

## Quick start

```bash
cp .env.example .env.local      # set NEXT_PUBLIC_SITE_URL for your deployment
npm install
npm run dev                     # http://localhost:3000  (redirects to /en)
```

Production:

```bash
npm run build
npm run start
```

## Configuration

Business constants live in **`src/config/site.json`** — plain public data you can
edit without touching code. Sections:

| Section | Purpose |
| --- | --- |
| `url` | Canonical production origin (canonical URLs, sitemap, OG tags) |
| `brand` | `brandName`, `companyName`, `legalName`, `foundingYear` |
| `contact` | Phone, email, address, city/postcode/country, lat/lng |
| `social` | Profile links (used in JSON-LD `sameAs`) + `twitterHandle` |
| `defaults` | `theme` (system/light/dark), `lang` (en/fr/de/ar), `showCityMarquee` |
| `currency` | Code + symbol |
| `fares` | Per-tier `base` / `perMile` / `seats`, plus `roadFactor` & `avgSpeedMph` |

It's read through the typed accessor `src/config/site.ts` (`siteConfig`), which
is safe to import from both server and client components.

**Environment variables** are reserved for environment-specific or sensitive
values (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Where *this* deployment is hosted — overrides `url` in `site.json` (e.g. preview/staging). Falls back to `site.json` if unset. |

> Secrets (API keys, booking tokens, analytics IDs) belong in env, never in
> `site.json`. Variables **without** the `NEXT_PUBLIC_` prefix stay server-side.
> After changing `site.json` or env values, rebuild.

## Project layout & deeper docs

See **[AGENTS.md](./AGENTS.md)** for the full architecture, file map, conventions,
and step-by-step recipes (add a city, add a language, swap in real photos, etc.).

## Notes

- The contact form and “Book” action are front-end demos (they show a
  confirmation toast). Wire them to your booking/CRM backend when ready.
- Imagery uses themed placeholders (`ImageSlot`); replace with `next/image` and
  real assets — every slot already carries descriptive alt text.
