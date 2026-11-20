import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatButton } from "@/components/Faq";
import { company } from "@/config/company";
import { enabledLocales, href, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

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
    title: { default: t.title, template: "%s — Offspring Technologies" },
    description: t.description,
    icons: { icon: "/icon.svg" },
    openGraph: { title: t.title, description: t.description, type: "website", siteName: "Offspring Technologies" },
    alternates: {
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
  const dict = getDictionary(locale as Locale);

  return (
    <html lang={locale} className={`${geist.variable} ${geistMono.variable} ${bangla.variable}`}>
      <body className="min-h-dvh overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-canvas"
        >
          Skip to content
        </a>
        <Header
          locale={locale}
          nav={dict.nav}
          divisions={dict.pillars.map((p) => ({ id: p.id, title: p.title, description: p.description, icon: p.icon }))}
        />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
        <ChatButton whatsapp={company.whatsapp} contactHref={href(locale as Locale, "/contact")} label={company.whatsapp ? dict.contact.details.whatsapp : dict.nav.contact} />
      </body>
    </html>
  );
}
