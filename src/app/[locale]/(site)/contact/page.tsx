import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { ContactDetails } from "@/components/ContactDetails";
import { Backdrop } from "@/components/Media";
import { RouteMap } from "@/components/RouteMap";
import { QuoteForm } from "@/components/QuoteForm";
import { buildQuoteCatalog } from "@/lib/quote-catalog";
import { Reveal } from "@/components/Reveal";
import { findSlot } from "@/lib/images";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const s = getDictionary(locale as Locale).seo;
  return {
    title: s.contactTitle,
    description: s.contactDescription,
    alternates: { canonical: `/${locale}/contact` },
    openGraph: { title: s.contactTitle, description: s.contactDescription, url: `/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const c = dict.contact;
  const d = c.details;

  const cover = findSlot("contact/cover");

  return (
    <>
      <section className="relative isolate overflow-hidden pb-12 pt-24 sm:pb-16 sm:pt-28">
        <Backdrop src={cover} tone="light" priority />
        {!cover && <RouteMap />}
        <Container className="relative">
          <Reveal>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h1 className="text-gradient mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
              {c.title}
            </h1>
            <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">{c.subtitle}</p>
          </Reveal>
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <Reveal>
            <QuoteForm t={c.form} q={c.quote} catalog={buildQuoteCatalog(dict)} />
          </Reveal>
          <Reveal delay={120}>
            <ContactDetails d={d} />
          </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

