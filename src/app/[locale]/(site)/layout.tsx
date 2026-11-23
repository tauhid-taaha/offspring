import { SiteChrome } from "@/components/SiteChrome";
import { isLocale, type Locale } from "@/i18n/config";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SiteChrome locale={isLocale(locale) ? locale : ("en" as Locale)}>{children}</SiteChrome>;
}
