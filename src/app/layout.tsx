import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { HashScrollController } from "@/components/hash-scroll-controller";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { profile, socialDescription, socialTitle } from "@/lib/data";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: "variable",
});

const titleTemplate = `${profile.name} · ${profile.tagline} ${profile.accentWord}`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: `${profile.tagline} ${profile.accentWord}`,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.toptal],
  knowsAbout: [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Product engineering",
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
  description: socialDescription,
  authors: [{ name: profile.name, url: profile.links.linkedin }],
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    type: "website",
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={inter.variable}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          // Escape < so a future string value can't prematurely close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <noscript>
          <style>{`.reveal{opacity:1}`}</style>
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
