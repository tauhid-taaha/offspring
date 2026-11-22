"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { Arrow, Icon } from "./ui";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

type DivisionLink = { id: string; title: string; description: string; icon: string };

export function Header({
  locale,
  nav,
  divisions,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  divisions: DivisionLink[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    { label: nav.solutions, to: href(locale, "/solutions") },
    { label: nav.industries, to: `${href(locale)}#industries` },
    { label: nav.about, to: href(locale, "/about") },
    { label: nav.contact, to: href(locale, "/contact") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-transparent bg-transparent">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Link href={href(locale)} aria-label="Offspring Technologies — home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l, i) => {
            const active = i === 0 ? pathname.startsWith(l.to) : pathname === l.to;
            const linkEl = (
              <Link
                href={l.to}
                className={clsx(
                  "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] transition-colors",
                  active ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                {l.label}
                {i === 0 && (
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="transition-transform group-hover:rotate-180">
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </Link>
            );
            if (i !== 0) return <span key={l.to}>{linkEl}</span>;
            // Solutions dropdown
            return (
              <div key={l.to} className="group relative">
                {linkEl}
                <div className="invisible absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="grid gap-1 rounded-2xl border border-line bg-canvas p-2 shadow-[0_24px_60px_-20px_rgb(10_13_20/0.25)]">
                    {divisions.map((d) => (
                      <Link
                        key={d.id}
                        href={href(locale, `/solutions/${d.id}`)}
                        className="flex items-start gap-4 rounded-xl p-3.5 transition-colors hover:bg-surface"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-canvas text-signal">
                          <Icon name={d.icon} />
                        </span>
                        <span>
                          <span className="block text-[14px] font-medium text-fg">{d.title}</span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-fg-muted">{d.description}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={href(locale, "/contact")}
            className="group hidden h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-[14px] font-semibold text-ink transition-colors hover:bg-accent-strong md:inline-flex"
          >
            {nav.cta}
            <Arrow />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? nav.close : nav.menu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d={open ? "M4 4l10 10M14 4L4 14" : "M2.5 6h13M2.5 12h13"}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={clsx(
          "overflow-hidden transition-[max-height] duration-300 md:hidden",
          open ? "max-h-[calc(100dvh-4rem)]" : "max-h-0",
        )}
      >
        <nav className="flex h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto bg-canvas/95 px-5 pb-10 pt-2 backdrop-blur-xl" aria-label="Mobile">
          {links.map((l, i) => (
            <div key={l.to} className="border-b border-line py-4">
              <Link href={l.to} onClick={() => setOpen(false)} className="text-2xl font-medium tracking-tight text-fg">
                {l.label}
              </Link>
              {i === 0 && (
                <div className="mt-3 grid gap-1">
                  {divisions.map((d) => (
                    <Link
                      key={d.id}
                      href={href(locale, `/solutions/${d.id}`)}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl py-2 text-[16px] text-fg-muted"
                    >
                      <Icon name={d.icon} className="h-4 w-4 text-signal" />
                      {d.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href={href(locale, "/contact")}
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-accent text-[15px] font-semibold text-ink"
          >
            {nav.cta}
          </Link>
        </nav>
      </div>
    </header>
  );
}
