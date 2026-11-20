import "server-only";
import en, { type Dictionary } from "./dictionaries/en";
import bn from "./dictionaries/bn";
import type { Locale } from "./config";

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };
export type PartialDictionary = DeepPartial<Dictionary>;

/** Deep-merge a partial translation over English so missing keys fall back gracefully. */
function merge<T>(base: T, override: unknown): T {
  if (Array.isArray(base)) {
    if (!Array.isArray(override)) return base;
    return base.map((item, i) => merge(item, override[i])) as T;
  }
  if (base && typeof base === "object") {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    const o = (override ?? {}) as Record<string, unknown>;
    for (const key of Object.keys(out)) out[key] = merge(out[key], o[key]);
    return out as T;
  }
  return (override ?? base) as T;
}

const dictionaries: Record<Locale, PartialDictionary> = { en, bn };

export function getDictionary(locale: Locale): Dictionary {
  return locale === "en" ? en : merge(en, dictionaries[locale]);
}

export type { Dictionary };
