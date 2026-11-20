"use client";

import { useState, type FormEvent } from "react";
import clsx from "clsx";
import type { Dictionary } from "@/i18n/dictionaries/en";

type Form = Dictionary["contact"]["form"];

/**
 * UI-only contact form. No backend yet — submit simulates a request.
 * Phase 2: replace `fakeSubmit` with a POST to an API route / form service.
 */
export function ContactForm({ t }: { t: Form }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900)); // fakeSubmit
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="card-surface flex min-h-[420px] flex-col items-start justify-center rounded-3xl p-8 sm:p-10" role="status">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pulse/15 text-pulse">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">{t.successTitle}</h2>
        <p className="mt-3 max-w-md text-fg-muted">{t.successBody}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 h-10 rounded-full border border-line-strong px-5 text-[14px] hover:bg-fg/5"
        >
          {t.reset}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-surface grid gap-5 rounded-3xl p-6 sm:grid-cols-2 sm:p-10">
      <Field label={t.name} name="name" required autoComplete="name" />
      <Field label={t.email} name="email" type="email" required autoComplete="email" />
      <Field label={t.company} name="company" autoComplete="organization" />
      <Field label={t.phone} name="phone" type="tel" required autoComplete="tel" />
      <div className="sm:col-span-2">
        <Field label={t.location} name="location" placeholder={t.locationPlaceholder} autoComplete="country-name" />
      </div>

      <fieldset className="sm:col-span-2">
        <legend className="mb-3 text-[13px] font-medium text-fg-muted">{t.interest}</legend>
        <div className="flex flex-wrap gap-2">
          {t.interestOptions.map((opt, i) => (
            <label key={opt} className="cursor-pointer">
              <input type="radio" name="interest" value={opt} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-flex h-9 items-center rounded-full border border-line-strong px-4 text-[14px] text-fg-muted transition-colors peer-checked:border-signal peer-checked:bg-signal/15 peer-checked:text-fg peer-focus-visible:outline-2 peer-focus-visible:outline-signal">
                {opt}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="sm:col-span-2">
        <span className="mb-2 block text-[13px] font-medium text-fg-muted">
          {t.message} <span className="text-pulse">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={t.messagePlaceholder}
          className={inputClass + " resize-y py-3"}
        />
      </label>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-accent-strong disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? t.sending : t.submit}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-line-strong bg-canvas px-4 text-[15px] text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-signal focus:bg-canvas";

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-[13px] font-medium text-fg-muted">
        {label} {required && <span className="text-pulse">*</span>}
      </span>
      <input name={name} type={type} required={required} autoComplete={autoComplete} placeholder={placeholder} className={clsx(inputClass, "h-12")} />
    </label>
  );
}
