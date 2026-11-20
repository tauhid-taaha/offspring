/**
 * Localization config.
 * - `locales`        every language the codebase supports.
 * - `enabledLocales` languages that are live (routed + shown in the switcher).
 *   To launch Bangla: finish src/i18n/dictionaries/bn.ts, then add "bn" here.
 */
export const locales = ["en", "bn"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const enabledLocales: readonly Locale[] = ["en"];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  bn: "বাংলা",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefix an internal path with the locale, e.g. href("en", "/about") -> "/en/about" */
export function href(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}
