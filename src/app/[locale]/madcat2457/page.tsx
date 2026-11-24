import type { Metadata } from "next";
import { AdminShell } from "./admin-shell";
import { Inbox, type InboxQuote } from "./inbox";
import { LoginForm } from "./login-form";
import { isDeskAuthed } from "@/lib/admin-session";
import { getSupabaseAdmin } from "@/lib/supabase";
import en from "@/i18n/dictionaries/en";
import { isQuoteCategory, type QuoteCategoryId } from "@/lib/quote-catalog";
import type { QuoteProduct } from "@/app/actions/quote";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Messages",
  robots: { index: false, follow: false },
};

type Quote = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  phone: string;
  location: string | null;
  interest: string;
  message: string | null;
  category: QuoteCategoryId | null;
  items: string[] | null;
  details: Record<string, unknown> | null;
};

const qt = en.contact.quote;

/** Labels for the detail fields, in display order. */
const detailLabels: Record<string, string> = {
  budget: qt.software.budget,
  timeline: qt.software.timeline,
  website: "Website",
  district: "District",
  neededBy: "Needed by",
  siteType: qt.install.siteType,
  size: "Size",
  visitDate: "Site visit",
  needSupply: "Supply equipment too",
};

const when = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Dhaka",
});

function stamp(details: Record<string, unknown> | null, key: string) {
  const value = details?.[key];
  return typeof value === "string" && value.length > 0;
}

export default async function DeskPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ e?: string }>;
}) {
  const { locale } = await params;
  const { e } = await searchParams;

  if (!(await isDeskAuthed())) {
    return (
      <main id="main" className="flex min-h-dvh items-center justify-center px-5 py-16">
        <LoginForm locale={locale} failed={e === "1"} />
      </main>
    );
  }

  const supabase = getSupabaseAdmin();
  const loaded = supabase
    ? await supabase
        .from("quote_requests")
        .select("id, created_at, name, email, company, phone, location, interest, message, category, items, details")
        .order("created_at", { ascending: false })
    : null;
  const all = (loaded?.data ?? []) as Quote[];
  const failed = Boolean(loaded?.error);
  const quotes: InboxQuote[] = all.map((q) => ({
    id: q.id,
    when: when.format(new Date(q.created_at)),
    name: q.name,
    email: q.email,
    company: q.company,
    phone: q.phone,
    location: q.location,
    category: isQuoteCategory(q.category) ? qt.categories[q.category].title : q.interest,
    categoryId: isQuoteCategory(q.category) ? q.category : null,
    items: q.items ?? [],
    fields: Object.entries(detailLabels).flatMap(([key, label]) => {
      const value = q.details?.[key];
      return typeof value === "string" && value ? [{ label, value }] : [];
    }),
    products: Array.isArray(q.details?.products) ? (q.details.products as QuoteProduct[]) : [],
    message: q.message ?? "",
    seen: stamp(q.details, "_seen"),
    contacted: stamp(q.details, "_contacted"),
  }));

  return (
    <AdminShell locale={locale} active="messages" title="Messages" wide>

        {!supabase && (
          <p className="card-surface mt-8 rounded-2xl p-5 text-[15px] leading-relaxed text-fg-muted">
            The inbox needs the Supabase secret key. In Project Settings → API Keys, copy the secret key into{" "}
            <span className="font-mono text-[13px] text-fg">SUPABASE_SERVICE_ROLE_KEY</span> in `.env`, then restart the site. Keep that key out of chat.
          </p>
        )}

        {supabase && failed && (
          <p className="mt-8 text-[15px] text-pulse">Couldn’t load messages. Check the Supabase table and try again.</p>
        )}

        {supabase && !failed && quotes.length === 0 && (
          <p className="mt-8 text-[15px] text-fg-muted">No messages yet.</p>
        )}

        {supabase && !failed && quotes.length > 0 && <Inbox quotes={quotes} />}
    </AdminShell>
  );
}
