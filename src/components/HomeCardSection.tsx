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
      <SectionBg slot={`home/bg-${id}`} />
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
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => {
            const target = !c.link ? main : c.link.startsWith("/") ? href(locale, c.link) : c.link;
            return (
              <Reveal key={c.id} delay={(i % 4) * 80}>
                <ServiceCardView card={c} href={target} cta={seeDetails} />
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
