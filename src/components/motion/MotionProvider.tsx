"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = () => import("./features").then((m) => m.default);

/** Shared easing for the whole site: quick out, soft landing. */
export const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Site-wide motion setup.
 * - LazyMotion + `m` components keep the initial JS small; features load after hydration.
 * - reducedMotion="user" turns movement off for people who ask their OS for less motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
