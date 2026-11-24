"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { isDeskAuthed } from "@/lib/admin-session";
import { getSupabaseAdmin } from "@/lib/supabase";
import { CARD_BUCKET, CARD_TABLE } from "@/lib/cards";
import { cardAreaIds, cardIcons, type CardAreaId } from "@/i18n/dictionaries/en-cards";
import { enabledLocales } from "@/i18n/config";
import { DESK } from "../admin-shell";

export type CardResult = { ok: true } | { ok: false; error: string };

const MAX_BYTES = 5 * 1024 * 1024;
const TITLE_MAX = 60;
const DESC_MAX = 110;
const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

function text(form: FormData, key: string, max: number) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function isArea(v: string): v is CardAreaId {
  return (cardAreaIds as readonly string[]).includes(v);
}

/** Only site-relative links (e.g. /solutions/equipment) or full https links are kept. */
function cleanLink(v: string) {
  if (!v) return null;
  if (v.startsWith("/") && !v.startsWith("//")) return v;
  if (/^https:\/\/[^\s]+$/i.test(v)) return v;
  return null;
}

/** Re-render the home page (where cards appear) and the admin list. */
function refresh() {
  for (const locale of enabledLocales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/solutions/digital`);
    revalidatePath(`/${locale}/solutions/equipment`);
    revalidatePath(`/${locale}/solutions/engineering`);
    revalidatePath(`/${locale}/it`);
    revalidatePath(`/${locale}/engineering`);
    revalidatePath(`/${locale}/${DESK}/cards`);
  }
}

type Admin = NonNullable<ReturnType<typeof getSupabaseAdmin>>;

async function guard(): Promise<{ error: string; supabase: null } | { error: null; supabase: Admin }> {
  if (!(await isDeskAuthed())) return { error: "Your session has ended. Please sign in again.", supabase: null };
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: "The Supabase secret key is missing on the server.", supabase: null };
  return { error: null, supabase };
}

/** Create or update a card. Handles photo upload, replacement and removal. */
export async function saveCard(form: FormData): Promise<CardResult> {
  const g = await guard();
  if (g.error !== null) return { ok: false, error: g.error };
  const { supabase } = g;

  const id = text(form, "id", 64);
  const area = text(form, "area", 20);
  const title = text(form, "title", 200);
  const description = text(form, "description", 1000);
  const iconRaw = text(form, "icon", 30);
  const icon = (cardIcons as readonly string[]).includes(iconRaw) ? iconRaw : "box";
  const tags = [...new Set(text(form, "tags", 400).split(",").map((t) => t.trim().slice(0, 40)).filter(Boolean))].slice(0, 8);
  const linkRaw = text(form, "link", 300);
  const link = cleanLink(linkRaw);
  const published = form.get("published") === "on";
  const removeImage = form.get("removeImage") === "1";
  const file = form.get("image");

  if (!isArea(area)) return { ok: false, error: "Choose a section for this card." };
  if (!title) return { ok: false, error: "Add a title." };
  if (title.length > TITLE_MAX) return { ok: false, error: `Shorten the title to ${TITLE_MAX} characters or fewer.` };
  if (description.length > DESC_MAX) return { ok: false, error: `Shorten the description to ${DESC_MAX} characters (about 15–20 words).` };
  if (linkRaw && !link) return { ok: false, error: "The link must start with / (a page on this site) or https://." };

  // Existing card (for its current photo and position)
  let current: { image_path: string | null; area: string } | null = null;
  if (id) {
    const { data } = await supabase.from(CARD_TABLE).select("image_path, area").eq("id", id).maybeSingle();
    if (!data) return { ok: false, error: "That card no longer exists." };
    current = data;
  }

  let image_url: string | null | undefined;
  let image_path: string | null | undefined;

  if (file instanceof File && file.size > 0) {
    const ext = IMAGE_TYPES[file.type];
    if (!ext) return { ok: false, error: "Use a JPG, PNG, WebP or AVIF photo." };
    if (file.size > MAX_BYTES) return { ok: false, error: "The photo must be 5 MB or smaller." };
    const path = `${area}/${randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from(CARD_BUCKET)
      .upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type, cacheControl: "31536000" });
    if (error) return { ok: false, error: "The photo couldn't be uploaded. Check that the card-images bucket exists." };
    image_path = path;
    image_url = supabase.storage.from(CARD_BUCKET).getPublicUrl(path).data.publicUrl;
  } else if (removeImage) {
    image_path = null;
    image_url = null;
  }

  const fields = {
    area,
    icon,
    title,
    description,
    tags,
    link,
    published,
    updated_at: new Date().toISOString(),
    ...(image_url !== undefined ? { image_url, image_path } : {}),
  };

  if (id) {
    // Moving to another section puts the card at the end of that section.
    const extra = current && current.area !== area ? { sort: await nextSort(supabase, area) } : {};
    const { error } = await supabase.from(CARD_TABLE).update({ ...fields, ...extra }).eq("id", id);
    if (error) return { ok: false, error: "Couldn't save the card. Please try again." };
  } else {
    const { error } = await supabase.from(CARD_TABLE).insert({ ...fields, sort: await nextSort(supabase, area) });
    if (error) return { ok: false, error: "Couldn't add the card. Check that the service_cards table exists." };
  }

  // Old photo is no longer used: remove it from storage.
  if (image_url !== undefined && current?.image_path) {
    await supabase.storage.from(CARD_BUCKET).remove([current.image_path]);
  }

  refresh();
  return { ok: true };
}

