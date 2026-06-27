import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { toArabicDigits } from "@/lib/fare";

export function HowItWorks({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const dg = (n: number) => (locale === "ar" ? toArabicDigits(n) : String(n));
  return (
    <section id="how" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(60px,8vw,96px) clamp(12px,3vw,20px) clamp(30px,5vw,50px)" }}>
      <div data-reveal>
        <SectionHeading kicker={dict.how.kicker} title={dict.how.title} sub={dict.how.sub} />
      </div>
      <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px", marginTop: "36px" }}>
        {dict.steps.map((s, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "20px", padding: "26px", position: "relative", overflow: "hidden" }}>
            <div aria-hidden="true" style={{ position: "absolute", top: "-14px", insetInlineEnd: "-6px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "88px", color: "var(--bg2)", lineHeight: 1, zIndex: 0 }}>{dg(i + 1)}</div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: "var(--accent)", color: "var(--on-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "24px", boxShadow: "0 10px 22px -10px var(--accent)" }}>{s.glyph}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "21px", marginTop: "18px", letterSpacing: "-.01em" }}>{s.title}</div>
              <p style={{ color: "var(--ink2)", fontSize: "15px", lineHeight: 1.55, margin: "8px 0 0" }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
