import type { MetadataRoute } from "next";
import { cases } from "@/lib/data";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...cases.map((c) => ({
      url: `${siteUrl}/work/${c.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
