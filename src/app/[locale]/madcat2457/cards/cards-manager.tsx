"use client";

import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Icon } from "@/components/ui";
import { ServiceCardView } from "@/components/ServiceCardView";
import type { ServiceCard } from "@/lib/cards";
import type { CardAreaId } from "@/i18n/dictionaries/en-cards";
import { deleteCard, moveCard, saveCard, setCardPublished } from "./actions";

type Area = { id: CardAreaId; label: string; title: string };
type Editing = { card: ServiceCard | null; area: CardAreaId } | null;

const MAX_BYTES = 5 * 1024 * 1024;
/** Short enough to fit the card in about 4 lines (roughly 15–20 words). */
const DESC_MAX = 110;
const TITLE_MAX = 60;

export function CardsManager({
  areas,
  cards,
  icons,
}: {
  areas: Area[];
  cards: Record<CardAreaId, ServiceCard[]>;
  icons: string[];
}) {
  const router = useRouter();
  const [area, setArea] = useState<CardAreaId>(areas[0].id);
  const [editing, setEditing] = useState<Editing>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [, startTransition] = useTransition();

  const list = cards[area];

  async function run(key: string, task: () => Promise<{ ok: boolean; error?: string }>, done?: string) {
    setBusy(key);
    const res = await task();
    setBusy(null);
    if (!res.ok) setNotice({ kind: "error", text: res.error ?? "Something went wrong." });
    else if (done) setNotice({ kind: "ok", text: done });
    startTransition(() => router.refresh());
  }

  return (
    <div className="mt-8">
      {/* Section tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Card sections" className="flex flex-wrap gap-2">
          {areas.map((a) => (
            <button
              key={a.id}
              role="tab"
              aria-selected={a.id === area}
              onClick={() => setArea(a.id)}
              className={clsx(
                "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[14px] transition-colors",
                a.id === area ? "border-signal bg-signal/15 font-medium text-fg" : "border-line-strong text-fg-muted hover:bg-fg/5",
              )}
            >
              {a.label}
              <span className="font-mono text-[12px] text-fg-subtle">{cards[a.id].length}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setEditing({ card: null, area })}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-5 text-[14px] font-semibold text-ink hover:bg-accent-strong"
        >
          <span className="text-lg leading-none">+</span> Add card
        </button>
      </div>

      {notice && (
        <p
          role={notice.kind === "error" ? "alert" : "status"}
          className={clsx(
            "mt-5 rounded-xl px-4 py-3 text-[14px]",
            notice.kind === "error" ? "bg-red-50 text-red-700" : "bg-signal-soft text-signal",
          )}
        >
          {notice.text}
        </p>
      )}

      <p className="mt-6 text-[14px] text-fg-muted">
        Section on the home page: <span className="font-medium text-fg">“{areas.find((a) => a.id === area)?.title}”</span>
      </p>

      {/* Cards in this section */}
      {list.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-line-strong p-10 text-center text-fg-muted">
          No cards here yet — this section is hidden on the home page until you add one.
        </div>
      ) : (
        <ul className="mt-4 grid gap-3">
          {list.map((c, i) => (
            <li
              key={c.id}
              className={clsx(
                "card-surface flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center",
                !c.published && "opacity-60",
              )}
            >
              <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-surface sm:w-32">
                {c.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-signal">
                    <Icon name={c.icon} className="h-7 w-7" />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold tracking-tight">{c.title}</h3>
                  <span
                    className={clsx(
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                      c.published ? "bg-signal-soft text-signal" : "bg-surface text-fg-subtle ring-1 ring-line",
                    )}
                  >
                    {c.published ? "Live" : "Hidden"}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-[14px] text-fg-muted">{c.description}</p>
                {c.tags.length > 0 && <p className="mt-1 truncate text-[12px] text-fg-subtle">{c.tags.join(" · ")}</p>}
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-1.5">
                <IconBtn label="Move up" disabled={i === 0 || !!busy} onClick={() => run(c.id, () => moveCard(c.id, "up"))}>
                  ↑
                </IconBtn>
                <IconBtn label="Move down" disabled={i === list.length - 1 || !!busy} onClick={() => run(c.id, () => moveCard(c.id, "down"))}>
                  ↓
                </IconBtn>
                <TextBtn
                  disabled={!!busy}
                  onClick={() => run(c.id, () => setCardPublished(c.id, !c.published), c.published ? "Card hidden." : "Card is live.")}
                >
                  {c.published ? "Hide" : "Show"}
                </TextBtn>
                <TextBtn disabled={!!busy} onClick={() => setEditing({ card: c, area: c.area })}>
                  Edit
                </TextBtn>
                <TextBtn
                  danger
                  disabled={!!busy}
                  onClick={() => {
                    if (window.confirm(`Delete “${c.title}”? This can't be undone.`)) run(c.id, () => deleteCard(c.id), "Card deleted.");
                  }}
                >
                  Delete
                </TextBtn>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <CardEditor
          key={editing.card?.id ?? `new-${editing.area}`}
          areas={areas}
          icons={icons}
          editing={editing}
          onClose={() => setEditing(null)}
          onSaved={(msg, savedArea) => {
            setEditing(null);
            setArea(savedArea);
            setNotice({ kind: "ok", text: msg });
            startTransition(() => router.refresh());
          }}
        />
      )}
    </div>
  );
}

function CardEditor({
  areas,
  icons,
  editing,
  onClose,
  onSaved,
}: {
  areas: Area[];
  icons: string[];
  editing: NonNullable<Editing>;
  onClose: () => void;
  onSaved: (msg: string, area: CardAreaId) => void;
}) {
  const c = editing.card;
  const dialog = useRef<HTMLDialogElement>(null);
  const [area, setArea] = useState<CardAreaId>(editing.area);
  const [title, setTitle] = useState(c?.title ?? "");
  const [description, setDescription] = useState(c?.description ?? "");
  const [tags, setTags] = useState(c?.tags.join(", ") ?? "");
  const [icon, setIcon] = useState(c?.icon ?? "box");
  const [link, setLink] = useState(c?.link ?? "");
  const [published, setPublished] = useState(c?.published ?? true);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(c?.imageUrl ?? null);
  const [removeImage, setRemoveImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function pickFile(f: File | undefined) {
    if (!f) return;
    if (!/^image\/(jpeg|png|webp|avif)$/.test(f.type)) return setError("Use a JPG, PNG, WebP or AVIF photo.");
    if (f.size > MAX_BYTES) return setError("The photo must be 5 MB or smaller.");
    setError("");
    setFile(f);
    setRemoveImage(false);
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return setError("Add a title.");
    if (title.length > TITLE_MAX) return setError(`Shorten the title to ${TITLE_MAX} characters or fewer.`);
    if (description.length > DESC_MAX) return setError(`Shorten the description to ${DESC_MAX} characters (about 15–20 words).`);
    const form = new FormData();
    if (c) form.set("id", c.id);
    form.set("area", area);
    form.set("title", title);
    form.set("description", description);
    form.set("tags", tags);
    form.set("icon", icon);
    form.set("link", link);
    if (published) form.set("published", "on");
    if (file) form.set("image", file);
    if (removeImage) form.set("removeImage", "1");
    setSaving(true);
    setError("");
    const res = await saveCard(form);
    setSaving(false);
    if (!res.ok) return setError(res.error);
    onSaved(c ? "Card saved." : "Card added.", area);
  }

  const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 8);

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      className="m-auto w-[min(960px,calc(100vw-2rem))] rounded-3xl bg-canvas p-0 text-fg shadow-2xl backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
    >
      <form onSubmit={submit} className="grid max-h-[90dvh] overflow-y-auto md:grid-cols-[1.2fr_1fr]">
        <div className="grid content-start gap-4 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">{c ? "Edit card" : "Add card"}</h2>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Close" className="h-9 w-9 rounded-full text-xl text-fg-muted hover:bg-fg/5">
              ×
            </button>
          </div>

          <Field label="Section">
            <select value={area} onChange={(e) => setArea(e.target.value as CardAreaId)} className={input}>
              {areas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Title" hint={<Count n={title.length} max={TITLE_MAX} />}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. Heavy-duty machine supply" className={input} />
          </Field>

          <Field label="Description" hint={<Count n={description.length} max={DESC_MAX} suffix=" · about 15–20 words" />}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="One short sentence, e.g. Excavators, cranes, loaders and generators for construction and industry."
              className={clsx(input, "h-auto resize-y py-3")}
            />
          </Field>

          <Field label="Tags" hint="Comma-separated, up to 8">
            <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Excavators, Cranes, Rental, Spare parts" className={input} />
          </Field>

          <Field label="Photo" hint="JPG, PNG or WebP · up to 5 MB · landscape works best">
            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex h-10 cursor-pointer items-center rounded-full border border-line-strong px-4 text-[14px] font-medium hover:bg-fg/5">
                {preview ? "Change photo" : "Upload photo"}
                <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
              </label>
              {preview && (
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    setRemoveImage(true);
                  }}
                  className="h-10 rounded-full px-4 text-[14px] text-red-700 hover:bg-red-50"
                >
                  Remove photo
                </button>
              )}
            </div>
          </Field>

          <Field label="Icon" hint={preview ? "Shown as a small badge on the photo" : "Shown when there's no photo"}>
            <div className="flex flex-wrap gap-1.5">
              {icons.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setIcon(name)}
                  aria-label={name}
                  aria-pressed={icon === name}
                  className={clsx(
                    "flex h-9 w-9 items-center justify-center rounded-lg border transition-colors",
                    icon === name ? "border-signal bg-signal text-white" : "border-line-strong text-fg-muted hover:text-signal",
                  )}
                >
                  <Icon name={name} className="h-4 w-4" />
                </button>
              ))}
            </div>
          </Field>

          <Field label="“See details” link (optional)" hint="A page on this site like /solutions/equipment, or a full https:// link. Empty = the section's main page.">
            <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="/solutions/equipment" className={input} />
          </Field>

          <label className="flex items-center gap-3 text-[15px]">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="h-5 w-5 accent-[var(--color-signal)]" />
            Show on the website
          </label>

          {error && (
            <p role="alert" className="rounded-xl bg-pulse/10 px-4 py-3 text-[14px] text-pulse">
              {error}
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-[15px] font-semibold text-ink hover:bg-accent-strong disabled:opacity-60"
            >
              {saving ? "Saving…" : c ? "Save changes" : "Add card"}
            </button>
            <button type="button" onClick={() => dialog.current?.close()} className="h-11 rounded-full border border-line-strong px-5 text-[15px] hover:bg-fg/5">
              Cancel
            </button>
          </div>
        </div>

        {/* Live preview */}
        <div className="border-t border-line bg-surface p-6 sm:p-8 md:border-l md:border-t-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">Preview</p>
          <div className="mx-auto mt-4 max-w-[300px]">
            <ServiceCardView card={{ icon, title, description, tags: tagList, imageUrl: preview }} cta="See details" />
          </div>
        </div>
      </form>
    </dialog>
  );
}

const input =
  "h-11 w-full rounded-xl border border-line-strong bg-canvas px-4 text-[15px] outline-none transition-colors focus:border-signal";

function Count({ n, max, suffix = "" }: { n: number; max: number; suffix?: string }) {
  return (
    <span className={n > max ? "font-semibold text-red-700" : undefined}>
      {n}/{max}
      {suffix}
      {n > max && " — too long"}
    </span>
  );
}

function Field({ label, hint, children }: { label: string; hint?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-medium text-fg-muted">{label}</span>
        {hint && <span className="text-right text-[12px] text-fg-subtle">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function IconBtn({ label, disabled, onClick, children }: { label: string; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-fg-muted hover:text-fg disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function TextBtn({ danger, disabled, onClick, children }: { danger?: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "h-9 rounded-full border px-3.5 text-[13px] font-medium disabled:opacity-40",
        danger ? "border-red-200 text-red-700 hover:bg-red-50" : "border-line-strong text-fg hover:bg-fg/5",
      )}
    >
      {children}
    </button>
  );
}
