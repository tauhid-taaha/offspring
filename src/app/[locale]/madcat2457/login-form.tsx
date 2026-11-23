"use client";

import { useFormStatus } from "react-dom";
import { login } from "./actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-[15px] font-semibold text-ink hover:bg-accent-strong disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function LoginForm({ locale, failed }: { locale: string; failed: boolean }) {
  return (
    <form action={login} className="card-surface w-full max-w-md rounded-3xl p-8">
      <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-subtle">Offspring</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Sign in</h1>
      <input type="hidden" name="locale" value={locale} />
      <label className="mt-8 block">
        <span className="mb-2 block text-[13px] font-medium text-fg-muted">Username</span>
        <input
          name="username"
          autoComplete="username"
          required
          className="h-12 w-full rounded-xl border border-line-strong bg-canvas px-4 text-[15px] outline-none focus:border-signal"
        />
      </label>
      <label className="mt-4 block">
        <span className="mb-2 block text-[13px] font-medium text-fg-muted">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="h-12 w-full rounded-xl border border-line-strong bg-canvas px-4 text-[15px] outline-none focus:border-signal"
        />
      </label>
      {failed && <p className="mt-4 text-[14px] text-pulse">Those details are not right.</p>}
      <div className="mt-6">
        <Submit />
      </div>
    </form>
  );
}
