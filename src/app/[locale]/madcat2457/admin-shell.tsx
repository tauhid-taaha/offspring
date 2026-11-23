import Link from "next/link";
import type { ReactNode } from "react";
import clsx from "clsx";
import { logout } from "./actions";

export const DESK = "madcat2457";

/** Shared admin header: section tabs (Messages · Cards) and log out. */
export function AdminShell({
  locale,
  active,
  title,
  wide = false,
  children,
}: {
  locale: string;
  active: "messages" | "cards";
  title: string;
  wide?: boolean;
  children: ReactNode;
}) {
  const tabs = [
    { id: "messages", label: "Messages", to: `/${locale}/${DESK}` },
    { id: "cards", label: "Cards", to: `/${locale}/${DESK}/cards` },
  ] as const;

  return (
    <main id="main" className="min-h-dvh px-5 py-10 sm:px-8">
      <div className={clsx("mx-auto w-full", wide ? "max-w-6xl" : "max-w-3xl")}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-subtle">Offspring · Admin</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <nav aria-label="Admin sections" className="flex rounded-full bg-surface p-1 ring-1 ring-line">
              {tabs.map((t) => (
                <Link
                  key={t.id}
                  href={t.to}
                  aria-current={active === t.id ? "page" : undefined}
                  className={clsx(
                    "rounded-full px-4 py-1.5 text-[14px] font-medium transition-colors",
                    active === t.id ? "bg-canvas text-fg shadow-sm ring-1 ring-line" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {t.label}
                </Link>
              ))}
            </nav>
            <form action={logout}>
              <input type="hidden" name="locale" value={locale} />
              <button type="submit" className="h-10 rounded-full border border-line-strong px-4 text-[14px] hover:bg-fg/5">
                Log out
              </button>
            </form>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
