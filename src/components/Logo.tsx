import { siteConfig } from "@/config/site";

export function Logo({ size = 32, fontSize = 22 }: { size?: number; fontSize?: number }) {
  const dot = Math.round(size * 0.28);
  return (
    <span style={{ display: "flex", alignItems: "center", gap: "11px" }}>
      <span
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.31),
          background: "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 16px -6px var(--accent)",
          transform: "rotate(45deg)",
          flex: "none",
        }}
      >
        <span style={{ width: dot, height: dot, borderRadius: "2px", background: "var(--on-accent)" }} />
      </span>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize,
          letterSpacing: "-.03em",
        }}
      >
        {siteConfig.brandName}
      </span>
    </span>
  );
}
