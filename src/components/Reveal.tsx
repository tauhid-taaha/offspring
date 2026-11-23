"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { ease } from "./motion/MotionProvider";

const tags = { div: m.div, li: m.li, section: m.section };

/** Rises and sharpens content once it scrolls into view (once per page view). */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  /** milliseconds */
  delay?: number;
  as?: keyof typeof tags;
}) {
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease, delay: delay / 1000 }}
    >
      {children}
    </Tag>
  );
}
