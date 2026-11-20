import { Icon } from "./ui";

/** Accessible FAQ accordion using native <details> — works without JavaScript. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-canvas">
      {items.map((it) => (
        <details key={it.q} className="group px-6 sm:px-8 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-[17px] font-medium tracking-tight">
            {it.q}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-fg-muted transition-transform duration-300 group-open:rotate-45">
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="-mt-1 max-w-3xl pb-6 leading-relaxed text-fg-muted">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ChatButton({ whatsapp, contactHref, label }: { whatsapp: string; contactHref: string; label: string }) {
  const href = whatsapp ? `https://wa.me/${whatsapp}` : contactHref;
  return (
    <a
      href={href}
      target={whatsapp ? "_blank" : undefined}
      rel={whatsapp ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-pulse pl-4 pr-4 text-white shadow-[0_16px_40px_-12px_rgb(11_168_155/0.7)] transition-all hover:pr-5 sm:bottom-7 sm:right-7"
    >
      <Icon name="chat" className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[14px] font-semibold transition-all duration-300 group-hover:max-w-[160px]">
        {label}
      </span>
    </a>
  );
}
