"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, m } from "motion/react";
import { Icon } from "./ui";
import { ease } from "./motion/MotionProvider";

/** FAQ accordion: one answer open at a time, with a smooth height animation. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-canvas">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.q} className="px-6 sm:px-8">
            <h3>
              <button
                type="button"
                id={`${uid}-q${i}`}
                aria-expanded={on}
                aria-controls={`${uid}-a${i}`}
                onClick={() => setOpen(on ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[17px] font-medium tracking-tight"
              >
                <span className={clsx("transition-colors", on ? "text-signal" : "group-hover:text-signal")}>{it.q}</span>
                <m.span
                  animate={{ rotate: on ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  className={clsx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                    on ? "border-signal bg-signal text-white" : "border-line-strong text-fg-muted group-hover:border-signal",
                  )}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
                  <m.p
                    initial={{ y: -6 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="-mt-1 max-w-3xl pb-6 leading-relaxed text-fg-muted"
                  >
                    {it.a}
                  </m.p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/** Floating chat button: pops in after the page settles, gentle pulse ring, label slides out on hover. */
export function ChatButton({
  whatsapp,
  message,
  contactHref,
  label,
}: {
  whatsapp: string;
  message?: string;
  contactHref: string;
  label: string;
}) {
  const href = whatsapp ? `https://wa.me/${whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}` : contactHref;
  return (
    <m.a
      href={href}
      target={whatsapp ? "_blank" : undefined}
      rel={whatsapp ? "noopener noreferrer" : undefined}
      aria-label={label}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.2 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.92 }}
      className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-pulse pl-4 pr-4 text-white shadow-[0_16px_40px_-12px_rgb(31_168_90/0.7)] transition-[padding] hover:pr-5 sm:bottom-7 sm:right-7"
    >
      <span aria-hidden="true" className="absolute inset-0 -z-10 animate-ping rounded-full bg-pulse/40 [animation-duration:2.6s]" />
      <Icon name={whatsapp ? "whatsapp" : "chat"} className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[14px] font-semibold transition-all duration-300 group-hover:max-w-[160px]">
        {label}
      </span>
    </m.a>
  );
}
