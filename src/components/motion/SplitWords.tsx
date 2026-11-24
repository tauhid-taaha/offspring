import { Fragment } from "react";

/**
 * Headline that rises in word by word.
 * CSS-only (no JavaScript needed), so it starts the moment the page paints.
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
  /** seconds */
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
              <span
                className={`word-rise inline-block ${i >= words.length - highlight ? highlightClass ?? "" : ""}`}
                style={{ animationDelay: `${Math.round((delay + i * 0.045) * 1000)}ms` }}
              >
                {w}
              </span>
            </span>
            {/* the space sits outside the clipped word so it isn't collapsed */}
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </>
  );
}
