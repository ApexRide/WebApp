"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/components/providers";
import { Logo } from "@/components/Logo";
import { locales, localeLabels, localeNames, type Locale } from "@/i18n/config";
import { pages, pageHref, activePage, swapLocale, type PageKey } from "@/lib/routes";

export function Header() {
  const { locale, dict, theme, toggleTheme, mounted } = useApp();
  const pathname = usePathname();
  const current = activePage(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes (i.e. after navigation).
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLink = (p: PageKey, block = false) => {
    const on = current === p;
    return (
      <Link
        key={p}
        href={pageHref(locale, p)}
        aria-current={on ? "page" : undefined}
        onClick={() => setMenuOpen(false)}
        className="vc-soft"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: block ? "16px" : "14px",
          padding: block ? "13px 14px" : "8px 12px",
          borderRadius: block ? "12px" : "9px",
          textDecoration: "none",
          color: on ? "var(--accent)" : block ? "var(--ink)" : "var(--ink2)",
          display: block ? "block" : undefined,
        }}
      >
        {dict.nav[p]}
      </Link>
    );
  };

  const langPills = (full = false) => (
    <div
      role="group"
      aria-label="Language"
      style={{ display: "flex", background: "var(--bg2)", borderRadius: "11px", padding: "3px", flex: "none", justifyContent: full ? "space-between" : undefined }}
    >
      {locales.map((l: Locale) => {
        const on = l === locale;
        return (
          <Link
            key={l}
            href={swapLocale(pathname, l)}
            hrefLang={l}
            aria-label={localeNames[l]}
            aria-current={on ? "true" : undefined}
            onClick={() => setMenuOpen(false)}
            style={{
              padding: full ? "9px 0" : "7px 13px",
              flex: full ? 1 : undefined,
              textAlign: "center",
              borderRadius: "9px",
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "13px",
              transition: "all .2s",
              background: on ? "var(--surface)" : "transparent",
              color: on ? "var(--ink)" : "var(--ink2)",
              boxShadow: on ? "0 1px 5px var(--shadow)" : "none",
            }}
          >
            {localeLabels[l]}
          </Link>
        );
      })}
    </div>
  );

  const themeToggle = (
    <button
      onClick={toggleTheme}
      aria-label={!mounted ? "Toggle theme" : theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="vc-lift-sm"
      style={{
        width: "40px",
        height: "40px",
        flex: "none",
        border: "1px solid var(--line)",
        background: "var(--bg2)",
        borderRadius: "11px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!mounted ? (
        <span style={{ width: "15px", height: "15px", borderRadius: "50%", border: "2px solid var(--ink2)", display: "block" }} />
      ) : theme === "light" ? (
        <span style={{ position: "relative", width: "17px", height: "17px", display: "block" }}>
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--ink)" }} />
          <span style={{ position: "absolute", top: "-3px", insetInlineEnd: "-3px", width: "14px", height: "14px", borderRadius: "50%", background: "var(--bg2)" }} />
        </span>
      ) : (
        <span style={{ width: "13px", height: "13px", borderRadius: "50%", background: "var(--accent2)", boxShadow: "0 0 0 3px color-mix(in oklab, var(--accent2) 35%, transparent)", display: "block" }} />
      )}
    </button>
  );

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60, padding: "16px clamp(12px,3vw,20px)" }}>
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "var(--glass)",
          backdropFilter: "blur(18px) saturate(1.5)",
          WebkitBackdropFilter: "blur(18px) saturate(1.5)",
          border: "1px solid var(--line)",
          borderRadius: "18px",
          padding: "11px clamp(12px,2vw,16px)",
          boxShadow: "0 16px 40px -22px var(--shadow)",
        }}
      >
        <Link href={pageHref(locale, "home")} aria-label={dict.nav.home} onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", color: "var(--ink)", flex: "none" }}>
          <Logo />
        </Link>

        {/* Desktop inline navigation */}
        <nav aria-label="Primary" className="vc-desktop-flex" style={{ gap: "2px", marginInlineStart: "8px" }}>
          {pages.map((p) => navLink(p))}
        </nav>

        <div style={{ flex: 1 }} />

        <div className="vc-desktop-flex">{langPills()}</div>

        {themeToggle}

        <Link
          href={pageHref(locale, "contact")}
          onClick={() => setMenuOpen(false)}
          className="vc-lift-sm vc-desktop-inline"
          style={{
            flex: "none",
            textDecoration: "none",
            background: "var(--accent)",
            color: "var(--on-accent)",
            fontWeight: 700,
            fontSize: "14px",
            padding: "10px 18px",
            borderRadius: "11px",
            boxShadow: "0 10px 24px -10px var(--accent)",
          }}
        >
          {dict.nav.book}
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="vc-mobile-flex"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="vc-mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            width: "40px",
            height: "40px",
            flex: "none",
            border: "1px solid var(--line)",
            background: "var(--bg2)",
            borderRadius: "11px",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span aria-hidden="true" style={{ width: "18px", height: "2px", borderRadius: "2px", background: "var(--ink)", transition: "transform .25s", transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span aria-hidden="true" style={{ width: "18px", height: "2px", borderRadius: "2px", background: "var(--ink)", transition: "opacity .2s", opacity: menuOpen ? 0 : 1 }} />
          <span aria-hidden="true" style={{ width: "18px", height: "2px", borderRadius: "2px", background: "var(--ink)", transition: "transform .25s", transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          id="vc-mobile-menu"
          className="vc-mobile-menu"
          style={{
            maxWidth: "1440px",
            margin: "10px auto 0",
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: "18px",
            padding: "12px",
            boxShadow: "0 24px 50px -22px var(--shadow)",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            animation: "vc-fadeUp .25s ease both",
          }}
        >
          {pages.map((p) => navLink(p, true))}
          <div style={{ height: "1px", background: "var(--line)", margin: "6px 0" }} />
          {langPills(true)}
          <Link
            href={pageHref(locale, "contact")}
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: "4px",
              textAlign: "center",
              textDecoration: "none",
              background: "var(--accent)",
              color: "var(--on-accent)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "16px",
              padding: "14px",
              borderRadius: "13px",
              boxShadow: "0 14px 30px -12px var(--accent)",
            }}
          >
            {dict.nav.book}
          </Link>
        </div>
      )}
    </header>
  );
}
