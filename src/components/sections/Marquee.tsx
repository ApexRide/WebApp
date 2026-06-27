import type { Locale } from "@/i18n/config";
import { cities, cityName } from "@/lib/cities";

export function Marquee({ locale }: { locale: Locale }) {
  const names = cities.map((c) => cityName(c, locale));
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "38px", paddingInlineEnd: "38px" }} aria-hidden={hidden}>
      {names.map((n, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "38px" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "19px", color: "var(--ink2)" }}>{n}</span>
          <span style={{ width: "7px", height: "7px", borderRadius: "2px", background: "var(--accent)", transform: "rotate(45deg)" }} />
        </span>
      ))}
    </div>
  );

  return (
    <div
      style={{
        overflow: "hidden",
        borderBlock: "1px solid var(--line)",
        padding: "16px 0",
        marginTop: "14px",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
        maskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
      }}
    >
      <div style={{ display: "inline-flex", whiteSpace: "nowrap", animation: "vc-marquee 38s linear infinite" }}>
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
