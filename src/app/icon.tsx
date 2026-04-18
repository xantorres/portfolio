import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0b",
          color: "#edeae4",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          fontWeight: 900,
          letterSpacing: "-0.08em",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        XT
      </div>
    ),
    { ...size },
  );
}
