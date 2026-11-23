"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
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
type NavLink = { label: string; to: string; children?: (MenuItem & { to: string })[] };

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
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  // Glass background once the page moves; tuck the bar away while scrolling down, bring it back on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 12);
    setHidden(y > 240 && y > lastY.current && !open && !menu);
    lastY.current = y;
  });

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links: NavLink[] = [
    {
      label: nav.solutions,
      to: href(locale, "/solutions"),
      children: divisions.map((d) => ({ ...d, to: href(locale, `/solutions/${d.id}`) })),
    },
    { label: nav.about, to: href(locale, "/about") },
    { label: nav.contact, to: href(locale, "/contact") },
  ];

  return (
    <m.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={clsx(
          "border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open
            ? "border-line/70 bg-canvas/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Link href={href(locale)} aria-label="Offspring Technologies — home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary" onMouseLeave={() => setHovered(null)}>
          {links.map((l) => {
            const active = l.children ? pathname.startsWith(l.to) : pathname === l.to;
            const isOpen = menu === l.to;
            const linkEl = (
              <Link
                href={l.to}
                onMouseEnter={() => setHovered(l.to)}
                onFocus={() => setHovered(l.to)}
                className={clsx(
                  "relative isolate inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] transition-colors",
                  active ? "text-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                {hovered === l.to && (
                  <m.span
                    layoutId="nav-hover"
                    className="absolute inset-0 -z-10 rounded-full bg-fg/[0.06]"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
                {active && (
                  <m.span
                    layoutId="nav-active"
                    className="absolute inset-x-3.5 -bottom-px h-[2px] rounded-full bg-signal"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  />
                )}
                {l.label}
                {l.children && (
                  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={clsx("transition-transform duration-300", isOpen && "rotate-180")}>
                    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </Link>
            );
            if (!l.children) return <span key={l.to}>{linkEl}</span>;
            // Hover / focus dropdown (Solutions)
            return (
              <div
                key={l.to}
                className="relative"
                onMouseEnter={() => setMenu(l.to)}
                onMouseLeave={() => setMenu(null)}
                onFocus={() => setMenu(l.to)}
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
                      initial={{ opacity: 0, x: "-50%", y: 8, scale: 0.97, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: "-50%", y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: "-50%", y: 6, scale: 0.98, filter: "blur(4px)", transition: { duration: 0.15 } }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      style={{ originY: 0 }}
                    >
                      <div className="grid gap-1 rounded-2xl border border-line bg-canvas/95 p-2 shadow-[0_24px_60px_-20px_rgb(10_13_20/0.25)] backdrop-blur-xl">
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
                          <span className="block text-[14px] font-medium text-fg">{d.title}</span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-fg-muted">{d.description}</span>
                        </span>
                      </Link>
                          </m.div>
                        ))}
                        <Link
                          href={l.to}
                          className="group/all mt-1 flex items-center justify-between rounded-xl border-t border-line px-3.5 pb-2 pt-3 text-[13px] font-semibold text-signal hover:text-fg"
                        >
                          {nav.viewAll} {l.label}
                          <Arrow className="group-hover/all:translate-x-0.5" />
                        </Link>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={href(locale, "/contact")}
            className="group hidden h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-[14px] font-semibold text-ink transition-all hover:bg-accent-strong hover:shadow-[0_8px_24px_-8px_rgb(245_158_11/0.8)] active:scale-[0.97] md:inline-flex"
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
                <m.div key={l.to} variants={item} className="border-b border-line py-4">
                  <Link href={l.to} onClick={() => setOpen(false)} className="text-2xl font-medium tracking-tight text-fg">
                    {l.label}
                  </Link>
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
    </m.header>
  );
}
