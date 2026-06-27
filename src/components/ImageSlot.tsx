import type { CSSProperties } from "react";

/**
 * Placeholder for imagery the design calls for (hero shots, fleet photos,
 * maps, avatars). Until real assets are supplied it renders a tasteful,
 * theme-aware placeholder with a hint. Swap in a Next.js <Image> here when
 * photos are available — see AGENTS.md.
 */
export function ImageSlot({
  hint,
  shape = "rect",
  style,
}: {
  hint: string;
  shape?: "rect" | "circle";
  style?: CSSProperties;
}) {
  return (
    <div
      role="img"
      aria-label={hint}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: shape === "circle" ? 0 : "16px",
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--accent) 16%, var(--bg2)), var(--bg2))",
        color: "var(--ink2)",
        borderRadius: shape === "circle" ? "50%" : undefined,
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: shape === "circle" ? 0 : "13px",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {shape === "rect" && <span style={{ opacity: 0.8 }}>{hint}</span>}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 60%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
