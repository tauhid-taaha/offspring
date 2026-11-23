"use client";

import { Fragment } from "react";
import { m } from "motion/react";
import { ease } from "./MotionProvider";

/**
 * Headline that rises in word by word with a short blur-to-sharp.
 * The full sentence stays in the DOM for screen readers and search engines.
 */
export function SplitWords({
  text,
  highlight = 0,
  highlightClass,
  delay = 0,
}: {
  text: string;
  /** How many trailing words get `highlightClass`. */
  highlight?: number;
  highlightClass?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <m.span
              className={`inline-block ${i >= words.length - highlight ? highlightClass ?? "" : ""}`}
              initial={{ y: "70%", opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.55, ease, delay: delay + i * 0.045 }}
            >
              {w}
            </m.span>
          </span>
          {/* the space sits outside the clipped word so it isn't collapsed */}
          {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </>
  );
}
