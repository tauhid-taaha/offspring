import { redirect } from "next/navigation";
import { defaultLocale, isLocale } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

/** The overview repeated the home page and the division pages, so this address returns home. */
export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  const safe = isLocale(locale) ? locale : defaultLocale;
  redirect(`/${safe}#solutions`);
}
