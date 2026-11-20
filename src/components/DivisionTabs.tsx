"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { Arrow, Icon } from "./ui";

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
              "flex flex-col items-center gap-1.5 rounded-xl px-3 py-3 text-[13px] font-medium transition-all sm:flex-row sm:gap-2.5 sm:px-5 sm:text-[14px]",
              i === active ? "bg-canvas text-fg shadow-sm ring-1 ring-line" : "text-fg-muted hover:text-fg",
            )}
          >
            <Icon name={tab.icon} className={clsx("h-5 w-5", i === active && "text-signal")} />
            <span className="text-center leading-tight">{tab.title}</span>
          </button>
        ))}
      </div>

      <div
        key={t.id}
        role="tabpanel"
        id={`panel-${t.id}`}
        aria-labelledby={`tab-${t.id}`}
        className="fade-up mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
      >
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-soft px-3 py-1 text-[12px] font-medium text-signal">
            <Icon name={t.scopeIcon} className="h-3.5 w-3.5" />
            {t.scope}
          </span>
          <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{t.title}</h3>
          <p className="mt-4 text-lg leading-relaxed text-fg-muted">{t.description}</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {t.points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-[15px]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pulse/10 text-pulse">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Link
            href={t.href}
            className="group mt-9 inline-flex items-center gap-2 text-[15px] font-semibold text-signal hover:text-fg"
          >
            {cta}
            <Arrow />
          </Link>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-surface ring-1 ring-line">
          {t.image ? (
            <Image src={t.image} alt={t.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgb(47_82_245/0.14),transparent_60%),radial-gradient(circle_at_20%_90%,rgb(11_168_155/0.14),transparent_55%)]">
              <div className="bg-grid absolute inset-0 [background-size:36px_36px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-3">
                  {t.points.map((p, i) => (
                    <div
                      key={p}
                      className="flex w-40 flex-col gap-3 rounded-2xl bg-canvas p-4 shadow-[0_16px_40px_-20px_rgb(10_13_20/0.35)] ring-1 ring-line sm:w-48"
                      style={{ transform: `translateY(${i % 2 ? 14 : -14}px)` }}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-signal-soft text-signal">
                        <Icon name={i === 0 ? t.icon : "check"} className="h-4 w-4" />
                      </span>
                      <span className="text-[13px] font-medium leading-snug">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
