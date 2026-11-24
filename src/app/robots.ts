import type { MetadataRoute } from "next";
import { abs, siteUrl } from "@/config/site";

/** /robots.txt — allow the public site, keep the admin area out of search. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/*/madcat2457", "/api/"] },
    sitemap: abs("/sitemap.xml"),
    host: siteUrl,
  };
}
