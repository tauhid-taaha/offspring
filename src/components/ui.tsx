import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={clsx(
        "inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-fg-muted",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-pulse shadow-[0_0_12px_2px_rgb(31_168_90/0.6)]" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-gradient mt-5 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-pretty text-lg leading-relaxed text-fg-muted">{subtitle}</p>}
    </div>
  );
}

type ButtonProps = ComponentProps<typeof Link> & {
  /** `onDark*` variants are for use on dark bands / image overlays. */
  variant?: "primary" | "secondary" | "onDarkPrimary" | "onDarkSecondary";
};

export function ButtonLink({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <Link
      {...props}
      className={clsx(
        "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-medium transition-all duration-200",
        variant === "primary" &&
          "bg-accent text-ink font-semibold shadow-[0_8px_24px_-10px_rgb(245_158_11/0.7)] hover:bg-accent-strong",
        variant === "secondary" &&
          "border border-line-strong bg-canvas/70 text-fg backdrop-blur hover:border-fg/25 hover:bg-fg/[0.04]",
        variant === "onDarkPrimary" && "bg-accent font-semibold text-ink hover:bg-accent-strong",
        variant === "onDarkSecondary" && "border border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white/10",
        className,
      )}
    >
      {children}
      <Arrow />
    </Link>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      aria-hidden="true"
      className={clsx("transition-transform duration-200 group-hover:translate-x-0.5", className)}
    >
      <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const icons: Record<string, ReactNode> = {
  code: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  box: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
    </>
  ),
  bolt: <path d="M13 3L5 13.5h6L10 21l9-11h-6l1-7z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4V5zM8 9.5h8M8 12.5h5" />,
  school: (
    <>
      <path d="M2.5 9L12 4.5 21.5 9 12 13.5 2.5 9z" />
      <path d="M6.5 11v4.5c1.5 1.5 3.4 2.2 5.5 2.2s4-.7 5.5-2.2V11M21.5 9v5" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.5l2.2 10.5h10.6L20.5 7H6.4" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  thread: (
    <>
      <path d="M7 3h10M7 21h10M8 3v18M16 3v18" />
      <path d="M8 7l8 3M8 11l8 3M8 15l8 3" />
    </>
  ),
  book: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15zM4 20.5A2.5 2.5 0 0 0 6.5 23H20M8 7h8" />,
  rocket: (
    <>
      <path d="M12 15l-3-3c1.5-4.5 4.5-8 10-9-1 5.5-4.5 8.5-9 10z" />
      <path d="M9 12l-4 .5L3 15l4 1M12 15l-.5 4L9 21l-1-4M15 7.5h.01" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  cloud: <path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 9.5 4.25 4.25 0 0 0 7 18z" />,
  plug: <path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0V8zM12 16v5" />,
  chart: <path d="M4 20h16M7 16v-5M12 16V7M17 16v-8" />,
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
    </>
  ),
  crane: <path d="M7 21V3M4 21h7M7 4h13M7 4l4 4M18 4v6M16.5 10h3v3h-3z" />,
  antenna: (
    <>
      <circle cx="12" cy="8" r="2" />
      <path d="M12 10v11M8.5 21h7M7.8 4.2a6 6 0 0 0 0 7.6M16.2 4.2a6 6 0 0 1 0 7.6" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="4" width="16" height="7" rx="1.5" />
      <rect x="4" y="13" width="16" height="7" rx="1.5" />
      <path d="M8 7.5h.01M8 16.5h.01" />
    </>
  ),
  fan: (
    <>
      <circle cx="12" cy="12" r="1.5" />
      <path d="M12 10.5C12 6 9 4 7 5s-1 5 5 5.5zM13.5 12c4.5 0 6.5-3 5.5-5s-5-1-5.5 5zM12 13.5c0 4.5 3 6.5 5 5.5s1-5-5-5.5zM10.5 12C6 12 4 15 5 17s5 1 5.5-5z" />
    </>
  ),
  flask: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3M7.5 15h9" />,
  medical: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </>
  ),
  building: <path d="M4 21V5l8-2v18M12 8l8 2v11M3 21h18M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2" />,
  wrench: <path d="M15 4a5 5 0 0 0-4.6 6.9L4 17.3V20h2.7l6.4-6.4A5 5 0 0 0 20 9l-3 1-2-2 1-3z" />,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {icons[name]}
    </svg>
  );
}
