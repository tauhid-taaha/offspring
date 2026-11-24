"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { Arrow, Icon } from "./ui";
import { href, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export type MenuItem = { id: string; title: string; description: string; icon: string };
type NavLink = { label: string; to?: string; match?: string; children?: (MenuItem & { to: string })[] };

export function Header({
  locale,
  nav,
  divisions,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  divisions: MenuItem[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  /** Which desktop dropdown is open (by link path). */
  const [menu, setMenu] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Transparent at the top of the page; frosted once the page scrolls under it.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: NavLink[] = [
    {
      label: nav.solutions,
      match: href(locale, "/solutions"),
      children: divisions.map((d) => ({ ...d, to: href(locale, `/solutions/${d.id}`) })),
    },
    { label: nav.about, to: href(locale, "/about") },
    // Jump to sections on the home page (works from any page)
    { label: nav.faq, to: `${href(locale)}#faq` },
    { label: nav.contact, to: `${href(locale)}#quote` },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={clsx(
          "border-b transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || open
            ? "border-black/[0.06] bg-white/75 shadow-[0_8px_30px_-18px_rgb(2_40_58/0.35)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 sm:px-8 md:h-[76px]">
        <Link href={href(locale)} aria-label="Offspring Technologies — home">
          <Logo />
        </Link>

        <div className="flex items-center gap-1">
        <nav className="hidden items-center gap-0.5 md:flex lg:gap-1.5" aria-label="Primary" onMouseLeave={() => setHovered(null)}>
          {links.map((l) => {
            const key = l.to ?? l.label;
            const active = l.match ? pathname.startsWith(l.match) : pathname === l.to;
            const isOpen = menu === key;
            const itemClass = clsx(
              "relative isolate inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2.5 text-[15px] font-medium tracking-[-0.01em] transition-colors lg:px-4 lg:text-[16px]",
              active ? "text-signal" : "text-fg/85 hover:text-fg",
            );
            const chrome = (
              <>
                {hovered === key && (
                  <m.span
                    layoutId="nav-hover"
                    className="absolute inset-0 -z-10 rounded-full bg-fg/[0.06]"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
                {active && (
                  <m.span
                    layoutId="nav-active"
                    className="absolute inset-x-4 -bottom-0.5 h-[2.5px] rounded-full bg-signal"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
                {l.label}
                {l.children && (
                  <svg width="12" height="12" viewBox="0 0 10 10" aria-hidden="true" className={clsx("transition-transform duration-300", isOpen && "rotate-180")}>
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </>
            );
            const linkEl = l.to ? (
              <Link href={l.to} onMouseEnter={() => setHovered(key)} onFocus={() => setHovered(key)} className={itemClass}>
                {chrome}
              </Link>
            ) : (
              <button
                type="button"
                aria-expanded={isOpen}
                aria-haspopup="true"
                onMouseEnter={() => setHovered(key)}
                onFocus={() => setHovered(key)}
                onClick={() => setMenu(isOpen ? null : key)}
                className={itemClass}
              >
                {chrome}
              </button>
            );
            if (!l.children) return <span key={key}>{linkEl}</span>;
            // Hover / focus dropdown (Solutions)
            return (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setMenu(key)}
                onMouseLeave={() => setMenu(null)}
                onFocus={() => setMenu(key)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setMenu(null);
                }}
                onKeyDown={(e) => e.key === "Escape" && setMenu(null)}
              >
                {linkEl}
                <AnimatePresence>
                  {isOpen && (
                    <m.div
                      className="absolute left-1/2 top-full w-[460px] max-w-[calc(100vw-2rem)] pt-3"
                      initial={{ opacity: 0, x: "-50%", y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: "-50%", y: 6, scale: 0.98, transition: { duration: 0.15 } }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      style={{ originY: 0 }}
                    >
                      <div className="grid gap-1 rounded-2xl border border-line bg-canvas p-2 shadow-[0_24px_60px_-20px_rgb(10_13_20/0.25)]">
                        {l.children.map((d, di) => (
                          <m.div
                            key={d.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.04 + di * 0.05, duration: 0.3 }}
                          >
                      <Link
                        href={d.to}
                        className="group/item flex items-start gap-4 rounded-xl p-3.5 transition-colors hover:bg-surface"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-canvas text-signal transition-all duration-300 group-hover/item:border-signal group-hover/item:bg-signal group-hover/item:text-white">
                          <Icon name={d.icon} />
                        </span>
                        <span>
                          <span className="block text-[15px] font-semibold text-fg">{d.title}</span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-fg-muted">{d.description}</span>
                        </span>
                      </Link>
                          </m.div>
                        ))}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

          <Link
            href={href(locale, "/contact")}
            aria-current={pathname === href(locale, "/contact") ? "page" : undefined}
            className="group ml-2 hidden h-11 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 text-[15px] font-semibold lg:px-5 text-ink transition-all hover:bg-accent-strong hover:shadow-[0_8px_24px_-8px_rgb(245_158_11/0.8)] active:scale-[0.97] md:inline-flex"
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
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <m.path initial={false} animate={{ d: open ? "M4 4L14 14" : "M2.5 6L15.5 6" }} transition={{ duration: 0.3 }} />
              <m.path initial={false} animate={{ d: open ? "M14 4L4 14" : "M2.5 12L15.5 12" }} transition={{ duration: 0.3 }} />
            </svg>
          </button>
        </div>
      </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-nav"
            className="md:hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)", transition: { duration: 0.25 } }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <m.nav
              className="flex h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto bg-canvas px-5 pb-10 pt-2"
              aria-label="Mobile"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              {links.map((l) => (
                <m.div key={l.to ?? l.label} variants={item} className="border-b border-line py-4">
                  {l.to ? (
                    <Link href={l.to} onClick={() => setOpen(false)} className="text-2xl font-medium tracking-tight text-fg">
                      {l.label}
                    </Link>
                  ) : (
                    <p className="text-2xl font-medium tracking-tight text-fg">{l.label}</p>
                  )}
                  {l.children && (
                    <div className="mt-3 grid gap-1">
                      {l.children.map((d) => (
                        <Link
                          key={d.id}
                          href={d.to}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 rounded-xl py-2 text-[16px] text-fg-muted"
                        >
                          <Icon name={d.icon} className="h-4 w-4 text-signal" />
                          {d.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </m.div>
              ))}
              <m.div variants={item}>
                <Link
                  href={href(locale, "/contact")}
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-[15px] font-semibold text-ink active:scale-[0.98]"
                >
                  {nav.cta}
                </Link>
              </m.div>
            </m.nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
