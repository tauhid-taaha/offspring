"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, m } from "motion/react";
import { Arrow, Icon } from "./ui";

const rise = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

type Tab = {
  id: string;
  icon: string;
  label: string;
  title: string;
  scope: string;
  scopeIcon: string;
  description: string;
  points: string[];
  href: string;
  image: string | null;
};

/** Service switcher: a tab strip of divisions, each revealing details + an image slot. */
export function DivisionTabs({ tabs, cta }: { tabs: Tab[]; cta: string }) {
  const [active, setActive] = useState(0);
  const t = tabs[active];

  return (
    <div>
      <div role="tablist" aria-label="Divisions" className="grid grid-cols-3 gap-2 rounded-2xl bg-surface p-1.5 sm:inline-grid sm:auto-cols-fr sm:grid-flow-col">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActive(i)}
            className={clsx(
              "relative isolate flex flex-col items-center gap-1.5 rounded-xl px-3 py-3 text-[13px] font-medium transition-colors sm:flex-row sm:gap-2.5 sm:px-5 sm:text-[14px]",
              i === active ? "text-fg" : "text-fg-muted hover:text-fg",
            )}
          >
            {i === active && (
              <m.span
                layoutId="division-tab"
                className="absolute inset-0 -z-10 rounded-xl bg-canvas shadow-sm ring-1 ring-line"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <Icon name={tab.icon} className={clsx("h-5 w-5", i === active && "text-signal")} />
            <span className="text-center leading-tight">{tab.title}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={t.id}
        role="tabpanel"
        id={`panel-${t.id}`}
        aria-labelledby={`tab-${t.id}`}
        className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
        initial="hidden"
        animate="show"
        exit="exit"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.06 } },
          exit: { opacity: 0, transition: { duration: 0.18 } },
        }}
      >
        <m.div variants={rise}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-soft px-3 py-1 text-[12px] font-medium text-signal">
            <Icon name={t.scopeIcon} className="h-3.5 w-3.5" />
            {t.scope}
          </span>
          <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{t.title}</h3>
          <p className="mt-4 text-lg leading-relaxed text-fg-muted">{t.description}</p>
          {/* With a photo on the right, the points list sits here instead */}
          {t.image && (
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {t.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[15px]">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-pulse" />
                  {p}
                </li>
              ))}
            </ul>
          )}
          <Link
            href={t.href}
            className="group mt-9 inline-flex items-center gap-2 text-[15px] font-semibold text-signal hover:text-fg"
          >
            {cta}
            <Arrow />
          </Link>
        </m.div>

        {t.image ? (
          <m.div
            variants={{ hidden: { opacity: 0, scale: 0.96, x: 24 }, show: { opacity: 1, scale: 1, x: 0, transition: { type: "spring", stiffness: 140, damping: 20 } } }}
            className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-surface ring-1 ring-line"
          >
            <Image src={t.image} alt={t.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.04]" />
          </m.div>
        ) : (
          /* No photo: a plain numbered list */
          <m.ol className="border-t border-line" variants={{ show: { transition: { staggerChildren: 0.07 } } }}>
            {t.points.map((p) => (
              <m.li key={p} variants={rise} className="border-b border-line py-5">
                <span className="text-lg font-medium tracking-tight sm:text-xl">{p}</span>
              </m.li>
            ))}
          </m.ol>
        )}
      </m.div>
      </AnimatePresence>
    </div>
  );
}
