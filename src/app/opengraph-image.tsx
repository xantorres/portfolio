import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { currentQuarter, getSubhead, profile } from "@/lib/data";

export const alt = `${profile.name} · ${profile.tagline} ${profile.accentWord}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Daily ISR so the availability quarter baked into the image stays current, matching page.tsx.
export const revalidate = 86_400;

// Server-side font loading from @fontsource/archivo.
// vercel/og accepts ttf/otf/woff; we ship the WOFF static weights.
async function loadArchivo(weight: 400 | 500 | 800): Promise<ArrayBuffer> {
  const file = path.join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "archivo",
    "files",
    `archivo-latin-${weight}-normal.woff`,
  );
  const buf = await readFile(file);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

const INK = "#211D18";
const PAPER = "#F2ECE1";
const SIGNAL = "#E85E33";
const MUTED = "#A89F92";
const RULE = "#453E36";

export default async function OpengraphImage() {
  const [regular, medium, bold] = await Promise.all([
    loadArchivo(400),
    loadArchivo(500),
    loadArchivo(800),
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
          fontFamily: "Archivo",
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
              fontWeight: 800,
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
          <span>Toptal Verified Expert since 2017</span>
          <span>
            {profile.availability.short} · {currentQuarter()}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
        { name: "Archivo", data: medium, weight: 500, style: "normal" },
        { name: "Archivo", data: bold, weight: 800, style: "normal" },
      ],
    },
  );
}
