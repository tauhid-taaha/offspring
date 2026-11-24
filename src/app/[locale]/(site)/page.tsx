import Link from "next/link";
import { ButtonLink, Container, Icon, SectionHeading, Arrow } from "@/components/ui";
import { HeroSlider } from "@/components/HeroSlider";
import { RouteMap } from "@/components/RouteMap";
import { DivisionTabs } from "@/components/DivisionTabs";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { QuoteForm } from "@/components/QuoteForm";
import { ContactDetails } from "@/components/ContactDetails";
import { buildQuoteCatalog } from "@/lib/quote-catalog";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { findSlot } from "@/lib/images";
import { Backdrop, SectionBg } from "@/components/Media";
import clsx from "clsx";
import { company, whatsappLink } from "@/config/company";
import { HomeCardSection } from "@/components/HomeCardSection";
import homeCards, { cardAreaIds } from "@/i18n/dictionaries/en-cards";
import { getPublishedCards } from "@/lib/cards";

/** "Where we work" columns → their division pages. */
const divisionFor = { software: "digital", supply: "equipment", install: "engineering" } as const;
import { SplitWords } from "@/components/motion/SplitWords";

/** Admin card edits refresh the page instantly; this also picks up changes made directly in Supabase. */
export const revalidate = 600;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = getDictionary(locale);
  const cards = await getPublishedCards();

  const tabs = t.pillars.map((p) => ({
    id: p.id,
    icon: p.icon,
    label: p.label,
    title: p.title,
    scope: p.scope,
    scopeIcon: p.id === "digital" ? "globe" : "pin",
    description: p.description,
    points: p.points,
    href: href(locale, `/solutions/${p.id}`),
    image: findSlot(`home/tab-${p.id}`),
  }));

  const cover = findSlot("home/cover");
  const slides = t.heroSlides.items.map((sl) => ({
    id: sl.id,
    icon: sl.icon,
    tag: sl.tag,
    caption: sl.caption,
    icons: sl.icons,
    stats: sl.stats,
    href: href(locale, `/solutions/${sl.division}`),
    images: [findSlot(`home/slide-${sl.id}-1`), findSlot(`home/slide-${sl.id}-2`)],
  }));

  return (
    <>
      {/* ───────── Split hero ───────── */}
      <section className={clsx("relative isolate overflow-hidden pb-28 pt-28 sm:pb-36 sm:pt-32", cover && "text-white")}>
        <Backdrop src={cover} tone="light" priority />
        {!cover && <RouteMap />}

        <Container className="relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <div className="fade-up inline-flex max-w-full items-center gap-2 rounded-full border border-line-strong bg-canvas py-1 pl-1 pr-4 shadow-sm">
              <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-pulse/10 px-2.5 py-1 text-[12px] font-semibold text-pulse">
                <Icon name="shield" className="h-3.5 w-3.5" />
                {t.trust[0].title}
              </span>
              <span className="truncate text-[13px] text-fg-muted">{t.hero.eyebrow}</span>
            </div>
            <h1
              className={clsx("mt-7 text-balance text-[42px] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-[64px]", cover ? "text-white" : "text-fg")}
            >
              <SplitWords text={t.hero.title} highlight={2} highlightClass="text-signal-gradient" delay={0.05} />
            </h1>
            <p
              className={clsx("fade-up mt-6 max-w-xl text-pretty text-lg leading-relaxed sm:text-xl", cover ? "text-white/80" : "text-fg-muted")}
              style={{ animationDelay: "160ms" }}
            >
              {t.hero.subtitle}
            </p>
            <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
              <ButtonLink href={href(locale, "/contact")} className="h-12 px-6">
                {t.hero.primary}
              </ButtonLink>
              <ButtonLink href="#solutions" variant={cover ? "onDarkSecondary" : "secondary"} className="h-12 px-6">
                {t.hero.secondary}
              </ButtonLink>
            </div>
          </div>

          <div
            className={clsx("fade-up", cover && "rounded-3xl bg-canvas/90 p-5 text-fg shadow-xl backdrop-blur sm:p-6")}
            style={{ animationDelay: "200ms" }}
          >
            <HeroSlider slides={slides} labels={t.heroSlides} />
          </div>
        </Container>
      </section>

      {/* ───────── Floating trust card (overlaps hero) ───────── */}
      <Container className="relative z-10 -mt-20 sm:-mt-24">
        <div
          className="fade-up grid grid-cols-2 overflow-hidden rounded-3xl bg-canvas shadow-[0_30px_70px_-30px_rgb(10_13_20/0.3)] ring-1 ring-line lg:grid-cols-4"
          style={{ animationDelay: "320ms" }}
        >
          {t.trust.map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-col items-start gap-3 p-5 sm:flex-row sm:gap-4 sm:p-7 ${i % 2 ? "border-l border-line" : ""} ${
                i > 1 ? "border-t border-line lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l" : ""}`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-signal-soft text-signal">
                <Icon name={item.icon} />
              </span>
              <div>
                <p className="font-semibold tracking-tight">{item.title}</p>
                <p className="mt-1 text-[13px] leading-snug text-fg-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* ───────── Divisions (tabbed) ───────── */}
      <section id="solutions" className="relative isolate scroll-mt-16 py-24 sm:py-32">
        <SectionBg slot="home/bg-divisions" />
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t.pillarsIntro.eyebrow} title={t.pillarsIntro.title} subtitle={t.pillarsIntro.subtitle} />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <DivisionTabs tabs={tabs} cta={t.divisionPage.viewDetails} />
          </Reveal>
        </Container>
      </section>

      {/* ───────── Card sections: Software · Supply · Installation (managed in admin → Cards) ───────── */}
      {cardAreaIds.map((area, i) => {
        const sec = homeCards.sections[area];
        return (
          <HomeCardSection
            key={area}
            locale={locale}
            id={area}
            heading={sec}
            cards={cards[area].slice(0, 4)}
            mainHref={`/solutions/${sec.division}`}
            viewDetails={t.divisionPage.viewDetails}
            seeDetails={t.nav.seeDetails}
            tinted={i % 2 === 0}
          />
        );
      })}

      {/* ───────── Where we work: interactive rows (no boxed cards) ───────── */}
      <section className="relative isolate py-24 sm:py-32">
        <SectionBg slot="home/bg-reach" />
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading eyebrow={t.reach.eyebrow} title={t.reach.title} />
            </Reveal>
            {/* Coverage legend */}
            <Reveal delay={100}>
              <ul className="flex flex-wrap gap-2.5 lg:justify-end">
                {[...new Map(t.reach.items.map((c, i) => [c.tag, i === 0 ? "globe" : "pin"])).entries()].map(([tag, icon]) => (
                  <li
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full bg-canvas px-4 py-2 text-[14px] font-medium ring-1 ring-line"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-pulse/60 [animation-duration:2.4s]" />
                      <span className="relative h-2 w-2 rounded-full bg-pulse" />
                    </span>
                    <Icon name={icon} className="h-4 w-4 text-signal" />
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <ol className="mt-14 border-t border-line">
            {t.reach.items.map((c, i) => (
              <Reveal as="li" key={c.id} delay={i * 90} className="border-b border-line">
                <Link
                  href={href(locale, `/solutions/${divisionFor[c.id as keyof typeof divisionFor]}`)}
                  className="group relative isolate grid gap-x-10 gap-y-5 py-9 pr-14 sm:py-11 lg:pr-0 lg:grid-cols-[88px_minmax(0,1.05fr)_minmax(0,1.35fr)_56px] lg:items-center"
                >
                  {/* Hover fill that sweeps in from the left */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-4 -right-4 -z-10 origin-left scale-x-0 rounded-2xl bg-[linear-gradient(90deg,rgb(227_244_236/0.9),rgb(227_244_236/0.35))] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 sm:-left-6 sm:-right-6"
                  />

                  {/* Index */}
                  <span className="font-mono text-[44px] font-medium leading-none tracking-tight text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_rgb(10_13_20/0.25)] group-hover:text-signal group-hover:[-webkit-text-stroke:1px_transparent] lg:text-[56px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Scope + title */}
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-soft px-3 py-1 text-[12px] font-semibold text-signal transition-colors duration-300 group-hover:bg-canvas">
                      <Icon name={i === 0 ? "globe" : "pin"} className="h-3.5 w-3.5" />
                      {c.tag}
                    </span>
                    <h3 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.03em] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1.5 sm:text-[30px] sm:leading-[1.1]">
                      {c.title}
                    </h3>
                  </div>

                  {/* Description + capabilities */}
                  <div className="min-w-0">
                    <p className="text-pretty leading-relaxed text-fg-muted">{c.text}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {c.points.map((pt) => (
                        <li
                          key={pt}
                          className="rounded-full bg-surface px-3 py-1 text-[13px] text-fg/80 ring-1 ring-line transition-colors duration-300 group-hover:bg-canvas"
                        >
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow button */}
                  <span className="absolute right-0 top-9 flex h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-canvas text-fg transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:border-accent group-hover:bg-accent group-hover:text-ink sm:top-11 lg:static lg:justify-self-end">
                    <Arrow className="-rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                    <span className="sr-only">{t.nav.seeDetails}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ───────── FAQ ───────── */}
      <section id="faq" className="relative isolate scroll-mt-20 overflow-hidden py-24 sm:py-32">
        <SectionBg slot="home/bg-faq" />
        {/* soft colour field so the glass rows read */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(31_168_90/0.16),transparent)]" />
          <div className="absolute -right-24 bottom-0 h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(255_178_30/0.14),transparent)]" />
        </div>
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28">
            <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} subtitle={t.faq.subtitle} />
            {/* Still have a question? */}
            <div className="glass-tile mt-10 rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[linear-gradient(145deg,#34d399,#047857)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.45)]">
                  <Icon name="chat" className="h-5 w-5" />
                </span>
                <p className="text-[17px] font-semibold tracking-[-0.01em]">{t.faq.helpTitle}</p>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{t.faq.helpText}</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {company.whatsapp && (
                  <a
                    href={whatsappLink(t.contact.details.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-5 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5 active:scale-[0.97]"
                  >
                    <Icon name="whatsapp" className="h-4 w-4" />
                    WhatsApp
                  </a>
                )}
                <a
                  href={`tel:${company.phone}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-semibold ring-1 ring-black/[0.08] transition-colors hover:text-signal hover:ring-signal/40"
                >
                  <Icon name="call" className="h-4 w-4" />
                  {t.contact.details.phone}
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Faq items={t.faq.items} />
          </Reveal>
        </Container>
      </section>

      {/* ───────── Get a quote (same form as the Contact page) ───────── */}
      <section id="quote" className="relative isolate scroll-mt-20 overflow-hidden border-t border-line bg-surface py-24 sm:py-32">
        <SectionBg slot="home/bg-quote" />
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t.nav.cta} title={t.contact.title} subtitle={t.contact.subtitle} />
          </Reveal>
          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
            <Reveal>
              <QuoteForm t={t.contact.form} q={t.contact.quote} catalog={buildQuoteCatalog(t)} />
            </Reveal>
            <Reveal delay={120}>
              <ContactDetails d={t.contact.details} id="home-details" />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
