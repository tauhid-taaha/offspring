import type { Metadata } from "next";
import clsx from "clsx";
import { ButtonLink, Container, Eyebrow, Icon } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDictionary(locale as Locale).nav.solutions };
}

export default async function SolutionsPage({ params }: Props) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = getDictionary(locale);
  const s = t.solutionsPage;

  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

      {/* Sticky in-page nav */}
      <div className="sticky top-16 z-40 border-b border-line bg-canvas/80 backdrop-blur-xl">
        <Container className="flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
          {t.pillars.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="shrink-0 rounded-full px-4 py-2 text-[14px] text-fg-muted transition-colors hover:bg-fg/5 hover:text-fg"
            >
              <span className="mr-2 font-mono text-[11px] text-fg-subtle">{p.label}</span>
              {p.title}
            </a>
          ))}
        </Container>
      </div>

      {t.pillars.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={clsx("scroll-mt-32 py-24 sm:py-32", i % 2 === 1 && "border-y border-line bg-surface")}
        >
          <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line-strong bg-surface text-signal">
                  <Icon name={p.icon} className="h-6 w-6" />
                </span>
                <span className="font-mono text-[13px] text-fg-subtle">{p.label} / 03</span>
              </div>
              <h2 className="text-gradient mt-8 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{p.title}</h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-fg-muted">{p.description}</p>
              <ButtonLink href={href(locale, `/solutions/${p.id}`)} className="mt-8">
                {t.divisionPage.viewDetails}
              </ButtonLink>
            </Reveal>

            <Reveal delay={120}>
              <Eyebrow>{s.deliverablesTitle}</Eyebrow>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {p.points.map((pt) => (
                  <li key={pt} className="card-surface flex min-h-[110px] flex-col justify-between rounded-2xl p-5">
                    <Icon name="check" className="h-5 w-5 text-pulse" />
                    <span className="mt-6 font-medium tracking-tight">{pt}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>
      ))}

      <div className="pt-24 sm:pt-32">
        <CtaBand locale={locale} t={t.cta} />
      </div>
    </>
  );
}
