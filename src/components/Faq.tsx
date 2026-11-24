"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, m } from "motion/react";
import { ease } from "./motion/MotionProvider";

/**
 * FAQ accordion: numbered glass rows, one open at a time (the first starts open).
 * The open row lifts to white with a green edge; answers slide open smoothly.
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ol className="grid gap-3">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <li
            key={it.q}
            className={clsx(
              "relative overflow-hidden rounded-2xl transition-[background-color,box-shadow] duration-300",
              on
                ? "bg-white shadow-[inset_0_1px_0_white,0_0_0_1px_rgb(0_119_95/0.25),0_24px_48px_-28px_rgb(0_119_95/0.45)]"
                : "glass-tile hover:bg-white/80",
            )}
          >
            {/* Green edge on the open item */}
            <span
              aria-hidden="true"
              className={clsx(
                "absolute inset-y-3 left-0 w-1 origin-center rounded-r-full bg-[linear-gradient(180deg,var(--color-pulse),var(--color-signal))] transition-transform duration-300",
                on ? "scale-y-100" : "scale-y-0",
              )}
            />
            <h3>
              <button
                type="button"
                id={`${uid}-q${i}`}
                aria-expanded={on}
                aria-controls={`${uid}-a${i}`}
                onClick={() => setOpen(on ? null : i)}
                className="group flex w-full items-center gap-4 px-5 py-5 text-left sm:gap-5 sm:px-6"
              >
                <span
                  className={clsx(
                    "font-mono text-[13px] font-medium tabular-nums transition-colors",
                    on ? "text-signal" : "text-fg-subtle group-hover:text-signal",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={clsx(
                    "flex-1 text-[16px] font-semibold tracking-[-0.01em] transition-colors sm:text-[17px]",
                    on ? "text-fg" : "text-fg/85 group-hover:text-fg",
                  )}
                >
                  {it.q}
                </span>
                <m.span
                  animate={{ rotate: on ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  className={clsx(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                    on ? "bg-signal text-white" : "bg-white text-fg-muted ring-1 ring-black/[0.08] group-hover:text-signal group-hover:ring-signal/40",
                  )}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </m.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <m.div
                  id={`${uid}-a${i}`}
                  role="region"
                  aria-labelledby={`${uid}-q${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pl-[3.25rem] pr-6 leading-relaxed text-fg-muted sm:pl-[3.75rem] sm:pr-16">{it.a}</p>
                </m.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
