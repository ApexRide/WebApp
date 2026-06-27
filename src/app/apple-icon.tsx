import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Generated Apple touch icon — the brand mark on the dark brand background.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#13100e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 26,
            background: "#f23a2f",
            transform: "rotate(45deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "#fff" }} />
        </div>
      </div>
    ),
    size,
  );
}
