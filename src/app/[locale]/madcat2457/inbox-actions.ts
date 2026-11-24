"use server";

import { revalidatePath } from "next/cache";
import { isDeskAuthed } from "@/lib/admin-session";
import { getSupabaseAdmin } from "@/lib/supabase";
import { enabledLocales } from "@/i18n/config";

const DESK = "madcat2457";

const ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function refresh() {
  for (const locale of enabledLocales) revalidatePath(`/${locale}/${DESK}`);
}

async function rowDetails(id: string) {
  if (!ID.test(id) || !(await isDeskAuthed())) return null;
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data, error } = await supabase.from("quote_requests").select("details").eq("id", id).maybeSingle();
  if (error || !data) return null;
  const details = data.details;
  return {
    supabase,
    details: details && typeof details === "object" && !Array.isArray(details) ? { ...details } : {},
  };
}

/** Opening a quote records that an admin has seen it. */
export async function markQuoteSeen(id: string) {
  const row = await rowDetails(id);
  if (!row) return { ok: false as const };
  if (typeof row.details._seen === "string") return { ok: true as const };
  row.details._seen = new Date().toISOString();
  const { error } = await row.supabase.from("quote_requests").update({ details: row.details }).eq("id", id);
  if (error) return { ok: false as const };
  refresh();
  return { ok: true as const };
}

/** Track whether this client has been contacted. */
export async function setQuoteTracked(id: string, tracked: boolean) {
  const row = await rowDetails(id);
  if (!row) return { ok: false as const };
  if (tracked) {
    row.details._contacted = new Date().toISOString();
    if (typeof row.details._seen !== "string") row.details._seen = row.details._contacted;
  } else {
    delete row.details._contacted;
  }
  const { error } = await row.supabase.from("quote_requests").update({ details: row.details }).eq("id", id);
  if (error) return { ok: false as const };
  refresh();
  return { ok: true as const };
}
