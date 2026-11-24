import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { enabledLocales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { brand, seoKeywords, siteUrl } from "@/config/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const bangla = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bangla",
  display: "swap",
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return enabledLocales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale).meta;
  return {
    metadataBase: new URL(siteUrl),
    // Home uses the full title; inner pages become "Page title | Offspring Solutions".
    title: { default: t.title, template: `%s | ${brand}` },
    description: t.description,
    applicationName: brand,
    keywords: seoKeywords,
    authors: [{ name: brand, url: siteUrl }],
    creator: brand,
    publisher: brand,
    category: "technology",
    formatDetection: { telephone: true, email: true, address: true },
    // Favicon: src/app/icon.png and src/app/apple-icon.png. Share image: [locale]/opengraph-image.tsx
    openGraph: {
      title: t.title,
      description: t.description,
      type: "website",
      siteName: brand,
      locale: "en_BD",
      url: `/${locale}`,
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(enabledLocales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || !enabledLocales.includes(locale)) notFound();

  return (
    <html lang={locale} className={`${geist.variable} ${geistMono.variable} ${bangla.variable}`}>
      <body className="min-h-dvh overflow-x-hidden">{children}</body>
    </html>
  );
}
