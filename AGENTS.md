# AGENTS.md

Guidance for AI agents and developers working in this repository. Read this
before making changes.

## What this is

**Apex Ride** — a marketing + fare-estimate site for a licensed UK private-hire
(taxi) operator. It was rebuilt from a Figma HTML export (`Volt Cabs.html`, kept
at the repo root as the original design reference) into a production Next.js app.

Single source of truth for everything a non-developer changes (company name,
contact details, fares, social links) is **`src/config/site.json`**, read
through the typed `src/config/site.ts` accessor. Environment variables are
reserved for environment-specific/sensitive values (only `NEXT_PUBLIC_SITE_URL`
today) — see `.env.example`.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript** (strict).
- No CSS framework. Styling is CSS custom properties (`src/app/globals.css`) +
  inline style objects, faithfully ported from the original design.
- Fonts self-hosted via `next/font/google` (`src/app/fonts.ts`).
- No database, no backend. The contact form and "book" button are client-side
  demos (they show a toast); wire them to a real endpoint when needed.

## Commands

```bash
npm install        # install deps
npm run dev        # dev server (http://localhost:3000 → redirects to /en)
npm run build      # production build (also generates OG image + fonts)
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

Always run `npm run build` before claiming a change works — the build is what
catches Satori/OG-image issues and metadata problems that `dev` does not.

## Project structure

```
src/
  app/
    [locale]/              # locale-segmented routes — THIS is the root layout
      layout.tsx           #   <html lang dir>, metadata, providers, header/footer, JSON-LD
      page.tsx             #   home (hero + calculator, marquee, band, how, reviews, cta)
      fleet/page.tsx
      coverage/page.tsx
      contact/page.tsx
      not-found.tsx
    globals.css            # theme tokens, RTL font swap, animations, a11y
    fonts.ts               # next/font definitions
    sitemap.ts             # ~16 URLs (locale × page) with hreflang alternates
    robots.ts
    manifest.ts
    icon.svg               # favicon (static)
    apple-icon.tsx         # generated 180×180 PNG
    opengraph-image.tsx    # generated 1200×630 social card
  components/
    providers.tsx          # AppProvider (locale/dict/theme context) + ThemeScript (no-flash)
    Header.tsx             # nav, language pills, theme toggle  (client)
    Calculator.tsx         # the fare estimator                 (client)
    Toast.tsx, Logo.tsx, ImageSlot.tsx, StructuredData.tsx
    sections/              # Hero, Marquee, Band, HowItWorks, Fleet, Coverage,
                           # Reviews, Cta, Contact, Footer, SectionHeading
  config/
    site.json              # business constants: brand, contact, social, fares…
    site.ts                # site.json (+ NEXT_PUBLIC_SITE_URL) → typed siteConfig
  i18n/
    config.ts              # locales, default, RTL, hreflang tags
    dictionaries.ts        # ALL translatable copy (en/fr/de/ar)
  lib/
    cities.ts              # served cities + localised names + coordinates
    fare.ts                # haversine distance, fare math, Arabic digits
    routes.ts              # page <-> path helpers, locale swapping
    seo.ts                 # per-page metadata + hreflang builder
  middleware.ts            # redirects "/" and locale-less paths (Accept-Language aware)
```

## How to make common changes

- **Company name / phone / email / address / social links** → edit
  `src/config/site.json` (`brand`, `contact`, `social`). Consumed via
  `src/config/site.ts`. Contact details are intentionally *not* in the
  translation files — they are data, read from JSON in every language (phone
  digits are converted to Arabic-Indic for `ar`).
- **Fares / rates** → `fares` in `src/config/site.json`. The estimate is
  `base + perMile × miles`. `roadFactor` scales straight-line distance to
  approximate driving distance; `avgSpeedMph` drives the ETA.
- **Site URL per environment** → `NEXT_PUBLIC_SITE_URL` in `.env.local`
  (overrides `url` in `site.json`). Genuine secrets also go in env, never JSON.
- **Add/remove a served city** → `src/lib/cities.ts` (id, lat/lng, names per
  locale). It automatically appears in the calculator, marquee, coverage list,
  and structured data.
- **Change wording / add a translation** → `src/i18n/dictionaries.ts`. Every
  locale must implement the `Dictionary` interface (TypeScript enforces it).
- **Add a language** → add the code to `locales` in `src/i18n/config.ts`, add its
  `localeNames`/`localeLabels`/`localeHreflang` entries (and `rtlLocales` if
  RTL), then add a full dictionary entry. Routing, sitemap, hreflang, and the
  language switcher pick it up automatically.
- **Add a page** → add a `PageKey` + path segment in `src/lib/routes.ts`, create
  `src/app/[locale]/<seg>/page.tsx` with a `generateMetadata` using
  `buildMetadata(...)`. It will be included in the sitemap automatically.
- **Real images** → replace `<ImageSlot>` (`src/components/ImageSlot.tsx`) usages
  with `next/image`. The slots currently render themed placeholders with the
  intended subject as their `hint`/alt text. Search for `ImageSlot` to find them.

## Conventions / gotchas

- **`[locale]/layout.tsx` is the root layout.** There is no `app/layout.tsx`.
  It owns `<html>`/`<body>`. `dynamicParams = false` makes unknown locales 404.
- **Server vs client.** Section components are server components and receive
  `dict`/`locale` as props. Only `Header`, `Calculator`, and `Contact` are client
  components; they read context via `useApp()`. Don't call `useApp()` from a
  server component.
- **Theming.** `data-theme` (`light`/`dark`) is set on `<html>`. `ThemeScript`
  applies the saved/preferred theme before paint to avoid flashes; `AppProvider`
  persists toggles to `localStorage`. CSS variables live in `globals.css`.
- **RTL.** `dir="rtl"` (Arabic) swaps the font pairing via CSS and the layout
  uses logical properties (`inset-inline-*`, `padding-inline`) so it mirrors
  correctly. Keep using logical properties, not `left`/`right`.
- **OG image is rendered by Satori** (`next/og`). Every `<div>` with more than one
  child needs an explicit `display`, and it can't fetch arbitrary glyph fonts at
  build time — keep `opengraph-image.tsx` to plain Latin text and flex layouts.
- **Middleware matcher** explicitly excludes the extensionless metadata routes
  (`opengraph-image`, `apple-icon`, `icon`, …). If you add another extensionless
  top-level route, add it to the matcher or it will be redirected to `/<locale>/…`.

## SEO checklist (already implemented — keep it working)

- Per-locale `<title>`/description, canonical + `hreflang` alternates (+ `x-default`).
- `sitemap.xml` with per-URL language alternates; `robots.txt`; PWA `manifest`.
- JSON-LD (`TaxiService`/`LocalBusiness` + `WebSite` + `Service` with fare offers).
- OpenGraph + Twitter card images, favicon + apple-touch icon, theme-color.
- Semantic landmarks, skip link, focus-visible styles, reduced-motion support.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the deployment origin (used for canonical/sitemap/
OG absolute URLs; it overrides `url` in `site.json`), confirm the constants in
`src/config/site.json`, then `npm run build && npm run start` (or deploy to any
Next.js host, e.g. Vercel).
