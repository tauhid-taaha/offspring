import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHero } from "@/components/PageHero";
import { SectionBg } from "@/components/Media";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: getDictionary(locale as Locale).nav.contact };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const c = getDictionary(locale as Locale).contact;
  const d = c.details;

  const rows = [
    { label: d.emailLabel, value: d.email },
    { label: d.phoneLabel, value: d.phone },
    { label: d.officeLabel, value: d.office },
    { label: d.hoursLabel, value: d.hours },
  ];

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} cover="contact/cover" />
      <section className="relative isolate py-20 sm:py-28">
        <SectionBg slot="contact/bg-form" />
        <Container className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Reveal>
            <ContactForm t={c.form} />
          </Reveal>
          <Reveal delay={120}>
            <aside id="details" className="scroll-mt-28">
              <h2 className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-subtle">{d.title}</h2>
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {rows.map((r) => (
                  <div key={r.label} className="py-5">
                    <dt className="text-[13px] text-fg-subtle">{r.label}</dt>
                    <dd className="mt-1 text-lg font-medium tracking-tight">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
