import type { Metadata } from "next";
import { Container, Eyebrow, Icon, SectionHeading } from "@/components/ui";
import { company } from "@/config/company";
import { PageHero } from "@/components/PageHero";
import { SectionBg } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDictionary(locale as Locale).nav.about };
}

export default async function AboutPage({ params }: Props) {
  const { locale: l } = await params;
  const locale = l as Locale;
  const t = getDictionary(locale);
  const a = t.about;

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} subtitle={a.intro} cover="about/cover" map />

      <section className="relative isolate bg-ambient py-24 sm:py-32">
        <SectionBg slot="about/bg-mission" />
        <Container className="grid gap-4 md:grid-cols-2">
          {[
            { label: a.missionTitle, body: a.mission },
            { label: a.visionTitle, body: a.vision },
          ].map((b, i) => (
            <Reveal key={b.label} delay={i * 100} className="card-surface rounded-3xl p-8 sm:p-12">
              <Eyebrow>{b.label}</Eyebrow>
              <p className="mt-8 text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">{b.body}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="relative isolate bg-ambient pb-24 sm:pb-32">
        <SectionBg slot="about/bg-license" />
        <Container>
          <Reveal className="flex flex-col gap-6 rounded-3xl bg-navy p-8 text-white sm:flex-row sm:items-center sm:p-12">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-accent">
              <Icon name="shield" className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{a.licenseTitle}</h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-white/70">{a.licenseText}</p>
              {company.tradeLicenseNo && (
                <p className="mt-4 font-mono text-[13px] text-white/80">
                  {t.footer.licenseNo} {company.tradeLicenseNo}
                  {company.tradeLicenseIssuer && ` · ${company.tradeLicenseIssuer}`}
                </p>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="relative isolate border-y border-line bg-ambient py-24 sm:py-32">
        <SectionBg slot="about/bg-values" />
        <Container>
          <Reveal>
            <h2 className="text-gradient text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">{a.valuesTitle}</h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {a.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="bg-canvas p-7 sm:p-8">
                <h3 className="text-xl font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{v.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative isolate bg-ambient py-24 sm:py-32">
        <SectionBg slot="about/bg-divisions" />
        <Container>
          <Reveal>
            <Eyebrow>{t.pillarsIntro.eyebrow}</Eyebrow>
          </Reveal>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {t.pillars.map((p, i) => (
              <Reveal
                key={p.id}
                delay={i * 80}
                className="grid gap-3 py-8 sm:grid-cols-[1fr_1.4fr] sm:items-baseline sm:gap-8"
              >
                <h3 className="text-2xl font-semibold tracking-tight">{p.title}</h3>
                <p className="leading-relaxed text-fg-muted">{p.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────── Why choose us (moved from home) ───────── */}
      <section className="relative isolate py-24 sm:py-32">
        <SectionBg slot="about/bg-why" />
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow={t.principles.eyebrow} title={t.principles.title} />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.principles.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="card-surface rounded-3xl p-7">
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────── Process ───────── */}
      <section className="relative isolate border-y border-line bg-surface py-24 sm:py-32">
        <SectionBg slot="about/bg-process" />
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} />
          </Reveal>
          <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-signal/50 via-signal/30 to-pulse/50 lg:block" />
            {t.process.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="relative">
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-signal font-semibold text-white ring-8 ring-surface">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{s.description}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand locale={locale} t={t.cta} />
    </>
  );
}
