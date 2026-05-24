import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { currentQuarter, getSubhead, profile } from "@/lib/data";

export const alt = `${profile.name} · ${profile.tagline} ${profile.accentWord}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Server-side font loading from @fontsource/geologica.
// vercel/og accepts ttf/otf/woff; we ship the WOFF static weights.
async function loadGeologica(weight: 400 | 500 | 700): Promise<ArrayBuffer> {
  const file = path.join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "geologica",
    "files",
    `geologica-latin-${weight}-normal.woff`,
  );
  const buf = await readFile(file);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

const INK = "#070B0F";
const PAPER = "#EEE7DB";
const SIGNAL = "#61AFDA";
const MUTED = "#939CA6";
const RULE = "#293139";

export default async function OpengraphImage() {
  const [regular, medium, bold] = await Promise.all([
    loadGeologica(400),
    loadGeologica(500),
    loadGeologica(700),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          background: INK,
          color: PAPER,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "Geologica",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${RULE} 1px, transparent 1px), linear-gradient(90deg, ${RULE} 1px, transparent 1px)`,
            backgroundSize: "96px 96px",
            opacity: 0.22,
          }}
        />

        <div
          style={{
            fontSize: 20,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: SIGNAL,
            display: "flex",
            fontWeight: 500,
          }}
        >
          {profile.name.toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 108,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.005em",
              maxWidth: 1050,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {profile.tagline}&nbsp;
            <span style={{ color: SIGNAL }}>{profile.accentWord}</span>.
          </div>
          <div
            style={{
              fontSize: 26,
              color: MUTED,
              maxWidth: 960,
              display: "flex",
              fontWeight: 400,
              lineHeight: 1.35,
            }}
          >
            {getSubhead()}
          </div>
        </div>

        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: MUTED,
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 500,
          }}
        >
          <span>{profile.location}</span>
          <span>
            {profile.availability.short} · {currentQuarter()}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geologica", data: regular, weight: 400, style: "normal" },
        { name: "Geologica", data: medium, weight: 500, style: "normal" },
        { name: "Geologica", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
