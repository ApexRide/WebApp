import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { pageHref } from "@/lib/routes";

export function Cta({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(20px,4vw,40px) clamp(12px,3vw,20px) clamp(50px,7vw,80px)" }}>
      <div data-reveal style={{ position: "relative", overflow: "hidden", background: "var(--accent)", color: "var(--on-accent)", borderRadius: "26px", padding: "clamp(36px,6vw,64px)", textAlign: "center" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-60px", insetInlineStart: "-30px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(255,255,255,.12)" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: "-70px", insetInlineEnd: "-20px", width: "260px", height: "260px", borderRadius: "50%", background: "rgba(255,255,255,.1)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px,4.4vw,52px)", letterSpacing: "-.03em", margin: 0, lineHeight: 1.05, textWrap: "balance" }}>{dict.cta.title}</h2>
          <p style={{ fontSize: "17px", opacity: 0.92, margin: "14px auto 0", maxWidth: "30em" }}>{dict.cta.sub}</p>
          <Link href={`${pageHref(locale, "home")}#estimate`} className="vc-lift" style={{ display: "inline-block", textDecoration: "none", background: "#fff", color: "var(--accent)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", padding: "15px 30px", borderRadius: "14px", marginTop: "24px", boxShadow: "0 16px 30px -12px rgba(0,0,0,.4)" }}>{dict.cta.button}</Link>
        </div>
      </div>
    </section>
  );
}
