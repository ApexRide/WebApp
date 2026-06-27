export function SectionHeading({
  kicker,
  title,
  sub,
  maxWidth = "34em",
}: {
  kicker: string;
  title: string;
  sub?: string;
  maxWidth?: string;
}) {
  return (
    <div style={{ maxWidth }}>
      <div style={{ color: "var(--accent)", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: ".12em" }}>{kicker}</div>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(30px,4.2vw,48px)", letterSpacing: "-.03em", margin: "10px 0 0", lineHeight: 1.05 }}>{title}</h2>
      {sub && <p style={{ color: "var(--ink2)", fontSize: "17px", lineHeight: 1.5, margin: "14px 0 0" }}>{sub}</p>}
    </div>
  );
}
