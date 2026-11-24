"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import clsx from "clsx";
import { AnimatePresence, m } from "motion/react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { submitQuote, type QuoteProduct } from "@/app/actions/quote";
import { isValidEmail, isValidPhone } from "@/lib/contact-check";
import { isQuoteCategory, type QuoteCategory, type QuoteCategoryId } from "@/lib/quote-catalog";
import { ease } from "./motion/MotionProvider";
import { Icon } from "./ui";

type FormText = Dictionary["contact"]["form"];
type QuoteText = Dictionary["contact"]["quote"];
/** A product row plus a stable key, so rows animate correctly when one is removed. */
type Row = QuoteProduct & { key: number };

const spring = { type: "spring", stiffness: 420, damping: 32 } as const;

/**
 * Category-first quote form: pick Software / Supply / Install, then pick or add
 * items, then fill the details for that category, then contact details.
 * `?type=software|supply|install` in the URL preselects a category.
 */
export function QuoteForm({ t, q, catalog }: { t: FormText; q: QuoteText; catalog: QuoteCategory[] }) {
  const uid = useId();
  const nextKey = useRef(1);
  const newRow = (): Row => ({ key: nextKey.current++, name: "", model: "", qty: "1", unit: q.supply.unitOptions[0] });

  const [category, setCategory] = useState<QuoteCategoryId | null>(null);
  const [items, setItems] = useState<string[]>([]);
  const [custom, setCustom] = useState("");
  const [details, setDetails] = useState<Record<string, string>>({});
  const [products, setProducts] = useState<Row[]>(() => [{ key: 0, name: "", model: "", qty: "1", unit: q.supply.unitOptions[0] }]);
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

  function reset() {
    setItems([]);
    setDetails({});
    setProducts([newRow()]);
    setProblem("");
  }

  function choose(id: QuoteCategoryId) {
    if (id === category) return;
    setCategory(id);
    reset();
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

  function setProduct(key: number, patch: Partial<QuoteProduct>) {
    setProducts((list) => list.map((p) => (p.key === key ? { ...p, ...patch } : p)));
  }

  function finishInvalid(message: string) {
    setStatus("idle");
    setProblem(message);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!category) return;
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const filled = products
      .filter((p) => p.name.trim() && Number(p.qty) > 0)
      .map(({ name, model, qty, unit }) => ({ name, model, qty, unit }));
    if (category === "supply" && filled.length === 0) return setProblem(q.supply.needProduct);
    if (category !== "supply" && items.length === 0) return setProblem(q.pickItem);
    setProblem("");

    const data = new FormData(form);
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    if (!isValidEmail(email)) return setProblem(t.emailInvalid);
    if (!isValidPhone(phone)) return setProblem(t.phoneInvalid);
    setStatus("sending");
    const result = await submitQuote({
      category,
      items,
      details: category === "supply" ? { ...details, products: filled } : details,
      contact: {
        name: String(data.get("name") ?? ""),
        email,
        company: String(data.get("company") ?? ""),
        phone,
        location: String(data.get("location") ?? ""),
      },
    });
    if (result.ok) {
      setStatus("sent");
      return;
    }
    if (result.error === "email") return finishInvalid(t.emailInvalid);
    if (result.error === "phone") return finishInvalid(t.phoneInvalid);
    setStatus("error");
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <m.div
          key="sent"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="card-surface flex min-h-[420px] flex-col items-start justify-center rounded-3xl p-8 sm:p-10"
          role="status"
        >
          <m.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.15 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-pulse/15 text-pulse"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
              <m.path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.35, ease }}
              />
            </svg>
          </m.span>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight">{t.successTitle}</h2>
          <p className="mt-3 max-w-md text-fg-muted">{t.successBody}</p>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setCategory(null);
              reset();
            }}
            className="mt-8 h-10 rounded-full border border-line-strong px-5 text-[14px] transition-transform hover:bg-fg/5 active:scale-[0.97]"
          >
            {t.reset}
          </button>
        </m.div>
      ) : (
        <m.form
          key="form"
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.25 } }}
          onSubmit={onSubmit}
          noValidate
          className="card-surface grid gap-8 rounded-3xl p-5 sm:p-7"
        >
          {/* 1 · Category */}
          <Step n={1} title={q.step1} done={Boolean(current)}>
            <div role="radiogroup" aria-label={q.step1} className="grid gap-3 sm:grid-cols-3">
              {catalog.map((c) => {
                const on = c.id === category;
                return (
                  <m.button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => choose(c.id)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    transition={spring}
                    className={clsx(
                      "relative isolate grid grid-cols-[auto_1fr] items-center gap-x-3 rounded-2xl border p-3 text-left transition-[border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-signal sm:flex sm:flex-col sm:items-start sm:p-4",
                      on
                        ? "border-signal shadow-[0_18px_40px_-22px_rgb(0_119_95/0.55)]"
                        : "border-line-strong bg-canvas hover:border-fg/25 hover:shadow-[0_14px_30px_-20px_rgb(10_13_20/0.35)]",
                    )}
                  >
                    {/* Highlight that slides from card to card */}
                    {on && (
                      <m.span
                        layoutId={`${uid}-cat`}
                        className="absolute inset-0 -z-10 rounded-2xl bg-signal-soft"
                        transition={spring}
                      />
                    )}
                    <span
                      className={clsx(
                        "row-span-2 flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 sm:row-span-1",
                        on ? "bg-signal text-white" : "bg-surface text-signal",
                      )}
                    >
                      <Icon name={c.icon} className="h-5 w-5" />
                    </span>
                    <span className="text-[15px] font-semibold leading-snug tracking-tight sm:mt-3">
                      {c.title}
                      <span className="ml-2 font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-fg-subtle sm:hidden">
                        {c.coverage}
                      </span>
                    </span>
                    <span className="text-[13px] leading-snug text-fg-muted sm:mt-1">{c.text}</span>
                    <span className="mt-3 hidden rounded-full bg-canvas px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle ring-1 ring-line sm:inline">
                      {c.coverage}
                    </span>
                  </m.button>
                );
              })}
            </div>
          </Step>

          <AnimatePresence initial={false}>
            {current && (
              <m.div
                key="rest"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease }}
                className="-mx-2 overflow-hidden px-2"
              >
                <div className="grid gap-8 pb-1">
                  {/* 2 · Items */}
                  <Step n={2} title={q.step2} hint={q.step2Hint} done={items.length > 0}>
                    <AnimatePresence mode="wait" initial={false}>
                      <m.div
                        key={current.id}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0, transition: { duration: 0.12 } }}
                        variants={{ show: { transition: { staggerChildren: 0.025 } } }}
                        className="flex flex-wrap gap-2"
                      >
                        {current.chips.map((chip) => {
                          const on = items.includes(chip.title);
                          return (
                            <m.button
                              key={chip.title}
                              type="button"
                              layout
                              variants={pop}
                              aria-pressed={on}
                              onClick={() => toggle(chip.title)}
                              whileTap={{ scale: 0.94 }}
                              transition={spring}
                              className={clsx(
                                "inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-signal",
                                on ? "border-signal bg-signal/15 text-fg" : "border-line-strong text-fg-muted hover:border-fg/25 hover:text-fg",
                              )}
                            >
                              <AnimatePresence initial={false}>
                                {on && (
                                  <m.span
                                    initial={{ width: 0, opacity: 0, scale: 0 }}
                                    animate={{ width: "auto", opacity: 1, scale: 1 }}
                                    exit={{ width: 0, opacity: 0, scale: 0 }}
                                    transition={spring}
                                    className="inline-flex"
                                  >
                                    <Icon name="check" className="h-3.5 w-3.5 text-signal" />
                                  </m.span>
                                )}
                              </AnimatePresence>
                              {chip.title}
                            </m.button>
                          );
                        })}
                        <AnimatePresence mode="popLayout">
                          {items
                            .filter((i) => !current.chips.some((c) => c.title === i))
                            .map((i) => (
                              <m.span
                                key={i}
                                layout
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                transition={spring}
                                className="inline-flex h-9 items-center gap-1 rounded-full border border-signal bg-signal/15 pl-4 pr-1.5 text-[14px]"
                              >
                                {i}
                                <button
                                  type="button"
                                  onClick={() => toggle(i)}
                                  aria-label={`${q.remove} ${i}`}
                                  className="flex h-6 w-6 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-fg/10 hover:text-fg"
                                >
                                  ×
                                </button>
                              </m.span>
                            ))}
                        </AnimatePresence>
                      </m.div>
                    </AnimatePresence>
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
                      <m.button
                        type="button"
                        onClick={addCustom}
                        whileTap={{ scale: 0.94 }}
                        className="h-10 shrink-0 rounded-full border border-line-strong px-4 text-[14px] font-medium transition-colors hover:border-signal hover:text-signal"
                      >
                        {q.add}
                      </m.button>
                    </div>
                  </Step>

                  {/* 3 · Details */}
                  <Step n={3} title={q.step3}>
                    <AnimatePresence mode="wait" initial={false}>
                      <m.div
                        key={current.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.35, ease }}
                      >
                        {current.id === "software" && (
                          <Area label={q.software.message} placeholder={q.software.messagePlaceholder} value={details.message} onChange={set("message")} required />
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
                                <AnimatePresence initial={false} mode="popLayout">
                                  {products.map((p, i) => (
                                    <m.li
                                      key={p.key}
                                      layout
                                      initial={{ opacity: 0, y: -10, scale: 0.97 }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      exit={{ opacity: 0, x: 40, scale: 0.95, transition: { duration: 0.2 } }}
                                      transition={spring}
                                      className="grid grid-cols-[1fr_4.5rem_5rem_auto] gap-2 rounded-2xl bg-surface p-3 ring-1 ring-transparent transition-shadow focus-within:ring-signal/30"
                                    >
                                      <input
                                        value={p.name}
                                        onChange={(e) => setProduct(p.key, { name: e.target.value })}
                                        list={`${uid}-products`}
                                        aria-label={`${q.supply.productName} ${i + 1}`}
                                        placeholder={q.supply.productPlaceholder}
                                        maxLength={120}
                                        className={clsx(inputClass, "col-span-4 h-11")}
                                      />
                                      <input
                                        value={p.model}
                                        onChange={(e) => setProduct(p.key, { model: e.target.value })}
                                        aria-label={`${q.supply.model} ${i + 1}`}
                                        placeholder={q.supply.model}
                                        maxLength={160}
                                        className={clsx(inputClass, "h-11")}
                                      />
                                      <input
                                        value={p.qty}
                                        onChange={(e) => setProduct(p.key, { qty: e.target.value })}
                                        type="number"
                                        min={1}
                                        inputMode="numeric"
                                        aria-label={`${q.supply.qty} ${i + 1}`}
                                        className={clsx(inputClass, "h-11 px-3")}
                                      />
                                      <select
                                        value={p.unit}
                                        onChange={(e) => setProduct(p.key, { unit: e.target.value })}
                                        aria-label={`${q.supply.unit} ${i + 1}`}
                                        className={clsx(inputClass, "h-11 px-2")}
                                      >
                                        {q.supply.unitOptions.map((u) => (
                                          <option key={u}>{u}</option>
                                        ))}
                                      </select>
                                      <button
                                        type="button"
                                        onClick={() => setProducts((list) => (list.length > 1 ? list.filter((r) => r.key !== p.key) : list))}
                                        disabled={products.length === 1}
                                        aria-label={`${q.remove} ${i + 1}`}
                                        className="flex h-11 w-9 items-center justify-center rounded-full text-lg text-fg-muted transition-colors hover:bg-fg/10 hover:text-fg disabled:opacity-30"
                                      >
                                        ×
                                      </button>
                                    </m.li>
                                  ))}
                                </AnimatePresence>
                              </ul>
                              <m.button
                                type="button"
                                layout
                                onClick={() => setProducts((list) => [...list, newRow()])}
                                disabled={products.length >= 30}
                                whileTap={{ scale: 0.96 }}
                                className="mt-3 h-10 rounded-full border border-dashed border-line-strong px-4 text-[14px] font-medium text-fg-muted transition-colors hover:border-signal hover:text-signal"
                              >
                                + {q.supply.addProduct}
                              </m.button>
                            </fieldset>
                            <m.div layout className="grid gap-4 sm:grid-cols-2">
                              <Text label={q.supply.district} placeholder={q.supply.districtPlaceholder} value={details.district} onChange={set("district")} required />
                              <Text label={q.supply.neededBy} type="date" value={details.neededBy} onChange={set("neededBy")} />
                            </m.div>
                            <m.div layout>
                              <Area label={q.supply.message} placeholder={q.supply.messagePlaceholder} value={details.message} onChange={set("message")} />
                            </m.div>
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
                                {q.install.needSupplyOptions.map((opt) => {
                                  const on = details.needSupply === opt;
                                  return (
                                    <label key={opt} className="relative isolate cursor-pointer">
                                      <input
                                        type="radio"
                                        name="needSupply"
                                        value={opt}
                                        checked={on}
                                        onChange={() => set("needSupply")(opt)}
                                        className="peer sr-only"
                                      />
                                      {on && (
                                        <m.span
                                          layoutId={`${uid}-supply`}
                                          className="absolute inset-0 -z-10 rounded-full border border-signal bg-signal/15"
                                          transition={spring}
                                        />
                                      )}
                                      <span
                                        className={clsx(
                                          "inline-flex h-9 items-center rounded-full border px-4 text-[14px] transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-signal",
                                          on ? "border-transparent text-fg" : "border-line-strong text-fg-muted hover:text-fg",
                                        )}
                                      >
                                        {opt}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </fieldset>
                            <div className="sm:col-span-2">
                              <Area label={q.install.message} placeholder={q.install.messagePlaceholder} value={details.message} onChange={set("message")} required />
                            </div>
                          </div>
                        )}
                      </m.div>
                    </AnimatePresence>
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
                    <AnimatePresence>
                      {problem && (
                        <m.p
                          key={problem}
                          initial={{ opacity: 0, x: 0 }}
                          animate={{ opacity: 1, x: [0, -8, 8, -5, 5, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="mb-3 text-[14px] font-medium text-pulse"
                          role="alert"
                        >
                          {problem}
                        </m.p>
                      )}
                    </AnimatePresence>
                    <m.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={spring}
                      className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-7 text-[15px] font-semibold text-ink shadow-[0_10px_30px_-12px_rgb(245_158_11/0.8)] transition-colors hover:bg-accent-strong disabled:opacity-70 sm:w-auto"
                    >
                      {/* sheen sweeping across on hover */}
                      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/35 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
                      {status === "sending" && (
                        <m.span
                          aria-hidden="true"
                          className="h-4 w-4 rounded-full border-2 border-ink/30 border-t-ink"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        />
                      )}
                      {status === "sending" ? t.sending : t.submit}
                    </m.button>
                    <AnimatePresence>
                      {status === "error" && (
                        <m.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-3 text-[14px] text-pulse"
                        >
                          {t.error}
                        </m.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.form>
      )}
    </AnimatePresence>
  );
}

const pop = {
  hidden: { opacity: 0, y: 8, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1 },
};

function Step({ n, title, hint, done, children }: { n: number; title: string; hint?: string; done?: boolean; children: ReactNode }) {
  return (
    <section>
      <h3 className="flex items-center gap-3 text-[16px] font-semibold tracking-tight">
        <span
          className={clsx(
            "relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full font-mono text-[12px] text-white transition-colors duration-300",
            done ? "bg-signal" : "bg-ink",
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {done ? (
              <m.span key="done" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} className="inline-flex">
                <Icon name="check" className="h-3.5 w-3.5" />
              </m.span>
            ) : (
              <m.span key="n" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}>
                {n}
              </m.span>
            )}
          </AnimatePresence>
        </span>
        {title}
      </h3>
      {hint && <p className="ml-10 mt-1 text-[13px] text-fg-muted">{hint}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-line-strong bg-canvas px-4 text-[15px] text-fg placeholder:text-fg-subtle outline-none transition-[border-color,box-shadow] duration-200 focus:border-signal focus:bg-canvas focus:shadow-[0_0_0_4px_rgb(0_119_95/0.12)]";

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
