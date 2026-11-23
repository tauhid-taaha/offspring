"use server";

import en from "@/i18n/dictionaries/en";
import { getSupabase } from "@/lib/supabase";
import { isQuoteCategory, type QuoteCategoryId } from "@/lib/quote-catalog";

export type QuoteProduct = { name: string; model: string; qty: string; unit: string };

export type QuotePayload = {
  category: string;
  items: string[];
  details: Record<string, unknown>;
  contact: { name: string; email: string; company: string; phone: string; location: string };
};

const q = en.contact.quote;

function str(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Keeps a select value only when it is one of the offered options. */
function pick(value: unknown, options: readonly string[]) {
  const v = str(value, 80);
  return options.includes(v) ? v : "";
}

function date(value: unknown) {
  const v = str(value, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "";
}

function products(value: unknown): QuoteProduct[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, 30)
    .map((p) => ({
      name: str(p?.name, 120),
      model: str(p?.model, 160),
      qty: str(p?.qty, 12).replace(/[^\d.]/g, ""),
      unit: pick(p?.unit, q.supply.unitOptions) || q.supply.unitOptions[0],
    }))
    .filter((p) => p.name && p.qty && Number(p.qty) > 0);
}

/** Only the fields that belong to the chosen category are kept, with empty ones dropped. */
function cleanDetails(category: QuoteCategoryId, d: Record<string, unknown>) {
  const out: Record<string, unknown> =
    category === "software"
      ? {
          budget: pick(d.budget, q.software.budgetOptions),
          timeline: pick(d.timeline, q.software.timelineOptions),
          website: str(d.website, 300),
        }
      : category === "supply"
        ? { products: products(d.products), district: str(d.district, 80), neededBy: date(d.neededBy) }
        : {
            district: str(d.district, 80),
            siteType: pick(d.siteType, q.install.siteTypeOptions),
            size: str(d.size, 120),
            visitDate: date(d.visitDate),
            needSupply: pick(d.needSupply, q.install.needSupplyOptions),
          };
  for (const key of Object.keys(out)) {
    const v = out[key];
    if (v === "" || (Array.isArray(v) && v.length === 0)) delete out[key];
  }
  return out;
}

export async function submitQuote(payload: QuotePayload): Promise<{ ok: boolean }> {
  if (!payload || !isQuoteCategory(payload.category)) return { ok: false };
  const category = payload.category;

  const c = payload.contact ?? {};
  const name = str(c.name, 120);
  const email = str(c.email, 200);
  const company = str(c.company, 160);
  const phone = str(c.phone, 40);
  const location = str(c.location, 160);
  if (!name || !email || !phone) return { ok: false };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false };

  const items = Array.isArray(payload.items)
    ? [...new Set(payload.items.map((i) => str(i, 80)).filter(Boolean))].slice(0, 20)
    : [];
  const raw = payload.details && typeof payload.details === "object" ? payload.details : {};
  const details = cleanDetails(category, raw);
  const message = str(raw.message, 4000);

  if (category === "supply") {
    if (!Array.isArray(details.products) || details.products.length === 0) return { ok: false };
  } else if (items.length === 0 || !message) {
    return { ok: false };
  }

  const supabase = getSupabase();
  if (!supabase) return { ok: false };

  const { error } = await supabase.from("quote_requests").insert({
    name,
    email,
    company: company || null,
    phone,
    location: location || null,
    // `interest` stays filled so older views of the table keep making sense.
    interest: q.categories[category].title,
    category,
    items,
    details,
    message,
  });

  return { ok: !error };
}
