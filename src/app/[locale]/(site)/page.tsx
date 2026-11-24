import Link from "next/link";
import { ButtonLink, Container, Icon, SectionHeading, Arrow } from "@/components/ui";
import { HeroSlider } from "@/components/HeroSlider";
import { RouteMap } from "@/components/RouteMap";
import { DivisionTabs } from "@/components/DivisionTabs";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { findSlot } from "@/lib/images";
import { Backdrop, SectionBg } from "@/components/Media";
import clsx from "clsx";
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

      {/* ───────── Where we work ───────── */}
      <section className="relative isolate py-24 sm:py-32">
        <SectionBg slot="home/bg-reach" />
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t.reach.eyebrow} title={t.reach.title} align="center" />
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {t.reach.items.map((c, i) => {
              // three tones: navy · mint · white
              const tone = (["dark", "mint", "white"] as const)[i % 3];
              const dark = tone === "dark";
              return (
                <Reveal key={c.id} delay={i * 100}>
                  <div
                    className={clsx(
                      "relative isolate flex h-full flex-col overflow-hidden rounded-[28px] p-8 sm:p-10",
                      tone === "dark" && "bg-navy text-white",
                      tone === "mint" && "bg-signal-soft text-fg",
                      tone === "white" && "bg-canvas text-fg ring-1 ring-line",
                    )}
                  >
                    <SectionBg slot={`home/card-${c.id}`} tone={dark ? "dark" : "light"} ambient={false} />
                    <Icon
                      name={c.icon}
                      className={clsx("absolute -right-8 -top-8 h-48 w-48", dark ? "text-white/[0.06]" : "text-signal/[0.07]")}
                    />
                    <div className="relative">
                      <span
                        className={clsx(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold",
                          dark ? "bg-white/10 text-white" : tone === "mint" ? "bg-canvas text-signal" : "bg-signal-soft text-signal",
                        )}
                      >
                        <Icon name={i === 0 ? "globe" : "pin"} className="h-3.5 w-3.5" />
                        {c.tag}
                      </span>
                    </div>
                    <h3 className="relative mt-6 text-2xl font-semibold tracking-[-0.03em] sm:text-[28px]">{c.title}</h3>
                    <p className={clsx("relative mt-4 leading-relaxed", dark ? "text-white/70" : "text-fg-muted")}>{c.text}</p>
                    <ul className="relative mt-auto space-y-3 pt-8">
                      {c.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 text-[15px]">
                          <Icon name="check" className={clsx("mt-0.5 h-4 w-4 shrink-0", dark ? "text-accent" : "text-pulse")} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={href(locale, `/solutions/${divisionFor[c.id as keyof typeof divisionFor]}`)}
                      className={clsx(
                        "group relative mt-8 inline-flex w-fit items-center gap-2 text-[15px] font-semibold",
                        dark ? "text-accent hover:text-white" : "text-signal hover:text-fg",
                      )}
                    >
                      {t.nav.seeDetails}
                      <Arrow />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="relative isolate py-24 sm:py-32">
        <SectionBg slot="home/bg-faq" />
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
          </Reveal>
          <Reveal delay={100}>
            <Faq items={t.faq.items} />
          </Reveal>
        </Container>
      </section>

      <CtaBand locale={locale} t={t.cta} />
    </>
  );
}
