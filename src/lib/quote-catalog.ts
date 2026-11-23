import type { Dictionary } from "@/i18n/dictionaries/en";

/** The three quote categories, in the order they appear on the form. */
export const quoteCategoryIds = ["software", "supply", "install"] as const;
export type QuoteCategoryId = (typeof quoteCategoryIds)[number];

export function isQuoteCategory(value: unknown): value is QuoteCategoryId {
  return typeof value === "string" && (quoteCategoryIds as readonly string[]).includes(value);
}

/** Each quote category draws its suggestions from one division page. */
const divisionFor = { software: "digital", supply: "equipment", install: "engineering" } as const;

export type QuoteChip = { title: string; products: string[] };
export type QuoteCategory = {
  id: QuoteCategoryId;
  icon: string;
  title: string;
  text: string;
  coverage: string;
  chips: QuoteChip[];
};

/**
 * Builds the form's categories and suggestion chips from the division pages,
 * so a service card added there shows up in the quote form automatically.
 * For supply, each chip's `points` become product suggestions.
 */
export function buildQuoteCatalog(dict: Dictionary): QuoteCategory[] {
  return quoteCategoryIds.map((id) => {
    const division = dict.divisions[divisionFor[id]];
    const copy = dict.contact.quote.categories[id];
    const chips: QuoteChip[] = division.offer.items.map((item) => ({
      title: item.title,
      products: id === "supply" ? [...item.points] : [],
    }));
    for (const title of copy.extra) chips.push({ title, products: [] });
    return { id, icon: division.icon, title: copy.title, text: copy.text, coverage: copy.coverage, chips };
  });
}
