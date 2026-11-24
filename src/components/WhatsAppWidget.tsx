"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import type { Dictionary } from "@/i18n/dictionaries/en";

const SEEN_KEY = "ot-chat-greeting-seen";

/** WhatsApp glyph: speech bubble with a phone handset. */
function WaGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 3.2A12.8 12.8 0 0 0 5 22.5L3.3 28.7l6.4-1.7A12.8 12.8 0 1 0 16 3.2Zm0 23.3c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.8 1 1-3.7-.3-.4a10.5 10.5 0 1 1 9.1 4.8Z"
      />
      <path
        fill="currentColor"
        d="M21.8 18.6c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4Z"
      />
    </svg>
  );
}

/**
 * Floating WhatsApp button.
 * - Breathing rings + "online" dot, label slides out on hover (desktop).
 * - A small greeting bubble appears once per visit after a few seconds; it can be closed.
 * Without a WhatsApp number it falls back to a plain link to the contact page.
 */
export function WhatsAppWidget({
  whatsapp,
  message,
  contactHref,
  t,
}: {
  whatsapp: string;
  message?: string;
  contactHref: string;
  t: Dictionary["chat"];
}) {
  const href = whatsapp ? `https://wa.me/${whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}` : contactHref;
  const external = Boolean(whatsapp);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    if (!whatsapp) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (seen) return;
    const id = window.setTimeout(() => setBubble(true), 6000);
    return () => window.clearTimeout(id);
  }, [whatsapp]);

  function dismiss() {
    setBubble(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {/* Greeting bubble */}
      <AnimatePresence>
        {bubble && (
          <m.div
            role="dialog"
            aria-label={t.name}
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95, transition: { duration: 0.18 } }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            style={{ originX: 1, originY: 1 }}
            className="w-[min(300px,calc(100vw-2.5rem))] overflow-hidden rounded-[22px] bg-white shadow-[0_24px_60px_-20px_rgb(2_40_58/0.45),0_0_0_1px_rgb(10_13_20/0.06)]"
          >
            <div className="flex items-center gap-3 bg-[linear-gradient(135deg,#075e54,#128c7e)] px-4 py-3 text-white">
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                <Image src="/images/logo/logo-mark.png" alt="" width={24} height={24} />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[14px] font-semibold">{t.name}</span>
                <span className="block truncate text-[12px] text-white/75">{t.status}</span>
              </span>
              <button
                type="button"
                onClick={dismiss}
                aria-label={t.close}
                className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-white/80 hover:bg-white/15 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="bg-[#efeae2] px-4 py-4">
              <p className="relative max-w-[92%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 text-[14px] leading-snug text-fg shadow-sm">
                {t.greeting}
              </p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismiss}
                className="mt-3 flex h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5 active:scale-[0.97]"
              >
                <WaGlyph className="h-5 w-5" />
                {t.start}
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <m.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={t.label}
        onClick={dismiss}
        initial={{ scale: 0, opacity: 0, rotate: -30 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 1 }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.92 }}
        className="group relative flex h-[60px] items-center rounded-full bg-[linear-gradient(145deg,#3ee07a,#1ebe5a)] pl-[15px] pr-[15px] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_18px_40px_-12px_rgb(37_211_102/0.75)]"
      >
        {/* Breathing rings */}
        <span aria-hidden="true" className="wa-ring absolute inset-0 -z-10 rounded-full" />
        <span aria-hidden="true" className="wa-ring wa-ring-2 absolute inset-0 -z-10 rounded-full" />
        <WaGlyph className="h-[30px] w-[30px] transition-transform duration-300 group-hover:rotate-[-8deg]" />
        {/* Label slides out on hover (pointer devices) */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[15px] font-semibold opacity-0 transition-all duration-300 group-hover:ml-2.5 group-hover:max-w-[160px] group-hover:opacity-100">
          {t.label}
        </span>
        {/* Online dot */}
        {external && (
          <span aria-hidden="true" className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#22c55e]" />
        )}
      </m.a>
    </div>
  );
}
