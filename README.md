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
cp .env.example .env.local      # then edit the values
npm install
npm run dev                     # http://localhost:3000  (redirects to /en)
```

Production:

```bash
npm run build
npm run start
```

## Configuration

Everything you’ll routinely change is in `.env.local` (see `.env.example` for the
full annotated list):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin — used for canonical URLs, sitemap and OG tags |
| `NEXT_PUBLIC_COMPANY_NAME`, `NEXT_PUBLIC_BRAND_NAME`, `NEXT_PUBLIC_LEGAL_NAME` | Identity |
| `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_OFFICE_*` | Contact details |
| `NEXT_PUBLIC_SOCIAL_*` | Social profile links (used in JSON-LD `sameAs`) |
| `NEXT_PUBLIC_RATE_<TIER>_BASE` / `_PER_MILE` / `_SEATS` | Fares per vehicle tier |
| `NEXT_PUBLIC_ROAD_FACTOR`, `NEXT_PUBLIC_AVG_SPEED_MPH` | Estimate tuning |
| `NEXT_PUBLIC_DEFAULT_THEME`, `NEXT_PUBLIC_DEFAULT_LANG` | Defaults |

> `NEXT_PUBLIC_*` values are inlined into the client bundle. That’s intentional —
> this is all public marketing information. After changing env values, rebuild.

## Project layout & deeper docs

See **[AGENTS.md](./AGENTS.md)** for the full architecture, file map, conventions,
and step-by-step recipes (add a city, add a language, swap in real photos, etc.).

## Notes

- The contact form and “Book” action are front-end demos (they show a
  confirmation toast). Wire them to your booking/CRM backend when ready.
- Imagery uses themed placeholders (`ImageSlot`); replace with `next/image` and
  real assets — every slot already carries descriptive alt text.
