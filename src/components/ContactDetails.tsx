import type { ReactNode } from "react";
import { Arrow, Icon } from "./ui";
import { company, whatsappLink } from "@/config/company";
import type { Dictionary } from "@/i18n/dictionaries/en";

/**
 * "Reach us directly" panel: WhatsApp / call / email buttons, then email, phone,
 * office (with a Google Maps link) and hours. Used on the Contact page and the home page.
 */
export function ContactDetails({ d, id = "details" }: { d: Dictionary["contact"]["details"]; id?: string }) {
  const wa = whatsappLink(d.whatsappMessage);
  return (
    <aside id={id} className="scroll-mt-28">
      <h2 className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-subtle">{d.title}</h2>

      {/* Quick actions */}
      <div className="mt-4 grid gap-2.5">
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_30px_-14px_rgb(37_211_102/0.9)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
            {d.whatsapp}
          </a>
        )}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={`tel:${company.phone}`}
            className="flex items-center justify-center gap-2 rounded-2xl border border-line-strong bg-canvas px-4 py-3 text-[14px] font-semibold transition-colors hover:border-signal hover:text-signal"
          >
            <Icon name="call" className="h-4 w-4" />
            {d.callCta}
          </a>
          <a
            href={`mailto:${company.email}`}
            className="flex items-center justify-center gap-2 rounded-2xl border border-line-strong bg-canvas px-4 py-3 text-[14px] font-semibold transition-colors hover:border-signal hover:text-signal"
          >
            <Icon name="mail" className="h-4 w-4" />
            {d.emailCta}
          </a>
        </div>
      </div>

      <dl className="mt-6 grid gap-5">
        <Row icon="mail" label={d.emailLabel}>
          <a href={`mailto:${company.email}`} className="hover:text-signal">
            {d.email}
          </a>
        </Row>
        <Row icon="call" label={d.phoneLabel}>
          <a href={`tel:${company.phone}`} className="hover:text-signal">
            {d.phone}
          </a>
        </Row>
        <Row icon="pin" label={d.officeLabel}>
          <span className="block">{d.office}</span>
          <a
            href={company.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-signal hover:text-fg"
          >
            {d.mapCta}
            <Arrow />
          </a>
          <span className="mt-1 block text-[13px] font-normal text-fg-muted">{d.visitNote}</span>
        </Row>
        <Row icon="clock" label={d.hoursLabel}>
          {d.hours}
        </Row>
      </dl>
    </aside>
  );
}

function Row({ icon, label, children }: { icon: string; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3.5">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-signal-soft text-signal">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <dt className="text-[13px] text-fg-subtle">{label}</dt>
        <dd className="mt-0.5 break-words text-[16px] font-medium tracking-tight">{children}</dd>
      </div>
    </div>
  );
}
