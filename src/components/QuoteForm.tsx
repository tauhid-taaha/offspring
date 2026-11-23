"use client";

import { useEffect, useId, useMemo, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import clsx from "clsx";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { submitQuote, type QuoteProduct } from "@/app/actions/quote";
import { isQuoteCategory, type QuoteCategory, type QuoteCategoryId } from "@/lib/quote-catalog";
import { Icon } from "./ui";

type FormText = Dictionary["contact"]["form"];
type QuoteText = Dictionary["contact"]["quote"];

const emptyProduct = (unit: string): QuoteProduct => ({ name: "", model: "", qty: "1", unit });

/**
 * Category-first quote form: pick Software / Supply / Install, then pick or add
 * items, then fill the details for that category, then contact details.
 * `?type=software|supply|install` in the URL preselects a category.
 */
export function QuoteForm({ t, q, catalog }: { t: FormText; q: QuoteText; catalog: QuoteCategory[] }) {
  const uid = useId();
  const [category, setCategory] = useState<QuoteCategoryId | null>(null);
  const [items, setItems] = useState<string[]>([]);
  const [custom, setCustom] = useState("");
  const [details, setDetails] = useState<Record<string, string>>({});
  const [products, setProducts] = useState<QuoteProduct[]>([emptyProduct(q.supply.unitOptions[0])]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [problem, setProblem] = useState("");

  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type");
    if (isQuoteCategory(type)) setCategory(type);
  }, []);

  const current = catalog.find((c) => c.id === category) ?? null;

  /** Product suggestions follow the chosen chips; with none chosen, all are offered. */
  const suggestions = useMemo(() => {
    if (!current) return [];
    const chosen = current.chips.filter((c) => items.includes(c.title));
    const source = chosen.length ? chosen : current.chips;
    return [...new Set(source.flatMap((c) => c.products))];
  }, [current, items]);

  function choose(id: QuoteCategoryId) {
    if (id === category) return;
    setCategory(id);
    setItems([]);
    setDetails({});
    setProducts([emptyProduct(q.supply.unitOptions[0])]);
    setProblem("");
  }

  function toggle(title: string) {
    setItems((list) => (list.includes(title) ? list.filter((i) => i !== title) : [...list, title]));
  }

  function addCustom() {
    const v = custom.trim().slice(0, 80);
    if (v && !items.includes(v)) setItems((list) => [...list, v]);
    setCustom("");
  }

  function onCustomKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustom();
    }
  }

  const set = (key: string) => (value: string) => setDetails((d) => ({ ...d, [key]: value }));

  function setProduct(i: number, patch: Partial<QuoteProduct>) {
    setProducts((list) => list.map((p, j) => (j === i ? { ...p, ...patch } : p)));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!category) return;
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const filled = products.filter((p) => p.name.trim() && Number(p.qty) > 0);
    if (category === "supply" && filled.length === 0) return setProblem(q.supply.needProduct);
    if (category !== "supply" && items.length === 0) return setProblem(q.pickItem);
    setProblem("");

    const data = new FormData(form);
    setStatus("sending");
    const result = await submitQuote({
      category,
      items,
      details: category === "supply" ? { ...details, products: filled } : details,
      contact: {
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        company: String(data.get("company") ?? ""),
        phone: String(data.get("phone") ?? ""),
        location: String(data.get("location") ?? ""),
      },
    });
    setStatus(result.ok ? "sent" : "error");
  }

  if (status === "sent") {
    return (
      <div className="card-surface flex min-h-[420px] flex-col items-start justify-center rounded-3xl p-8 sm:p-10" role="status">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pulse/15 text-pulse">
          <Icon name="check" className="h-5 w-5" />
        </span>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">{t.successTitle}</h2>
        <p className="mt-3 max-w-md text-fg-muted">{t.successBody}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setCategory(null);
            setItems([]);
            setDetails({});
            setProducts([emptyProduct(q.supply.unitOptions[0])]);
          }}
          className="mt-8 h-10 rounded-full border border-line-strong px-5 text-[14px] hover:bg-fg/5"
        >
          {t.reset}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card-surface grid gap-8 rounded-3xl p-5 sm:p-7">
      {/* 1 · Category */}
      <Step n={1} title={q.step1}>
        <div role="radiogroup" aria-label={q.step1} className="grid gap-3 sm:grid-cols-3">
          {catalog.map((c) => {
            const on = c.id === category;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => choose(c.id)}
                className={clsx(
                  "grid grid-cols-[auto_1fr] items-center gap-x-3 rounded-2xl border p-3 text-left sm:flex sm:flex-col sm:items-start sm:p-4 transition-colors focus-visible:outline-2 focus-visible:outline-signal",
                  on ? "border-signal bg-signal-soft" : "border-line-strong bg-canvas hover:border-fg/25",
                )}
              >
                <span
                  className={clsx(
                    "row-span-2 flex h-10 w-10 items-center justify-center rounded-xl sm:row-span-1",
                    on ? "bg-signal text-white" : "bg-surface text-signal",
                  )}
                >
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <span className="text-[15px] font-semibold leading-snug tracking-tight sm:mt-3">
                  {c.title}
                  <span className="ml-2 font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-fg-subtle sm:hidden">{c.coverage}</span>
                </span>
                <span className="text-[13px] leading-snug text-fg-muted sm:mt-1">{c.text}</span>
                <span className="mt-3 hidden rounded-full sm:inline bg-canvas px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle ring-1 ring-line">
                  {c.coverage}
                </span>
              </button>
            );
          })}
        </div>
      </Step>

      {current && (
        <>
          {/* 2 · Items */}
          <Step n={2} title={q.step2} hint={q.step2Hint}>
            <div className="flex flex-wrap gap-2">
              {current.chips.map((chip) => {
                const on = items.includes(chip.title);
                return (
                  <button
                    key={chip.title}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(chip.title)}
                    className={clsx(
                      "inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-signal",
                      on ? "border-signal bg-signal/15 text-fg" : "border-line-strong text-fg-muted hover:border-fg/25",
                    )}
                  >
                    {on && <Icon name="check" className="h-3.5 w-3.5 text-signal" />}
                    {chip.title}
                  </button>
                );
              })}
              {items
                .filter((i) => !current.chips.some((c) => c.title === i))
                .map((i) => (
                  <span
                    key={i}
                    className="inline-flex h-9 items-center gap-1 rounded-full border border-signal bg-signal/15 pl-4 pr-1.5 text-[14px]"
                  >
                    {i}
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-label={`${q.remove} ${i}`}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-fg-muted hover:bg-fg/10"
                    >
                      ×
                    </button>
                  </span>
                ))}
            </div>
            <div className="mt-3 flex max-w-md gap-2">
              <input
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                onKeyDown={onCustomKey}
                aria-label={q.addOther}
                placeholder={`${q.addOther} — ${q.addOtherPlaceholder}`}
                maxLength={80}
                className={clsx(inputClass, "h-10")}
              />
              <button
                type="button"
                onClick={addCustom}
                className="h-10 shrink-0 rounded-full border border-line-strong px-4 text-[14px] font-medium hover:bg-fg/5"
              >
                {q.add}
              </button>
            </div>
          </Step>

          {/* 3 · Details */}
          <Step n={3} title={q.step3}>
            {current.id === "software" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Select label={q.software.budget} options={q.software.budgetOptions} value={details.budget} onChange={set("budget")} />
                <Select label={q.software.timeline} options={q.software.timelineOptions} value={details.timeline} onChange={set("timeline")} />
                <div className="sm:col-span-2">
                  <Text label={q.software.website} type="url" placeholder={q.software.websitePlaceholder} value={details.website} onChange={set("website")} />
                </div>
                <div className="sm:col-span-2">
                  <Area label={q.software.message} placeholder={q.software.messagePlaceholder} value={details.message} onChange={set("message")} required />
                </div>
              </div>
            )}

            {current.id === "supply" && (
              <div className="grid gap-4">
                <fieldset>
                  <legend className="mb-2 text-[13px] font-medium text-fg-muted">
                    {q.supply.products} <span className="text-pulse">*</span>
                  </legend>
                  <datalist id={`${uid}-products`}>
                    {suggestions.map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                  <ul className="grid gap-3">
                    {products.map((p, i) => (
                      <li key={i} className="grid grid-cols-[1fr_4.5rem_5rem_auto] gap-2 rounded-2xl bg-surface p-3">
                        <input
                          value={p.name}
                          onChange={(e) => setProduct(i, { name: e.target.value })}
                          list={`${uid}-products`}
                          aria-label={`${q.supply.productName} ${i + 1}`}
                          placeholder={q.supply.productPlaceholder}
                          maxLength={120}
                          className={clsx(inputClass, "col-span-4 h-11")}
                        />
                        <input
                          value={p.model}
                          onChange={(e) => setProduct(i, { model: e.target.value })}
                          aria-label={`${q.supply.model} ${i + 1}`}
                          placeholder={q.supply.model}
                          maxLength={160}
                          className={clsx(inputClass, "h-11")}
                        />
                        <input
                          value={p.qty}
                          onChange={(e) => setProduct(i, { qty: e.target.value })}
                          type="number"
                          min={1}
                          inputMode="numeric"
                          aria-label={`${q.supply.qty} ${i + 1}`}
                          className={clsx(inputClass, "h-11 px-3")}
                        />
                        <select
                          value={p.unit}
                          onChange={(e) => setProduct(i, { unit: e.target.value })}
                          aria-label={`${q.supply.unit} ${i + 1}`}
                          className={clsx(inputClass, "h-11 px-2")}
                        >
                          {q.supply.unitOptions.map((u) => (
                            <option key={u}>{u}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => setProducts((list) => (list.length > 1 ? list.filter((_, j) => j !== i) : list))}
                          disabled={products.length === 1}
                          aria-label={`${q.remove} ${i + 1}`}
                          className="flex h-11 w-9 items-center justify-center rounded-full text-lg text-fg-muted hover:bg-fg/10 disabled:opacity-30"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setProducts((list) => [...list, emptyProduct(q.supply.unitOptions[0])])}
                    disabled={products.length >= 30}
                    className="mt-3 h-10 rounded-full border border-dashed border-line-strong px-4 text-[14px] font-medium text-fg-muted hover:border-signal hover:text-signal"
                  >
                    + {q.supply.addProduct}
                  </button>
                </fieldset>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Text label={q.supply.district} placeholder={q.supply.districtPlaceholder} value={details.district} onChange={set("district")} required />
                  <Text label={q.supply.neededBy} type="date" value={details.neededBy} onChange={set("neededBy")} />
                </div>
                <Area label={q.supply.message} placeholder={q.supply.messagePlaceholder} value={details.message} onChange={set("message")} />
              </div>
            )}

            {current.id === "install" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Text label={q.install.district} placeholder={q.install.districtPlaceholder} value={details.district} onChange={set("district")} required />
                <Select label={q.install.siteType} options={q.install.siteTypeOptions} value={details.siteType} onChange={set("siteType")} />
                <Text label={q.install.size} placeholder={q.install.sizePlaceholder} value={details.size} onChange={set("size")} />
                <Text label={q.install.visitDate} type="date" value={details.visitDate} onChange={set("visitDate")} />
                <fieldset className="sm:col-span-2">
                  <legend className="mb-2 text-[13px] font-medium text-fg-muted">{q.install.needSupply}</legend>
                  <div className="flex flex-wrap gap-2">
                    {q.install.needSupplyOptions.map((opt) => (
                      <label key={opt} className="cursor-pointer">
                        <input
                          type="radio"
                          name="needSupply"
                          value={opt}
                          checked={details.needSupply === opt}
                          onChange={() => set("needSupply")(opt)}
                          className="peer sr-only"
                        />
                        <span className="inline-flex h-9 items-center rounded-full border border-line-strong px-4 text-[14px] text-fg-muted transition-colors peer-checked:border-signal peer-checked:bg-signal/15 peer-checked:text-fg peer-focus-visible:outline-2 peer-focus-visible:outline-signal">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="sm:col-span-2">
                  <Area label={q.install.message} placeholder={q.install.messagePlaceholder} value={details.message} onChange={set("message")} required />
                </div>
              </div>
            )}
          </Step>

          {/* 4 · Contact */}
          <Step n={4} title={q.step4}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t.name} name="name" required autoComplete="name" />
              <Field label={t.email} name="email" type="email" required autoComplete="email" />
              <Field label={t.company} name="company" autoComplete="organization" />
              <Field label={t.phone} name="phone" type="tel" required autoComplete="tel" />
              <div className="sm:col-span-2">
                <Field label={t.location} name="location" placeholder={t.locationPlaceholder} autoComplete="country-name" />
              </div>
            </div>
          </Step>

          <div>
            {problem && (
              <p className="mb-3 text-[14px] font-medium text-pulse" role="alert">
                {problem}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-accent-strong disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? t.sending : t.submit}
            </button>
            {status === "error" && <p className="mt-3 text-[14px] text-pulse">{t.error}</p>}
          </div>
        </>
      )}
    </form>
  );
}

function Step({ n, title, hint, children }: { n: number; title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="fade-up">
      <h3 className="flex items-center gap-3 text-[16px] font-semibold tracking-tight">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-mono text-[12px] text-white">{n}</span>
        {title}
      </h3>
      {hint && <p className="ml-10 mt-1 text-[13px] text-fg-muted">{hint}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-line-strong bg-canvas px-4 text-[15px] text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-signal focus:bg-canvas";

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <span className="mb-2 block text-[13px] font-medium text-fg-muted">
      {text} {required && <span className="text-pulse">*</span>}
    </span>
  );
}

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
      <Label text={label} required={required} />
      <input name={name} type={type} required={required} autoComplete={autoComplete} placeholder={placeholder} className={clsx(inputClass, "h-12")} />
    </label>
  );
}

type Controlled = { label: string; value?: string; onChange: (v: string) => void; required?: boolean };

function Text({ label, value, onChange, required, type = "text", placeholder }: Controlled & { type?: string; placeholder?: string }) {
  return (
    <label>
      <Label text={label} required={required} />
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className={clsx(inputClass, "h-12")}
      />
    </label>
  );
}

function Select({ label, value, onChange, required, options }: Controlled & { options: string[] }) {
  return (
    <label>
      <Label text={label} required={required} />
      <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} required={required} className={clsx(inputClass, "h-12")}>
        <option value="">—</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Area({ label, value, onChange, required, placeholder }: Controlled & { placeholder?: string }) {
  return (
    <label className="block">
      <Label text={label} required={required} />
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={4}
        maxLength={4000}
        placeholder={placeholder}
        className={clsx(inputClass, "resize-y py-3")}
      />
    </label>
  );
}
