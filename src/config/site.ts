/**
 * SEO settings shared by metadata, sitemap, robots and structured data.
 *
 * The live address comes from NEXT_PUBLIC_SITE_URL (set it in .env and on the host),
 * falling back to https://offspringbd.com. Change the fallback if the domain differs
 * (for example .com.bd).
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://offspringbd.com").replace(/\/+$/, "");

/** Brand shown in titles and search results. */
export const brand = "Offspring Solutions";

/** Names people may search for — used in structured data so Google links them to this site. */
export const brandAliases = [
  "Offspring",
  "OffspringBD",
  "Offspring IT",
  "Offspring Engineering",
  "Offspring Solutions",
  "Offspring Technologies", // earlier name, kept so old searches still match
];

/** Topics the site should rank for (also used in structured data). */
export const seoKeywords = [
  "Offspring",
  "Offspring IT",
  "Offspring Engineering",
  "OffspringBD",
  "Offspring Solutions",
  "software development company Bangladesh",
  "software company Dhaka",
  "website development Bangladesh",
  "web design Dhaka",
  "mobile app development Bangladesh",
  "ERP software Bangladesh",
  "school management software Bangladesh",
  "IT products supplier Bangladesh",
  "IT equipment supplier Dhaka",
  "networking and CCTV Bangladesh",
  "engineering supply Bangladesh",
  "machinery supplier Bangladesh",
  "heavy equipment supplier Bangladesh",
  "generator and solar supplier Bangladesh",
  "installation and civil works Bangladesh",
  "government licensed company Bangladesh",
  "Uttara Dhaka",
];

/** Absolute URL for a site path, e.g. abs("/en/it"). */
export function abs(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
