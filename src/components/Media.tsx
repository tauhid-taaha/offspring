import Image from "next/image";
import clsx from "clsx";
import { Icon } from "./ui";
import { findSlot } from "@/lib/images";

/**
 * Card image slot. Shows the photo when one exists, otherwise a designed
 * fallback (soft grid + large line icon) so the layout never looks empty.
 */
export function ImageSlot({
  src,
  alt,
  icon,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  src: string | null;
  alt: string;
  icon: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={clsx("relative overflow-hidden bg-surface", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <>
          <div className="bg-grid absolute inset-0 [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_80%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgb(0_119_95/0.10),transparent_60%),radial-gradient(circle_at_20%_90%,rgb(31_168_90/0.10),transparent_55%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-line-strong bg-canvas text-signal shadow-sm transition-transform duration-500 group-hover:scale-105">
              <Icon name={icon} className="h-7 w-7" />
            </span>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Full-bleed background for hero/banners. With an image: photo + ink overlay
 * (content should be white). Without: tone-appropriate grid + glow fallback.
 */
export function Backdrop({
  src,
  tone,
  priority,
}: {
  src: string | null;
  tone: "light" | "dark";
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className="absolute inset-0" aria-hidden="true">
        <Image src={src} alt="" fill priority={priority} sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(10_13_20/0.88)_0%,rgb(10_13_20/0.65)_45%,rgb(10_13_20/0.25)_100%)]" />
        <div className="absolute inset-0 bg-ink/40 lg:bg-transparent" />
      </div>
    );
  }
  if (tone === "dark") {
    return (
      <div className="absolute inset-0 bg-ink" aria-hidden="true">
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_70%_50%,#000_20%,transparent_75%)]" />
        <div className="absolute -right-40 top-1/2 h-[520px] w-[820px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(0_119_95/0.5),transparent)]" />
      </div>
    );
  }
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#e7f6ee_0%,#f7fbf8_42%,#ffffff_78%)]" />
      <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_78%_42%,transparent_0,transparent_26px,rgb(0_119_95/0.075)_27px,transparent_28px)] [mask-image:radial-gradient(circle_at_78%_42%,#000_12%,transparent_68%)]" />
      <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_50%_80%_at_0%_0%,#000_25%,transparent_75%)]" />
      <div className="absolute -left-24 top-8 h-[420px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(31_168_90/0.16),transparent)] blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-[280px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(0_119_95/0.10),transparent)] blur-3xl" />
    </div>
  );
}

/**
 * Optional photo background for any section. If the photo is missing, a quiet
 * grid and glow are painted instead so the section is not a flat field.
 * The parent section must be `relative isolate`.
 *  - tone "light": photo under a strong white wash (dark text stays readable)
 *  - tone "dark":  photo under a navy wash (white text stays readable)
 */
function Ambient({ tone, slot }: { tone: "light" | "dark"; slot: string }) {
  const n = [...slot].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const fromRight = n % 2 === 0;

  if (tone === "dark") {
    return (
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_18%,transparent_72%)]" />
        <div className="absolute -right-16 top-0 h-72 w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(0_119_95/0.35),transparent)]" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="bg-grid absolute inset-0 opacity-80"
        style={{
          maskImage: `radial-gradient(ellipse 60% 75% at ${fromRight ? "100% 0%" : "0% 100%"}, #000 12%, transparent 72%)`,
          WebkitMaskImage: `radial-gradient(ellipse 60% 75% at ${fromRight ? "100% 0%" : "0% 100%"}, #000 12%, transparent 72%)`,
        }}
      />
      <div
        className="absolute h-[340px] w-[480px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, rgb(0 119 95 / 0.11), transparent)",
          ...(fromRight ? { right: "-3rem", top: "-4rem" } : { left: "-4rem", bottom: "-3rem" }),
        }}
      />
    </div>
  );
}

export function SectionBg({
  slot,
  tone = "light",
  ambient = true,
}: {
  slot: string;
  tone?: "light" | "dark";
  ambient?: boolean;
}) {
  const src = findSlot(slot);
  if (!src) return ambient ? <Ambient tone={tone} slot={slot} /> : null;
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      <div
        className={
          tone === "dark"
            ? "absolute inset-0 bg-[linear-gradient(180deg,rgb(2_40_58/0.88),rgb(2_40_58/0.80))]"
            : "absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.90),rgb(255_255_255/0.84))]"
        }
      />
    </div>
  );
}
