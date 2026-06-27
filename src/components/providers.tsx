"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import { dir as dirFor } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export const THEME_STORAGE_KEY = "volt-theme";
type Theme = "light" | "dark";

interface AppContextValue {
  locale: Locale;
  dict: Dictionary;
  dir: "rtl" | "ltr";
  isRtl: boolean;
  theme: Theme;
  toggleTheme: () => void;
  /** False until after the first client mount — use to defer theme-dependent UI. */
  mounted: boolean;
}

/**
 * Resolve the current theme on the client from the most durable source first.
 * This survives client-side navigation (e.g. switching language), which
 * remounts the provider: localStorage and the live <html data-theme> both
 * outlast the remount, so the theme is not lost.
 */
function resolveClientTheme(defaultTheme: "system" | "light" | "dark"): Theme {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* storage unavailable — fall through */
  }
  const applied = document.documentElement.getAttribute("data-theme");
  if (applied === "light" || applied === "dark") return applied;
  if (defaultTheme === "dark") return "dark";
  if (defaultTheme === "light") return "light";
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <AppProvider>");
  return ctx;
}

export function AppProvider({
  locale,
  dict,
  defaultTheme,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  defaultTheme: "system" | "light" | "dark";
  children: React.ReactNode;
}) {
  // Initialise from the durable client sources (storage / live <html>), so the
  // theme persists across the remount that a language switch triggers. On the
  // server `window` is undefined, so it falls back to the configured default —
  // which matches what the server renders. Theme-dependent UI is deferred via
  // `mounted` below, so an initial divergence here can't cause a hydration
  // mismatch.
  const [theme, setTheme] = useState<Theme>(() =>
    typeof window === "undefined"
      ? defaultTheme === "dark"
        ? "dark"
        : "light"
      : resolveClientTheme(defaultTheme),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reassert the theme onto <html> whenever it changes (and on mount). This
  // also restores data-theme if a navigation reconciliation dropped it.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      try {
        // Persist the explicit choice so it survives reloads and navigation.
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* storage may be unavailable (private mode) — non-fatal */
      }
      return next;
    });
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      locale,
      dict,
      dir: dirFor(locale),
      isRtl: dirFor(locale) === "rtl",
      theme,
      toggleTheme,
      mounted,
    }),
    [locale, dict, theme, toggleTheme, mounted],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * Inline script injected into <head> to set the theme before first paint,
 * avoiding a flash of the wrong theme. Reads the saved preference, falling
 * back to the env default (resolving "system" against the OS setting).
 */
export function ThemeScript({ defaultTheme }: { defaultTheme: "system" | "light" | "dark" }) {
  const script = `(function(){try{var k='${THEME_STORAGE_KEY}';var s=localStorage.getItem(k);var t=s;if(t!=='light'&&t!=='dark'){var d='${defaultTheme}';t=d==='dark'?'dark':d==='light'?'light':(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
