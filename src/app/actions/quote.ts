"use server";

import en from "@/i18n/dictionaries/en";
import { getSupabase } from "@/lib/supabase";

const INTERESTS = new Set<string>(en.contact.form.interestOptions);

function text(formData: FormData, key: string, max: number) {
  const value = formData.get(key);
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function submitQuote(formData: FormData): Promise<{ ok: boolean }> {
  const name = text(formData, "name", 120);
  const email = text(formData, "email", 200);
  const company = text(formData, "company", 160);
  const phone = text(formData, "phone", 40);
  const location = text(formData, "location", 160);
  const interest = text(formData, "interest", 80);
  const message = text(formData, "message", 4000);

  if (!name || !email || !phone || !message || !INTERESTS.has(interest)) return { ok: false };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false };

  const supabase = getSupabase();
  if (!supabase) return { ok: false };

  const { error } = await supabase.from("quote_requests").insert({
    name,
    email,
    company: company || null,
    phone,
    location: location || null,
    interest,
    message,
  });

  return { ok: !error };
}
