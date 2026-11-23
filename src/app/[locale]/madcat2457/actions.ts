"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { clearDeskCookie, credentialsMatch, setDeskCookie } from "@/lib/admin-session";
import { enabledLocales, isLocale } from "@/i18n/config";

const attempts = new Map<string, { n: number; at: number }>();
const SEGMENT = "madcat2457";

function deskPath(locale: string) {
  const safe = isLocale(locale) && enabledLocales.includes(locale) ? locale : "en";
  return `/${safe}/${SEGMENT}`;
}

function blocked(ip: string) {
  const now = Date.now();
  const hit = attempts.get(ip);
  if (!hit || now - hit.at > 10 * 60 * 1000) return false;
  return hit.n >= 8;
}

function noteFailure(ip: string) {
  const now = Date.now();
  const hit = attempts.get(ip);
  if (!hit || now - hit.at > 10 * 60 * 1000) attempts.set(ip, { n: 1, at: now });
  else attempts.set(ip, { n: hit.n + 1, at: hit.at });
}

export async function login(formData: FormData) {
  const path = deskPath(String(formData.get("locale") ?? ""));
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (blocked(ip)) redirect(`${path}?e=1`);

  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!credentialsMatch(username, password)) {
    noteFailure(ip);
    await new Promise((r) => setTimeout(r, 500));
    redirect(`${path}?e=1`);
  }

  attempts.delete(ip);
  await setDeskCookie();
  redirect(path);
}

export async function logout(formData: FormData) {
  await clearDeskCookie();
  redirect(deskPath(String(formData.get("locale") ?? "")));
}
