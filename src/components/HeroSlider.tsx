"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, m } from "motion/react";
import { Arrow, Icon } from "./ui";

export type HeroSlide = {
  id: string;
  icon: string;
  tag: string;
  caption: string;
  href: string;
  icons: string[];
  /** [top-left photo, bottom-right photo] — null shows a designed placeholder */
  images: (string | null)[];
  stats: { value: string; label: string }[];
};

const INTERVAL = 6000;

/**
 * Diagonal two-photo hero (photo · text / text · photo) with one slide per division.
 * Auto-advances, pauses on hover/focus, swipeable, and respects reduced motion.
 */
export function HeroSlider({
  slides,
  labels,
}: {
  slides: HeroSlide[];
  labels: { prev: string; next: string; explore: string };
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const n = slides.length;

  const go = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => go(active + 1), INTERVAL);
    return () => window.clearTimeout(id);
  }, [active, paused, go]);

  const s = slides[active];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
        startX.current = null;
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label={s.tag}
    >
      {/* Caption row */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={s.id}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full bg-signal-soft px-3 py-1.5 text-[13px] font-semibold text-signal"
          >
            <Icon name={s.icon} className="h-4 w-4" />
            {s.tag}
          </m.span>
        </AnimatePresence>
        <Link href={s.href} className="group inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-fg hover:text-signal">
          {labels.explore}
          <Arrow />
        </Link>
      </div>

      {/* Stacked slides (all rendered so height never jumps) */}
      <div className="grid [grid-template-areas:'stack']">
        {slides.map((slide, i) => {
          const on = i === active;
          return (
            <div
              key={slide.id}
              aria-hidden={!on}
              className={clsx(
                "grid grid-cols-2 gap-3 transition-opacity duration-500 [grid-area:stack] sm:gap-4",
                on ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <Photo src={slide.images[0]} icon={slide.icons[0]} alt={slide.tag} on={on} from="left" />
              <Stat {...slide.stats[0]} on={on} delay={120} />
              <Stat {...slide.stats[1]} on={on} delay={200} />
              <Photo src={slide.images[1]} icon={slide.icons[1]} alt={slide.caption} on={on} from="right" />
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-6">
        <div role="tablist" className="grid grid-cols-3 gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              role="tab"
              aria-selected={i === active}
              aria-label={slide.tag}
              onClick={() => go(i)}
              className={clsx(
                "group relative isolate overflow-hidden rounded-xl px-2 py-2.5 text-left transition-colors",
                i !== active && "hover:bg-canvas/70",
              )}
            >
              {i === active && (
                <m.span
                  layoutId="hero-tab"
                  className="absolute inset-0 -z-10 rounded-xl bg-canvas shadow-sm ring-1 ring-line"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="flex items-center justify-center gap-2 sm:justify-start">
                <Icon name={slide.icon} className={clsx("h-4 w-4 shrink-0", i === active ? "text-signal" : "text-fg-subtle")} />
                <span
                  className={clsx(
                    "hidden text-[13px] font-medium leading-tight sm:line-clamp-2",
                    i === active ? "text-fg" : "text-fg-muted",
                  )}
                >
                  {slide.tag}
                </span>
              </span>
              {/* progress bar */}
              <span className="absolute inset-x-2 bottom-1 h-0.5 overflow-hidden rounded-full bg-line">
                <span
                  key={`${active}-${paused}`}
                  className={clsx(
                    "block h-full origin-left rounded-full bg-signal",
                    i === active ? (paused ? "scale-x-100" : "animate-[grow_6s_linear_forwards]") : "scale-x-0",
                  )}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** One division's home-hero collage, held still — no autoplay or tabs. */
export function HeroPanel({ slide }: { slide: HeroSlide }) {
  return (
    <div className="grid w-full grid-cols-2 gap-2.5 sm:gap-3">
      <Photo src={slide.images[0]} icon={slide.icons[0]} alt={slide.tag} on from="left" large />
      <Stat {...slide.stats[0]} on delay={0} />
      <Stat {...slide.stats[1]} on delay={0} />
      <Photo src={slide.images[1]} icon={slide.icons[1]} alt={slide.caption} on from="right" large />
    </div>
  );
}

function Photo({
  src,
  icon,
  alt,
  on,
  from,
  large = false,
}: {
  src: string | null;
  icon: string;
  alt: string;
  on: boolean;
  from: "left" | "right";
  large?: boolean;
}) {
  return (
    <m.div
      className={clsx(
        "relative overflow-hidden rounded-2xl bg-surface shadow-[0_20px_50px_-24px_rgb(10_13_20/0.4)] ring-1 ring-line",
        large ? "aspect-[3/2]" : "aspect-[7/5]",
      )}
      initial={false}
      animate={on ? { x: 0, scale: 1, rotate: 0 } : { x: from === "left" ? -36 : 36, scale: 0.94, rotate: from === "left" ? -1.5 : 1.5 }}
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 160, damping: 22 }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={large ? "(min-width: 1024px) 420px, 46vw" : "(min-width: 1024px) 340px, 45vw"} className="object-cover" priority={on} />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#e6f4ee_0%,#eefaf0_100%)]">
          <div className="bg-grid absolute inset-0 [background-size:24px_24px] [mask-image:radial-gradient(circle,#000_30%,transparent_75%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-canvas text-signal shadow-sm ring-1 ring-line sm:h-16 sm:w-16">
              <Icon name={icon} className="h-7 w-7" />
            </span>
          </div>
        </div>
      )}
    </m.div>
  );
}

function Stat({ value, label, on, delay }: { value: string; label: string; on: boolean; delay: number }) {
  return (
    <m.div
      className="flex flex-col items-center justify-center px-2 text-center"
      initial={false}
      animate={on ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 14, filter: "blur(6px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: on ? delay / 1000 : 0 }}
    >
      <span className="text-xl font-semibold tracking-tight text-fg sm:text-3xl">{value}</span>
      <span className="mt-1.5 text-[13px] leading-snug text-fg-muted sm:text-[17px]">{label}</span>
    </m.div>
  );
}
