import { useId } from "react";
import clsx from "clsx";

/**
 * Offspring symbol — CONCEPT, not the final logo.
 * A parent ring ("O") emitting a child node: growth + connection.
 * The connector and stem together read as a "T".
 */
export function LogoMark({ className, size = 32 }: { className?: string; size?: number }) {
  const id = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="4" y1="28" x2="28" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2F52F5" />
          <stop offset="1" stopColor="#0BA89B" />
        </linearGradient>
      </defs>
      {/* Parent ring */}
      <circle cx="13" cy="19" r="8.25" stroke="currentColor" strokeWidth="3.5" />
      {/* Connector (T crossbar + stem) */}
      <path d="M19 13 L23.5 8.5" stroke={`url(#${id}-g)`} strokeWidth="3.5" strokeLinecap="round" />
      {/* Offspring node */}
      <circle cx="25.5" cy="6.5" r="4" fill={`url(#${id}-g)`} />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5 text-fg", className)}>
      <LogoMark />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-semibold tracking-[0.14em]">OFFSPRING</span>
          <span className="mt-1 text-[9.5px] font-medium tracking-[0.34em] text-fg-muted">TECHNOLOGIES</span>
        </span>
      )}
    </span>
  );
}
