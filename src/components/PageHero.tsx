import clsx from "clsx";
import { Container, Eyebrow } from "./ui";
import { Backdrop } from "./Media";
import { RouteMap } from "./RouteMap";
import { findSlot } from "@/lib/images";

/**
 * Inner-page header. Pass `cover` (e.g. "about/cover") to allow an optional
 * full-width photo: if public/images/about/cover.jpg exists it is used with a
 * dark overlay and white text; otherwise the light grid design is shown.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  cover,
  compact = false,
  map = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  cover?: string;
  compact?: boolean;
  map?: boolean;
}) {
  const img = cover ? findSlot(cover) : null;
  const onPhoto = Boolean(img);

  return (
    <section
      className={clsx(
        "relative isolate overflow-hidden",
        compact ? "pb-6 pt-24 sm:pb-8 sm:pt-28" : "border-b border-line pb-20 pt-36 sm:pb-24 sm:pt-44",
        onPhoto && "text-white",
      )}
    >
      <Backdrop src={img} tone="light" priority />
      {map && !onPhoto && <RouteMap />}
      <Container className="relative">
        <div className="fade-up">
          <Eyebrow className={onPhoto ? "!text-white/75" : ""}>{eyebrow}</Eyebrow>
        </div>
        <div className="fade-up" style={{ animationDelay: "80ms" }}>
          <h1
            className={clsx(
              "max-w-4xl text-balance font-semibold leading-[1.05] tracking-[-0.04em]",
              compact ? "mt-4 text-4xl sm:text-5xl" : "mt-6 text-4xl sm:text-6xl",
              onPhoto ? "text-gradient-light" : "text-gradient",
            )}
          >
            {title}
          </h1>
        </div>
        {subtitle && (
          <div className="fade-up" style={{ animationDelay: "160ms" }}>
            <p
              className={clsx(
                compact ? "mt-3 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg" : "mt-6 max-w-2xl text-pretty text-lg leading-relaxed sm:text-xl",
                onPhoto ? "text-white/75" : "text-fg-muted",
              )}
            >
              {subtitle}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
