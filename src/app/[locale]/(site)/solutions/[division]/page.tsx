import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import clsx from "clsx";
import { Arrow, ButtonLink, Container, Eyebrow, Icon, SectionHeading } from "@/components/ui";
import { Backdrop, ImageSlot, SectionBg } from "@/components/Media";
import { HeroPanel } from "@/components/HeroSlider";
import { RouteMap } from "@/components/RouteMap";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { divisionIds, type DivisionId } from "@/i18n/dictionaries/en-divisions";
import { findImage, findSlot } from "@/lib/images";

const quoteType = { digital: "software", equipment: "supply", engineering: "install" } as const;

type Props = { params: Promise<{ locale: string; division: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return divisionIds.map((division) => ({ division }));
}

function isDivision(v: string): v is DivisionId {
  return (divisionIds as string[]).includes(v);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, division } = await params;
  if (!isDivision(division)) return {};
  const d = getDictionary(locale as Locale).divisions[division];
  return { title: d.hero.eyebrow, description: d.hero.subtitle };
}

export default async function DivisionPage({ params }: Props) {
  const { locale: l, division } = await params;
  if (!isDivision(division)) notFound();
  const locale = l as Locale;
  const t = getDictionary(locale);
  const d = t.divisions[division];
  const ui = t.divisionPage;

  // Drop-in images: public/images/divisions/<division>/{hero,banner,<item-id>}.(webp|jpg|png)
  const imgDir = `divisions/${division}`;
  const heroImg = findImage(imgDir, "cover");
  const bannerImg = findImage(imgDir, "banner");
  const onPhoto = Boolean(heroImg);
  const isCatalog = d.offer.layout === "catalog";
  const others = divisionIds.filter((id) => id !== division).map((id) => t.divisions[id]);
  const slide = t.heroSlides.items.find((item) => item.division === division);
  const panel = slide
    ? {
        id: slide.id,
        icon: slide.icon,
        tag: slide.tag,
        caption: slide.caption,
        href: href(locale, `/solutions/${division}`),
        icons: slide.icons,
        images: [findSlot(`home/slide-${slide.id}-1`), findSlot(`home/slide-${slide.id}-2`)],
        stats: slide.stats,
      }
    : null;

  return (
    <>
      {/* ───────── Hero (optional background image) ───────── */}
      <section
        className={clsx(
          "relative isolate overflow-hidden border-b border-line pb-16 pt-28 sm:pb-20 sm:pt-32",
          onPhoto && "text-white",
        )}
      >
        <Backdrop src={heroImg} tone="light" priority />
        {!onPhoto && <RouteMap />}
        <Container className="relative grid items-center gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-x-24">
          <div>
          <nav aria-label="Breadcrumb" className="fade-up">
            <Link
              href={href(locale, "/solutions")}
              className={clsx(
                "inline-flex items-center gap-1.5 text-[13px] transition-colors",
                onPhoto ? "text-white/70 hover:text-white" : "text-fg-muted hover:text-fg",
              )}
            >
              <Arrow className="rotate-180" />
              {ui.allSolutions}
            </Link>
          </nav>

          <div className="fade-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "60ms" }}>
            <span
              className={clsx(
                "flex h-10 w-10 items-center justify-center rounded-xl border",
                onPhoto ? "border-white/20 bg-white/10 text-white" : "border-line-strong bg-canvas text-signal",
              )}
            >
              <Icon name={d.icon} />
            </span>
            <Eyebrow className={onPhoto ? "!text-white/75" : ""}>
              {d.hero.eyebrow}
            </Eyebrow>
            <span
              className={clsx(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold",
                onPhoto ? "bg-white/15 text-white" : "bg-signal-soft text-signal",
              )}
            >
              <Icon name={division === "digital" ? "globe" : "pin"} className="h-3.5 w-3.5" />
              {d.hero.coverage}
            </span>
          </div>

          <h1
            className={clsx(
              "fade-up mt-7 max-w-xl text-balance text-[40px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl",
              onPhoto ? "text-gradient-light" : "text-gradient",
            )}
            style={{ animationDelay: "120ms" }}
          >
            {d.hero.title}
          </h1>
          <p
            className={clsx(
              "fade-up mt-6 max-w-2xl text-pretty text-lg leading-relaxed sm:text-xl",
              onPhoto ? "text-white/75" : "text-fg-muted",
            )}
            style={{ animationDelay: "180ms" }}
          >
            {d.hero.subtitle}
          </p>

          <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
            <ButtonLink href={`${href(locale, "/contact")}?type=${quoteType[division]}`} variant={onPhoto ? "onDarkPrimary" : "primary"}>
              {isCatalog ? ui.quoteCta : t.nav.cta}
            </ButtonLink>
            <ButtonLink href="#offer" variant={onPhoto ? "onDarkSecondary" : "secondary"}>
              {ui.offerCta}
            </ButtonLink>
          </div>
          </div>

          {panel && (
            <div className="fade-up" style={{ animationDelay: "180ms" }}>
              <HeroPanel slide={panel} />
            </div>
          )}

          <ul className="fade-up col-span-full flex flex-col gap-2 sm:flex-row sm:flex-nowrap" style={{ animationDelay: "300ms" }}>
            {d.hero.highlights.map((h) => (
              <li
                key={h}
                className={clsx(
                  "inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px]",
                  onPhoto ? "border-white/20 bg-white/10 text-white/90 backdrop-blur" : "border-line-strong bg-canvas text-fg/80",
                )}
              >
                <Icon name="check" className={clsx("h-3.5 w-3.5", onPhoto ? "text-white" : "text-pulse")} />
                {h}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ───────── What we offer / supply ───────── */}
      <section id="offer" className="relative isolate scroll-mt-16 bg-ambient py-24 sm:py-32">
        <SectionBg slot={`${imgDir}/bg-offer`} />
        <Container>
          <Reveal>
            <SectionHeading eyebrow={d.offer.eyebrow} title={d.offer.title} subtitle={d.offer.subtitle} />
          </Reveal>

          {isCatalog ? (
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {d.offer.items.map((item, i) => (
                <Reveal key={item.id} delay={(i % 4) * 70}>
                  <article id={item.id} className="card-surface group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-3xl">
                    <ImageSlot
                      src={findImage(imgDir, item.id)}
                      alt={item.title}
                      icon={item.icon}
                      className="aspect-[4/3]"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{item.description}</p>
                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {item.points.map((pt) => (
                          <li key={pt} className="rounded-full bg-surface px-2.5 py-1 text-[12px] text-fg/80">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
              {/* Source-to-spec card */}
              <Reveal delay={0} className="sm:col-span-2 lg:col-span-4">
                <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-dashed border-line-strong bg-surface p-8 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{ui.sourceToSpec}</h3>
                    <p className="mt-1.5 text-fg-muted">{d.offer.subtitle}</p>
                  </div>
                  <ButtonLink href={`${href(locale, "/contact")}?type=${quoteType[division]}`}>{ui.quoteCta}</ButtonLink>
                </div>
              </Reveal>
            </div>
          ) : (
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {d.offer.items.map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) * 80}>
                  <article id={item.id} className="card-surface group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-3xl">
                    <ImageSlot src={findImage(imgDir, item.id)} alt={item.title} icon={item.icon} className="aspect-[16/9]" />
                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                      <p className="mt-2.5 leading-relaxed text-fg-muted">{item.description}</p>
                      <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                        {item.points.map((pt) => (
                          <li key={pt} className="flex items-center gap-2.5 text-[14px] text-fg/85">
                            <Icon name="check" className="h-4 w-4 shrink-0 text-pulse" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ───────── Statement banner (optional background image) ───────── */}
      <section className="px-4 sm:px-6">
        <Reveal>
          <div className="relative isolate mx-auto max-w-[1360px] overflow-hidden rounded-[32px] text-white">
            <Backdrop src={bannerImg} tone="dark" />
            <Container className="relative py-20 sm:py-28">
              <h2 className="text-gradient-light max-w-3xl text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                {d.banner.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-white/70">{d.banner.subtitle}</p>
            </Container>
          </div>
        </Reveal>
      </section>

      {/* ───────── Tech stack (digital only) ───────── */}
      {d.stack && (
        <section className="relative isolate py-24 sm:py-32">
          <SectionBg slot={`${imgDir}/bg-stack`} />
          <Container>
            <Reveal>
              <SectionHeading eyebrow={d.stack.eyebrow} title={d.stack.title} />
            </Reveal>
            <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {d.stack.groups.map((g, i) => (
                <Reveal key={g.title} delay={i * 70} className="bg-canvas p-7">
                  <h3 className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-subtle">{g.title}</h3>
                  <ul className="mt-6 space-y-3">
                    {g.items.map((it) => (
                      <li key={it} className="text-lg font-medium tracking-tight">
                        {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ───────── Process ───────── */}
      <section className={clsx("relative isolate py-24 sm:py-32", d.stack && "border-t border-line bg-surface")}>
        <SectionBg slot={`${imgDir}/bg-process`} />
        <Container>
          <Reveal>
            <SectionHeading eyebrow={d.process.eyebrow} title={d.process.title} />
          </Reveal>
          <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            <div className="absolute left-0 right-0 top-[18px] hidden h-px bg-gradient-to-r from-signal/50 via-signal/30 to-pulse/50 lg:block" />
            {d.process.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="relative">
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-canvas font-mono text-[12px] text-fg">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{s.description}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ───────── Engagement / assurance / contract models ───────── */}
      <section className={clsx("relative isolate py-24 sm:py-32", d.stack ? "" : "border-t border-line bg-surface")}>
        <SectionBg slot={`${imgDir}/bg-extras`} />
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow={d.extras.eyebrow} title={d.extras.title} />
          </Reveal>
          <div className="grid gap-4">
            {d.extras.items.map((x, i) => (
              <Reveal key={x.title} delay={i * 80} className="card-surface rounded-2xl p-6 sm:p-7">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{x.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-fg-muted">{x.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────── Other divisions ───────── */}
      <section className="relative isolate py-24 sm:py-28">
        <SectionBg slot={`${imgDir}/bg-others`} />
        <Container>
          <Reveal>
            <Eyebrow>{ui.otherDivisions}</Eyebrow>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {others.map((o, i) => (
              <Reveal key={o.id} delay={i * 80}>
                <Link
                  href={href(locale, `/solutions/${o.id}`)}
                  className="card-surface group flex items-center justify-between gap-6 rounded-3xl p-7 transition-colors hover:border-line-strong sm:p-8"
                >
                  <div className="flex items-center gap-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line-strong bg-surface text-signal">
                      <Icon name={o.icon} />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{o.hero.eyebrow}</h3>
                    </div>
                  </div>
                  <Arrow className="h-5 w-5 text-fg-muted group-hover:text-fg" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand locale={locale} t={t.cta} />
    </>
  );
}
