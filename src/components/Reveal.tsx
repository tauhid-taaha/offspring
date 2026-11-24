"use client";

import { useEffect, useRef, type ReactNode } from "react";
import clsx from "clsx";

/**
 * Fades + lifts content once it scrolls into view.
 * Pure CSS transition on opacity/transform (GPU-composited, no blur filters), so it
 * stays smooth with many items on screen. One shared IntersectionObserver for all.
 */
let observer: IntersectionObserver | null = null;
function watch(el: Element) {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer?.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
  }
  observer.observe(el);
  return () => observer?.unobserve(el);
}

const tags = { div: "div", li: "li", section: "section" } as const;

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
  const ref = useRef<HTMLElement>(null);
  useEffect(() => (ref.current ? watch(ref.current) : undefined), []);
  const Tag = tags[as];
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={clsx("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
