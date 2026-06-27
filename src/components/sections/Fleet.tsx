import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ImageSlot } from "@/components/ImageSlot";
import { siteConfig } from "@/config/site";
import { toArabicDigits } from "@/lib/fare";

export function Fleet({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { tiers } = siteConfig.fares;
  const { symbol } = siteConfig.currency;
  const dg = (s: string | number) => (locale === "ar" ? toArabicDigits(s) : String(s));
  const money = (n: number) => symbol + dg(Math.round(n).toLocaleString("en-GB"));
  const money1 = (n: number) => symbol + dg(n.toFixed(2));

  return (
    <section id="fleet" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(56px,7vw,90px) clamp(12px,3vw,20px) clamp(40px,6vw,70px)" }}>
      <div data-reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "20px", flexWrap: "wrap" }}>
        <SectionHeading kicker={dict.fleet.kicker} title={dict.fleet.title} sub={dict.fleet.sub} maxWidth="32em" />
      </div>
      <div data-reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "18px", marginTop: "34px" }}>
        {tiers.map((tr) => (
          <article key={tr.id} className="vc-card" style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <ImageSlot hint={`${dict.veh[tr.id]} photo`} style={{ width: "100%", height: "160px" }} />
            <div style={{ padding: "18px 18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "20px", letterSpacing: "-.01em" }}>{dict.veh[tr.id]}</div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink2)", background: "var(--bg2)", padding: "5px 10px", borderRadius: "99px" }}>{`${dg(tr.seats)} ${dict.calc.seats}`}</span>
              </div>
              <p style={{ color: "var(--ink2)", fontSize: "14px", lineHeight: 1.5, margin: "8px 0 0", flex: 1 }}>{dict.veh[`${tr.id}Desc`]}</p>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "10px", marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--line)" }}>
                <div>
                  <span style={{ fontSize: "12px", color: "var(--ink2)", fontWeight: 600 }}>{dict.fleet.from} </span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "22px", color: "var(--accent)" }}>{money(tr.base)}</span>
                </div>
                <span style={{ fontSize: "13px", color: "var(--ink2)", fontWeight: 600 }}>{money1(tr.perMile) + dict.calc.perMile}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
