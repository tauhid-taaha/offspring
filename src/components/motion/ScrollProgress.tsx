"use client";

import { m, useScroll, useSpring } from "motion/react";

/** Thin brand-coloured bar along the top edge that tracks reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[linear-gradient(90deg,var(--color-signal),var(--color-pulse),var(--color-accent))]"
    />
  );
}
