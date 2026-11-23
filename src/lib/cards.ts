import "server-only";
import homeCards, { cardAreaIds, type CardAreaId } from "@/i18n/dictionaries/en-cards";
import { getSupabase, getSupabaseAdmin } from "@/lib/supabase";

export const CARD_BUCKET = "card-images";
export const CARD_TABLE = "service_cards";

export type ServiceCard = {
  id: string;
  area: CardAreaId;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string | null;
  imagePath: string | null;
  link: string | null;
  sort: number;
  published: boolean;
};

type Row = {
  id: string;
  area: CardAreaId;
  icon: string | null;
  title: string;
  description: string | null;
  tags: string[] | null;
  image_url: string | null;
  image_path: string | null;
  link: string | null;
  sort: number;
  published: boolean;
};

const COLUMNS = "id, area, icon, title, description, tags, image_url, image_path, link, sort, published";

function fromRow(r: Row): ServiceCard {
  return {
    id: r.id,
    area: r.area,
    icon: r.icon || "box",
    title: r.title,
    description: r.description ?? "",
    tags: r.tags ?? [],
    imageUrl: r.image_url,
    imagePath: r.image_path,
    link: r.link,
    sort: r.sort,
    published: r.published,
  };
}

function defaults(): Record<CardAreaId, ServiceCard[]> {
  const out = {} as Record<CardAreaId, ServiceCard[]>;
  for (const area of cardAreaIds) {
    out[area] = homeCards.defaults[area].map((c, i) => ({
      ...c,
      id: `default-${area}-${i}`,
      area,
      imageUrl: null,
      imagePath: null,
      sort: i,
      published: true,
    }));
  }
  return out;
}

function group(rows: Row[]) {
  const out = Object.fromEntries(cardAreaIds.map((a) => [a, [] as ServiceCard[]])) as Record<CardAreaId, ServiceCard[]>;
  for (const r of rows) if (out[r.area]) out[r.area].push(fromRow(r));
  return out;
}

/**
 * Published cards for the public site, grouped by area.
 * Falls back to the starter cards when Supabase isn't set up or the table is missing,
 * so the home page always has content. An area the admin emptied on purpose stays empty.
 */
export async function getPublishedCards(): Promise<Record<CardAreaId, ServiceCard[]>> {
  const supabase = getSupabase();
  if (!supabase) return defaults();
  const { data, error } = await supabase
    .from(CARD_TABLE)
    .select(COLUMNS)
    .eq("published", true)
    .order("sort", { ascending: true })
    .order("created_at", { ascending: true });
  if (error || !data) return defaults();
  return group(data as Row[]);
}

/** Every card, including hidden ones, for the admin area. */
export async function getAllCards(): Promise<{ cards: Record<CardAreaId, ServiceCard[]>; error: string | null }> {
  const supabase = getSupabaseAdmin();
  const empty = group([]);
  if (!supabase) return { cards: empty, error: "missing-key" };
  const { data, error } = await supabase
    .from(CARD_TABLE)
    .select(COLUMNS)
    .order("sort", { ascending: true })
    .order("created_at", { ascending: true });
  if (error || !data) return { cards: empty, error: "missing-table" };
  return { cards: group(data as Row[]), error: null };
}
