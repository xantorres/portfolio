import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { HashScrollController } from "@/components/hash-scroll-controller";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getSubhead, profile, socialTitle } from "@/lib/data";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: "variable",
  axes: ["wdth"],
});
const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian-mono",
  display: "swap",
  weight: "variable",
  axes: ["wdth"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://xtorres.vercel.app";
const titleTemplate = `${profile.name} · ${profile.tagline} ${profile.accentWord}`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Senior Frontend Engineer",
  url: siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.toptal],
  knowsAbout: [
    "React",
    "TypeScript",
    "Next.js",
    "Frontend architecture",
    "Design systems",
    "AI agent workflows",
    "Model Context Protocol",
  ],
  knowsLanguage: ["es", "ca", "en"],
  address: { "@type": "PostalAddress", addressCountry: "CY" },
} as const;

// Canonical and openGraph.url are set per-page so each route advertises its own URL.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: titleTemplate, template: `%s · ${profile.name}` },
  description: getSubhead(),
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  openGraph: {
    title: socialTitle,
    description: getSubhead(),
    type: "website",
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: getSubhead(),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4EEE2" },
    { media: "(prefers-color-scheme: dark)", color: "#211D18" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${martianMono.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // Escape < so a future string value can't prematurely close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <HashScrollController />
          {children}
          <Toaster position="top-right" />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
