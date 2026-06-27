import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Calculator } from "@/components/Calculator";
import { pageHref } from "@/lib/routes";

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.hero;
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "clamp(28px,5vw,52px) clamp(12px,3vw,20px) 30px",
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", top: "-80px", insetInlineEnd: "-40px", width: "340px", height: "340px", borderRadius: "50%", background: "radial-gradient(circle, color-mix(in oklab, var(--accent) 34%, transparent), transparent 70%)", filter: "blur(20px)", animation: "vc-float 9s ease-in-out infinite", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: "-60px", insetInlineStart: "8%", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, color-mix(in oklab, var(--accent2) 30%, transparent), transparent 70%)", filter: "blur(20px)", animation: "vc-float 11s ease-in-out infinite reverse", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", gap: "clamp(28px,4vw,56px)", alignItems: "center" }}>
        <div style={{ flex: "1 1 430px", minWidth: "300px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--bg2)", border: "1px solid var(--line)", color: "var(--ink2)", fontWeight: 600, fontSize: "13px", padding: "7px 14px", borderRadius: "99px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 0 3px color-mix(in oklab, var(--accent) 30%, transparent)" }} />
            {t.eyebrow}
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(40px,6vw,68px)", lineHeight: 1.02, letterSpacing: "-.035em", margin: "18px 0 0", textWrap: "balance" }}>
            {t.titleA} <span style={{ color: "var(--accent)" }}>{t.titleAccent}</span>
            {t.titleB}
          </h1>
          <p style={{ fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.55, color: "var(--ink2)", maxWidth: "30em", margin: "20px 0 0", textWrap: "pretty" }}>{t.sub}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "26px" }}>
            <a href="#estimate" className="vc-lift" style={{ textDecoration: "none", background: "var(--accent)", color: "var(--on-accent)", fontWeight: 700, fontSize: "15px", padding: "14px 24px", borderRadius: "13px", boxShadow: "0 14px 30px -12px var(--accent)" }}>{t.book}</a>
            <Link href={pageHref(locale, "fleet")} className="vc-soft" style={{ textDecoration: "none", background: "transparent", color: "var(--ink)", fontWeight: 700, fontSize: "15px", padding: "14px 24px", borderRadius: "13px", border: "1px solid var(--line)" }}>{t.secondary}</Link>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,3vw,40px)", marginTop: "34px" }}>
            {dict.heroStats.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "30px", letterSpacing: "-.02em" }}>{s.num}</div>
                <div style={{ fontSize: "13px", color: "var(--ink2)", fontWeight: 600, marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <Calculator />
      </div>
    </section>
  );
}
