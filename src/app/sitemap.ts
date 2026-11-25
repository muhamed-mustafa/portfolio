import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: siteUrl, ar: `${siteUrl}/ar` };
  return [
    { url: siteUrl, lastModified: "2026-11-25", changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${siteUrl}/ar`, lastModified: "2026-11-25", changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
    { url: `${siteUrl}/blog`, lastModified: "2026-11-25", changeFrequency: "monthly", priority: 0.7 },
    ...posts.map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
