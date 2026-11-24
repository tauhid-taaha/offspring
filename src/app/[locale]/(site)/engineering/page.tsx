import type { Metadata } from "next";
import { BrandPage } from "@/components/BrandPage";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const b = getDictionary(locale as Locale).brands.engineering;
  return {
    // absolute: the brand name already leads the title
    title: { absolute: b.seo.title },
    description: b.seo.description,
    alternates: { canonical: `/${locale}${b.path}` },
    openGraph: { title: b.seo.title, description: b.seo.description, url: `/${locale}${b.path}` },
  };
}

/** Card edits in the admin refresh this page too (and it re-checks every 10 minutes). */
export const revalidate = 600;

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <BrandPage locale={locale as Locale} id="engineering" />;
}
