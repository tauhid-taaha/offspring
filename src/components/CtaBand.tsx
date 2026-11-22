import { ButtonLink, Container } from "./ui";
import { Reveal } from "./Reveal";
import { LogoMark } from "./Logo";
import { SectionBg } from "./Media";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

/** Dark "ink" feature band — the one high-contrast moment on a light page. */
export function CtaBand({ locale, t }: { locale: Locale; t: Dictionary["cta"] }) {
  return (
    <section className="pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[32px] bg-ink px-6 py-16 text-center text-white sm:px-12 sm:py-24">
            <SectionBg slot="shared/bg-cta" tone="dark" />
            <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
            <div className="absolute left-1/2 top-full h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(0_119_95/0.55),transparent)]" />
            <div className="relative">
              <LogoMark size={40} tile className="mx-auto" />
              <h2 className="text-gradient-light mx-auto mt-8 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                {t.title}
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg text-white/65">{t.subtitle}</p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href={href(locale, "/contact")} variant="onDarkPrimary">
                  {t.primary}
                </ButtonLink>
                <ButtonLink href={`${href(locale, "/contact")}#details`} variant="onDarkSecondary">
                  {t.secondary}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
