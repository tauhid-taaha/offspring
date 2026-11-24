import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { Arrow, Container, Icon } from "./ui";
import { company, whatsappLink } from "@/config/company";
import { enabledLocales, href, localeLabels, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

/**
 * Dark navy footer — a clear break from the light page above.
 * Top: call-to-action with quick contact buttons. Middle: links + contact.
 * Bottom: legal line, back-to-top and a large faded wordmark.
 */
export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { footer, nav, pillars, contact } = dict;
  const d = contact.details;
  const year = new Date().getFullYear();
  const wa = whatsappLink(d.whatsappMessage);

  return (
    <footer className="relative isolate overflow-hidden bg-navy text-white">
      {/* Decoration: animated top edge, grid, glows */}
      <div aria-hidden="true" className="footer-edge absolute inset-x-0 top-0 h-px" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(to_right,rgb(255_255_255/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_20%,transparent_75%)]"
      />
      <div aria-hidden="true" className="absolute -left-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(31_168_90/0.28),transparent)]" />
      <div aria-hidden="true" className="absolute -bottom-48 -right-32 -z-10 h-[520px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgb(255_178_30/0.16),transparent)]" />

      <Container className="relative">
        {/* ── Call to action ── */}
        <div className="flex flex-col gap-8 border-b border-white/10 py-14 lg:flex-row lg:items-end lg:justify-between lg:py-16">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              {footer.ctaEyebrow}
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{footer.ctaTitle}</h2>
            <p className="mt-3 text-pretty leading-relaxed text-white/65">{footer.ctaText}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={href(locale, "/contact")}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-ink shadow-[0_12px_32px_-12px_rgb(255_178_30/0.7)] transition-all hover:-translate-y-0.5 hover:bg-accent-strong active:scale-[0.97]"
            >
              {footer.quote}
              <Arrow />
            </Link>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-5 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 active:scale-[0.97]"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
                WhatsApp
              </a>
            )}
            <a
              href={`tel:${company.phone}`}
              aria-label={d.callCta}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 text-[15px] font-semibold transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
            >
              <Icon name="call" className="h-4 w-4" />
              {d.callCta}
            </a>
          </div>
        </div>

        {/* ── Links ── */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1.3fr]">
          <div>
            <Logo onDark />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/65">{footer.tagline}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white ring-1 ring-white/15">
              <Icon name="shield" className="h-3.5 w-3.5 text-accent" />
              {footer.licensed}
            </p>
            {company.tradeLicenseNo && (
              <p className="mt-3 text-[13px] text-white/55">
                {footer.licenseNo} {company.tradeLicenseNo}
                {company.tradeLicenseIssuer && ` · ${company.tradeLicenseIssuer}`}
              </p>
            )}
          </div>

          <FooterCol title={footer.solutions}>
            {pillars.map((p) => (
              <FooterLink key={p.id} to={href(locale, `/solutions/${p.id}`)} icon={p.icon}>
                {p.title}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={footer.company}>
            <FooterLink to={href(locale, "/about")}>{nav.about}</FooterLink>
            <FooterLink to={href(locale, "/solutions")}>{nav.solutions}</FooterLink>
            <FooterLink to={href(locale, "/contact")}>{nav.contact}</FooterLink>
          </FooterCol>

          <FooterCol title={d.title}>
            <ContactLine icon="mail" href={`mailto:${company.email}`}>
              {d.email}
            </ContactLine>
            <ContactLine icon="call" href={`tel:${company.phone}`}>
              {d.phone}
            </ContactLine>
            <ContactLine icon="pin" href={company.mapUrl} external>
              {d.office}
              <span className="mt-1 block text-[13px] font-semibold text-accent">{d.mapCta} →</span>
            </ContactLine>
            <li className="flex gap-3 text-[14px] text-white/65">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
              {d.hours}
            </li>
          </FooterCol>
        </div>

        {/* ── Legal ── */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. {footer.rights}
          </p>
          <p className="sm:text-center">{footer.coverage}</p>
          <div className="flex items-center gap-4">
            {enabledLocales.length > 1 && (
              <nav aria-label={footer.language} className="flex gap-3">
                {enabledLocales.map((l) => (
                  <Link
                    key={l}
                    href={href(l)}
                    aria-current={l === locale ? "true" : undefined}
                    className={l === locale ? "text-white" : "hover:text-white"}
                  >
                    {localeLabels[l]}
                  </Link>
                ))}
              </nav>
            )}
            <a
              href="#main"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-white/75 transition-colors hover:border-white/35 hover:text-white"
            >
              {footer.backToTop}
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5">
                <path d="M8 13V4M4 7.5l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </Container>

      {/* Large faded wordmark */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.22em] select-none text-center text-[clamp(64px,17vw,240px)] font-semibold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.09)] [background:linear-gradient(180deg,rgb(255_255_255/0.07),transparent_75%)] [-webkit-background-clip:text] [background-clip:text]"
      >
        OFFSPRING
      </p>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/45">{title}</h3>
      <ul className="mt-5 space-y-3.5">{children}</ul>
    </div>
  );
}

/** Link that slides right and reveals an arrow on hover. */
function FooterLink({ to, icon, children }: { to: string; icon?: string; children: ReactNode }) {
  return (
    <li>
      <Link href={to} className="group inline-flex items-center gap-2.5 text-[15px] text-white/75 transition-colors hover:text-white">
        {icon && (
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.07] text-accent ring-1 ring-white/10 transition-colors group-hover:bg-accent group-hover:text-ink">
            <Icon name={icon} className="h-3.5 w-3.5" />
          </span>
        )}
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">{children}</span>
        <Arrow className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
      </Link>
    </li>
  );
}

function ContactLine({ icon, href, external, children }: { icon: string; href: string; external?: boolean; children: ReactNode }) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex gap-3 text-[15px] leading-snug text-white/80 transition-colors hover:text-white"
      >
        <Icon name={icon} className="mt-0.5 h-4 w-4 shrink-0 text-white/40 transition-colors group-hover:text-accent" />
        <span className="min-w-0 break-words">{children}</span>
      </a>
    </li>
  );
}
