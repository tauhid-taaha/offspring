import Link from "next/link";
import { Logo } from "./Logo";
import { Container, Icon } from "./ui";
import { company } from "@/config/company";
import { enabledLocales, href, localeLabels, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { footer, nav, pillars, contact } = dict;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-surface">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-fg-muted">{footer.tagline}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-pulse/10 px-3 py-1.5 text-[12px] font-semibold text-pulse">
              <Icon name="shield" className="h-3.5 w-3.5" />
              {footer.licensed}
            </p>
            {company.tradeLicenseNo && (
              <p className="mt-3 text-[13px] text-fg-muted">
                {footer.licenseNo} {company.tradeLicenseNo}
                {company.tradeLicenseIssuer && ` · ${company.tradeLicenseIssuer}`}
              </p>
            )}
          </div>

          <FooterCol title={footer.solutions}>
            {pillars.map((p) => (
              <FooterLink key={p.id} to={href(locale, `/solutions/${p.id}`)}>
                {p.title}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={footer.company}>
            <FooterLink to={href(locale, "/about")}>{nav.about}</FooterLink>
            <FooterLink to={href(locale, "/contact")}>{nav.contact}</FooterLink>
          </FooterCol>

          <FooterCol title={contact.details.title}>
            <li className="text-[14px] text-fg-muted">{contact.details.email}</li>
            <li className="text-[14px] text-fg-muted">{contact.details.phone}</li>
            <li className="text-[14px] text-fg-muted">{contact.details.office}</li>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-[13px] text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. {footer.rights}
          </p>
          <p>{footer.coverage}</p>
          {enabledLocales.length > 1 && (
            <nav aria-label={footer.language} className="flex gap-3">
              {enabledLocales.map((l) => (
                <Link
                  key={l}
                  href={href(l)}
                  aria-current={l === locale ? "true" : undefined}
                  className={l === locale ? "text-fg" : "hover:text-fg"}
                >
                  {localeLabels[l]}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-subtle">{title}</h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={to} className="text-[14px] text-fg-muted transition-colors hover:text-fg">
        {children}
      </Link>
    </li>
  );
}
