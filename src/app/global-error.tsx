"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          fontFamily: "Archivo, sans-serif",
          background: "#0A0A0A",
          color: "#FFFFFF",
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 500, color: "rgb(255 255 255 / 48%)" }}>
          Unrecoverable error
        </p>
        <h1 style={{ fontSize: 40, fontWeight: 600, lineHeight: 1.12, letterSpacing: "-0.018em", margin: 0 }}>
          The app failed to boot.
        </h1>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: 8,
            height: 44,
            padding: "0 1.25rem",
            borderRadius: 8,
            border: "1px solid transparent",
            background: "#F2703F",
            color: "#0A0A0A",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
