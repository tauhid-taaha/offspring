import Image from "next/image";
import clsx from "clsx";

/**
 * Offspring logo mark — from public/images/logo/logo.png.
 * The site uses logo-mark.png: the same artwork with the white background
 * removed and trimmed square. To change the logo, replace logo.png and
 * regenerate logo-mark.png (see public/images/README.md).
 */
const LOGO_SRC = "/images/logo/logo-mark.png";

export function LogoMark({
  className,
  size = 32,
  tile = false,
}: {
  className?: string;
  size?: number;
  /** Put the mark on a white rounded tile — use on dark backgrounds. */
  tile?: boolean;
}) {
  const img = (
    <Image
      src={LOGO_SRC}
      alt=""
      width={size}
      height={size}
      className={clsx("shrink-0 select-none", !tile && className)}
      priority
      aria-hidden="true"
    />
  );
  if (!tile) return img;
  const pad = Math.round(size * 0.22);
  return (
    <span
      className={clsx("inline-flex items-center justify-center rounded-2xl bg-white shadow-lg", className)}
      style={{ padding: pad }}
    >
      {img}
    </span>
  );
}

export function Logo({ className, compact = false, onDark = false }: { className?: string; compact?: boolean; onDark?: boolean }) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", onDark ? "text-white" : "text-fg", className)}>
      <LogoMark size={36} />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-semibold tracking-[0.14em]">OFFSPRING</span>
          <span className={clsx("mt-1 text-[9.5px] font-medium tracking-[0.5em]", onDark ? "text-white/60" : "text-fg-muted")}>SOLUTIONS</span>
        </span>
      )}
    </span>
  );
}
