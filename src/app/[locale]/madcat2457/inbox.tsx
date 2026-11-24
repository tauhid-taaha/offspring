"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { markQuoteSeen, setQuoteTracked } from "./inbox-actions";

export type InboxQuote = {
  id: string;
  when: string;
  name: string;
  email: string;
  company: string | null;
  phone: string;
  location: string | null;
  category: string | null;
  categoryId: string | null;
  items: string[];
  fields: { label: string; value: string }[];
  products: { name: string; model: string; qty: string; unit: string }[];
  message: string;
  seen: boolean;
  contacted: boolean;
};

const categories = [
  { id: null, label: "All quotes" },
  { id: "software", label: "Software" },
  { id: "supply", label: "Supply" },
  { id: "install", label: "Install" },
] as const;

type Track = "all" | "new" | "seen" | "contacted";

function waLink(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `880${digits.slice(1)}`;
  return digits ? `https://wa.me/${digits}` : null;
}

export function Inbox({ quotes }: { quotes: InboxQuote[] }) {
  const [seen, setSeen] = useState(() => new Set(quotes.filter((q) => q.seen).map((q) => q.id)));
  const [tracked, setTracked] = useState(() => new Set(quotes.filter((q) => q.contacted).map((q) => q.id)));
  const [selected, setSelected] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [track, setTrack] = useState<Track>("all");
  const [busy, setBusy] = useState(false);

  const rows = useMemo(() => {
    return quotes.filter((q) => {
      if (category && q.categoryId !== category) return false;
      const isSeen = seen.has(q.id);
      const isTracked = tracked.has(q.id);
      if (track === "new") return !isSeen;
      if (track === "seen") return isSeen && !isTracked;
      if (track === "contacted") return isTracked;
      return true;
    });
  }, [quotes, category, track, seen, tracked]);

  const current = quotes.find((q) => q.id === selected) ?? null;
  const newCount = quotes.filter((q) => !seen.has(q.id)).length;
  const trackedCount = quotes.filter((q) => tracked.has(q.id)).length;

  async function open(q: InboxQuote) {
    setSelected(q.id);
    if (seen.has(q.id)) return;
    setSeen((prev) => new Set(prev).add(q.id));
    const result = await markQuoteSeen(q.id);
    if (!result.ok) {
      setSeen((prev) => {
        const next = new Set(prev);
        next.delete(q.id);
        return next;
      });
    }
  }

  async function toggleTrack(q: InboxQuote) {
    const nextOn = !tracked.has(q.id);
    const wasSeen = seen.has(q.id);
    setBusy(true);
    setTracked((prev) => {
      const next = new Set(prev);
      if (nextOn) next.add(q.id);
      else next.delete(q.id);
      return next;
    });
    if (nextOn) setSeen((prev) => new Set(prev).add(q.id));
    const result = await setQuoteTracked(q.id, nextOn);
    setBusy(false);
    if (!result.ok) {
      setTracked((prev) => {
        const next = new Set(prev);
        if (nextOn) next.delete(q.id);
        else next.add(q.id);
        return next;
      });
      if (nextOn && !wasSeen) {
        setSeen((prev) => {
          const next = new Set(prev);
          next.delete(q.id);
          return next;
        });
      }
    }
  }

  return (
    <div className="mt-8">
      <p className="text-[14px] text-fg-muted">
        <span className="font-medium text-fg">{newCount}</span> not seen
        <span className="px-2 text-fg-subtle">·</span>
        <span className="font-medium text-fg">{trackedCount}</span> contacted
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.id ?? "all"}
            type="button"
            onClick={() => setCategory(c.id)}
            className={clsx(
              "inline-flex h-9 items-center rounded-full border px-4 text-[14px] transition-colors",
              category === c.id ? "border-signal bg-signal/15 font-medium text-fg" : "border-line-strong text-fg-muted hover:bg-fg/5",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Track quotes">
        {(
          [
            ["all", "All"],
            ["new", "Not seen"],
            ["seen", "Seen"],
            ["contacted", "Contacted"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTrack(id)}
            className={clsx(
              "inline-flex h-8 items-center rounded-full px-3 text-[13px] font-medium transition-colors",
              track === id ? "bg-ink text-white" : "bg-surface text-fg-muted hover:text-fg",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="card-surface mt-4 overflow-hidden rounded-2xl md:grid md:min-h-[34rem] md:grid-cols-[17rem_1fr]">
        <div className={clsx("max-h-[34rem] overflow-y-auto border-line md:border-r", current && "hidden md:block")}>
          {rows.length === 0 && <p className="p-5 text-[14px] text-fg-muted">No quotes in this view.</p>}
          <ul>
            {rows.map((q) => {
              const isSeen = seen.has(q.id);
              const isTracked = tracked.has(q.id);
              const on = q.id === selected;
              return (
                <li key={q.id} className="border-b border-line last:border-b-0">
                  <button
                    type="button"
                    onClick={() => open(q)}
                    className={clsx(
                      "flex w-full flex-col gap-1 px-4 py-3.5 text-left transition-colors",
                      isTracked && "bg-[#e7f1ff] hover:bg-[#d6e6fb]",
                      !isTracked && !isSeen && "bg-signal-soft hover:bg-[#d3eddf]",
                      !isTracked && isSeen && "bg-canvas hover:bg-surface",
                      on && (isTracked ? "ring-2 ring-inset ring-[#2563eb]/40" : "ring-2 ring-inset ring-signal/30"),
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {!isSeen && <span className="h-2 w-2 shrink-0 rounded-full bg-signal" aria-hidden="true" />}
                      <span className={clsx("truncate text-[15px]", !isSeen ? "font-semibold" : "font-medium")}>{q.name}</span>
                    </span>
                    <span className="truncate text-[13px] text-signal">{q.category ?? "Quote"}</span>
                    <span className="truncate text-[13px] text-fg-muted">{q.message || q.items[0] || "No message"}</span>
                    <span className="flex items-center justify-between gap-2 text-[12px] text-fg-subtle">
                      <span>{q.when}</span>
                      {isTracked && <span className="rounded-full bg-[#dbeafe] px-2 py-0.5 font-medium text-[#1d4ed8]">Tracked</span>}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={clsx("min-h-[24rem] p-5 sm:p-6", !current && "hidden md:block")}>
          {!current && (
            <div className="flex h-full min-h-[20rem] items-center justify-center text-[15px] text-fg-muted">
              Select a quote to read it.
            </div>
          )}
          {current && (
            <article>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mb-4 text-[14px] font-medium text-signal md:hidden"
              >
                ← All quotes
              </button>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">{current.name}</h2>
                  <p className="mt-1 text-[14px] text-fg-muted">
                    {current.category ?? "Quote"}
                    <span className="px-2 text-fg-subtle">·</span>
                    {current.when}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => toggleTrack(current)}
                  className={clsx(
                    "h-10 rounded-full px-4 text-[14px] font-semibold transition-colors disabled:opacity-60",
                    tracked.has(current.id)
                      ? "bg-[#2563eb] text-white"
                      : "border border-line-strong bg-canvas text-fg hover:bg-surface",
                  )}
                >
                  {tracked.has(current.id) ? "Tracked" : "Track"}
                </button>
              </div>
              <p className="mt-2 text-[13px] text-fg-subtle">
                {tracked.has(current.id)
                  ? "You have contacted this client."
                  : "Not contacted yet. Open a quote to mark it seen, then Track it after you reply."}
              </p>

              {current.items.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {current.items.map((item) => (
                    <li key={item} className="rounded-full bg-signal-soft px-2.5 py-1 text-[12px] font-medium text-signal">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <dl className="mt-5 grid gap-3 text-[14px] sm:grid-cols-2">
                <div>
                  <dt className="text-fg-subtle">Email</dt>
                  <dd>
                    <a className="hover:underline" href={`mailto:${current.email}`}>
                      {current.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-fg-subtle">Phone</dt>
                  <dd className="flex flex-wrap gap-x-3">
                    <a className="hover:underline" href={`tel:${current.phone}`}>
                      {current.phone}
                    </a>
                    {waLink(current.phone) && (
                      <a className="font-medium text-signal hover:underline" href={waLink(current.phone)!} target="_blank" rel="noreferrer">
                        WhatsApp
                      </a>
                    )}
                  </dd>
                </div>
                {current.company && (
                  <div>
                    <dt className="text-fg-subtle">Organisation</dt>
                    <dd>{current.company}</dd>
                  </div>
                )}
                {current.location && (
                  <div>
                    <dt className="text-fg-subtle">Location</dt>
                    <dd>{current.location}</dd>
                  </div>
                )}
                {current.fields.map((f) => (
                  <div key={f.label}>
                    <dt className="text-fg-subtle">{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>

              {current.products.length > 0 && (
                <div className="mt-4 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full text-left text-[14px]">
                    <thead className="bg-surface text-[12px] uppercase tracking-wide text-fg-subtle">
                      <tr>
                        <th className="px-3 py-2 font-medium">Product</th>
                        <th className="px-3 py-2 font-medium">Brand / model</th>
                        <th className="px-3 py-2 text-right font-medium">Qty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {current.products.map((p, i) => (
                        <tr key={`${p.name}-${i}`}>
                          <td className="px-3 py-2">{p.name}</td>
                          <td className="px-3 py-2 text-fg-muted">{p.model || "—"}</td>
                          <td className="whitespace-nowrap px-3 py-2 text-right">
                            {p.qty} {p.unit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {current.message && <p className="mt-5 whitespace-pre-wrap text-[15px] leading-relaxed">{current.message}</p>}
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
