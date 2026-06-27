import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

// Pick the best-matching supported locale from the Accept-Language header.
function negotiateLocale(req: NextRequest): string {
  const header = req.headers.get("accept-language");
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Already prefixed with a supported locale — let it through.
  const first = pathname.split("/").filter(Boolean)[0];
  if (first && isLocale(first)) return NextResponse.next();

  // Redirect everything else (including "/") to the negotiated locale.
  const locale = negotiateLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except API routes, Next internals, the file-based
  // metadata routes (which are extensionless), and any path with a file
  // extension (sitemap.xml, robots.txt, manifest.webmanifest, icon.svg, …).
  matcher: [
    "/((?!api|_next/static|_next/image|opengraph-image|apple-icon|icon|favicon|sitemap|robots|manifest|.*\\..*).*)",
  ],
};
