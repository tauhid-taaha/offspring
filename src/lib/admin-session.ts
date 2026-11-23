import "server-only";
import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "ot_desk";
const MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function same(input: string, expected: string) {
  if (!expected) return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export function credentialsMatch(username: string, password: string) {
  return (
    same(username, process.env.ADMIN_USERNAME ?? "") &&
    same(password, process.env.ADMIN_PASSWORD ?? "")
  );
}

function sign(exp: number) {
  const body = Buffer.from(JSON.stringify({ exp })).toString("base64url");
  const sig = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function valid(token: string) {
  const key = secret();
  if (!key) return false;
  const [body, sig] = token.split(".");
  if (!body || !sig) return false;
  const expected = createHmac("sha256", key).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as { exp?: number };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isDeskAuthed() {
  const token = (await cookies()).get(COOKIE)?.value;
  return Boolean(token && valid(token));
}

export async function setDeskCookie() {
  (await cookies()).set(COOKIE, sign(Date.now() + MAX_AGE * 1000), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearDeskCookie() {
  (await cookies()).delete(COOKIE);
}
