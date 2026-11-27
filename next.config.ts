import type { NextConfig } from "next";
import { defaultLocale } from "./src/i18n/config";

// Card photos uploaded in the admin live in Supabase Storage.
const supabaseHost = (() => {
  try {
    return process.env.SUPABASE_URL ? new URL(process.env.SUPABASE_URL).hostname : null;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: supabaseHost ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }] : [],
  },
  experimental: {
    // Room for one card photo (5 MB) plus form fields.
    serverActions: { bodySizeLimit: "6mb" },
  },
  async redirects() {
    // Permanent (308): tells Google the home page lives at /en, so it indexes that address.
    return [{ source: "/", destination: `/${defaultLocale}`, permanent: true }];
  },
};

export default nextConfig;
