import Link from "next/link";
import { Arrow, ButtonLink, Container, Icon, SectionHeading } from "./ui";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";
import { HomeCardSection } from "./HomeCardSection";
import { abs, brand, siteUrl } from "@/config/site";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import homeCards from "@/i18n/dictionaries/en-cards";
import type { BrandId } from "@/i18n/dictionaries/en-brands";
import { getPublishedCards } from "@/lib/cards";

/** Which home card sections appear on each brand page. */
const cardAreas = { it: ["software"], engineering: ["supply", "install"] } as const;
const quoteType = { it: "software", engineering: "supply" } as const;

/** Landing page for one brand: Offspring IT or Offspring Engineering. */
export async function BrandPage({ locale, id }: { locale: Locale; id: BrandId }) {
  const t = getDictionary(locale);
  const b = t.brands[id];
  const c = t.brands.common;
  const other = t.brands[id === "it" ? "engineering" : "it"];
  const cards = await getPublishedCards();
  const pageUrl = abs(`/${locale}${b.path}`);

  // Search-engine description of this page's services + breadcrumb
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: b.name,
        description: b.seo.description,
        url: pageUrl,
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: { "@type": "Country", name: "Bangladesh" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: b.servicesTitle,
          itemListElement: b.services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.text },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: brand, item: abs(`/${locale}`) },
          { "@type": "ListItem", position: 2, name: b.name, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <PageHero eyebrow={b.eyebrow} title={b.title} subtitle={b.subtitle} cover={`brands/${id}/cover`} map />

      {/* Highlights + actions */}
      <div className="border-b border-line">
        <Container className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-2">
            {b.highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-1.5 rounded-full bg-signal-soft px-3 py-1.5 text-[13px] font-semibold text-signal">
                <Icon name="check" className="h-3.5 w-3.5" />
                {h}
              </li>
            ))}
          </ul>
          <ButtonLink href={`${href(locale, "/contact")}?type=${quoteType[id]}`} className="shrink-0">
            {c.quoteCta}
          </ButtonLink>
        </Container>
      </div>

      {/* Services */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={b.name} title={b.servicesTitle} />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {b.services.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i % 3) * 80}>
                <Link href={href(locale, s.href)} className="glass-card group flex h-full flex-col rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[linear-gradient(140deg,var(--color-pulse),var(--color-signal)_60%)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-fg-muted">{s.text}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[14px] font-semibold text-signal">
                    {t.nav.seeDetails}
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Live cards from the admin */}
      {cardAreas[id].map((area, i) => {
        const sec = homeCards.sections[area];
        return (
          <HomeCardSection
            key={area}
            locale={locale}
            id={area === "software" ? "solutions" : area}
            heading={sec}
            cards={cards[area]}
            mainHref={`/solutions/${sec.division}`}
            viewDetails={t.divisionPage.viewDetails}
            seeDetails={t.nav.seeDetails}
            tinted={i % 2 === 0}
          />
        );
      })}

      {/* Quote + other brand */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-navy p-8 text-white sm:p-10">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{c.quoteTitle}</h2>
                <p className="mt-3 max-w-lg leading-relaxed text-white/70">{c.quoteText}</p>
              </div>
              <ButtonLink href={`${href(locale, "/contact")}?type=${quoteType[id]}`} variant="onDarkPrimary" className="w-fit">
                {c.quoteCta}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Link href={href(locale, other.path)} className="glass-card group flex h-full flex-col justify-between gap-6 rounded-3xl p-8 sm:p-10">
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-subtle">{c.otherBrand}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">{other.name}</h2>
                <p className="mt-2 leading-relaxed text-fg-muted">{other.navDescription}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-signal">
                {t.nav.seeDetails}
                <Arrow />
              </span>
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
