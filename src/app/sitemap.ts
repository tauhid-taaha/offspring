import type { MetadataRoute } from "next";
import { abs } from "@/config/site";
import { enabledLocales } from "@/i18n/config";
import { divisionIds } from "@/i18n/dictionaries/en-divisions";

/** /sitemap.xml — every public page, most important first. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/it", priority: 0.9, changeFrequency: "weekly" },
    { path: "/engineering", priority: 0.9, changeFrequency: "weekly" },
    ...divisionIds.map((id) => ({ path: `/solutions/${id}`, priority: 0.8, changeFrequency: "monthly" as const })),
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  ];
  return enabledLocales.flatMap((locale) =>
    pages.map((p) => ({
      url: abs(`/${locale}${p.path}`),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
  );
}
