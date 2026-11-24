import Link from "next/link";
import clsx from "clsx";
import { Arrow, Container, SectionHeading } from "./ui";
import { SectionBg } from "./Media";
import { Reveal } from "./Reveal";
import { ServiceCardView } from "./ServiceCardView";
import { href, type Locale } from "@/i18n/config";
import type { ServiceCard } from "@/lib/cards";

/**
 * A home page card section (Software, Supply or Installation).
 * Cards are managed in the admin area; the section hides itself when it has none.
 */
export function HomeCardSection({
  locale,
  id,
  heading,
  cards,
  mainHref,
  viewDetails,
  seeDetails,
  tinted,
}: {
  locale: Locale;
  id: string;
  heading: { eyebrow: string; title: string; subtitle: string };
  cards: ServiceCard[];
  /** The section's main page, e.g. /solutions/equipment */
  mainHref: string;
  viewDetails: string;
  seeDetails: string;
  tinted?: boolean;
}) {
  if (cards.length === 0) return null;
  const main = href(locale, mainHref);

  return (
    <section id={id} className={clsx("relative isolate scroll-mt-16 py-24 sm:py-32", tinted && "border-y border-line bg-surface")}>
      <SectionBg slot={`home/bg-${id === "software" ? "solutions" : id}`} />
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading eyebrow={heading.eyebrow} title={heading.title} subtitle={heading.subtitle} />
          </Reveal>
          <Reveal>
            <Link href={main} className="group inline-flex items-center gap-2 whitespace-nowrap font-semibold text-signal hover:text-fg">
              {viewDetails}
              <Arrow />
            </Link>
          </Reveal>
        </div>
        <div className="relative mt-14">
          <div aria-hidden="true" className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 overflow-hidden">
            <div className="absolute -left-16 top-0 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgb(31_168_90/0.38),transparent)] blur-2xl" />
            <div className="absolute left-[38%] top-1/4 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgb(0_119_95/0.26),transparent)] blur-3xl" />
            <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgb(255_178_30/0.4),transparent)] blur-2xl" />
          </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => {
            const target = !c.link ? main : c.link.startsWith("/") ? href(locale, c.link) : c.link;
            return (
              <Reveal key={c.id} delay={(i % 4) * 80}>
                <ServiceCardView card={c} href={target} cta={seeDetails} />
              </Reveal>
            );
          })}
        </div>
        </div>
      </Container>
    </section>
  );
}