async function nextSort(supabase: Admin, area: string) {
  const { data } = await supabase.from(CARD_TABLE).select("sort").eq("area", area).order("sort", { ascending: false }).limit(1);
  return (data?.[0]?.sort ?? -1) + 1;
}

export async function deleteCard(id: string): Promise<CardResult> {
  const g = await guard();
  if (g.error !== null) return { ok: false, error: g.error };
  const { data } = await g.supabase.from(CARD_TABLE).select("image_path").eq("id", id).maybeSingle();
  const { error } = await g.supabase.from(CARD_TABLE).delete().eq("id", id);
  if (error) return { ok: false, error: "Couldn't delete the card." };
  if (data?.image_path) await g.supabase.storage.from(CARD_BUCKET).remove([data.image_path]);
  refresh();
  return { ok: true };
}

export async function setCardPublished(id: string, published: boolean): Promise<CardResult> {
  const g = await guard();
  if (g.error !== null) return { ok: false, error: g.error };
  const { error } = await g.supabase.from(CARD_TABLE).update({ published, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return { ok: false, error: "Couldn't update the card." };
  refresh();
  return { ok: true };
}

/** Swap a card with its neighbour in the same section. */
export async function moveCard(id: string, direction: "up" | "down"): Promise<CardResult> {
  const g = await guard();
  if (g.error !== null) return { ok: false, error: g.error };
  const { supabase } = g;
  const { data: card } = await supabase.from(CARD_TABLE).select("id, area").eq("id", id).maybeSingle();
  if (!card) return { ok: false, error: "That card no longer exists." };

  const { data: list } = await supabase
    .from(CARD_TABLE)
    .select("id, sort")
    .eq("area", card.area)
    .order("sort", { ascending: true })
    .order("created_at", { ascending: true });
  if (!list) return { ok: false, error: "Couldn't reorder." };

  const i = list.findIndex((c) => c.id === id);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= list.length) return { ok: true };

  // Rewrite positions 0..n so ties from older data can't block a move.
  const order = list.map((c) => c.id);
  [order[i], order[j]] = [order[j], order[i]];
  const results = await Promise.all(order.map((cid, sort) => supabase.from(CARD_TABLE).update({ sort }).eq("id", cid)));
  if (results.some((r) => r.error)) return { ok: false, error: "Couldn't reorder." };

  refresh();
  return { ok: true };
}
