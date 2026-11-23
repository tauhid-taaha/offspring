import type { Metadata } from "next";
import { AdminShell } from "./admin-shell";
import { LoginForm } from "./login-form";
import { isDeskAuthed } from "@/lib/admin-session";
import { getSupabaseAdmin } from "@/lib/supabase";
import en from "@/i18n/dictionaries/en";
import { isQuoteCategory, quoteCategoryIds, type QuoteCategoryId } from "@/lib/quote-catalog";
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
  message: string;
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

export default async function DeskPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ e?: string; c?: string }>;
}) {
  const { locale } = await params;
  const { e, c } = await searchParams;
  const filter = isQuoteCategory(c) ? c : null;

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
  const quotes = filter ? all.filter((q) => q.category === filter) : all;
  const count = (id: QuoteCategoryId | null) => (id ? all.filter((q) => q.category === id).length : all.length);
  const tabs = [null, ...quoteCategoryIds] as const;
  const failed = Boolean(loaded?.error);

  return (
    <AdminShell locale={locale} active="messages" title="Messages">

        {!supabase && (
          <p className="card-surface mt-8 rounded-2xl p-5 text-[15px] leading-relaxed text-fg-muted">
            The inbox needs the Supabase secret key. In Project Settings → API Keys, copy the secret key into{" "}
            <span className="font-mono text-[13px] text-fg">SUPABASE_SERVICE_ROLE_KEY</span> in `.env`, then restart the site. Keep that key out of chat.
          </p>
        )}

        {supabase && failed && (
          <p className="mt-8 text-[15px] text-pulse">Couldn’t load messages. Check the Supabase table and try again.</p>
        )}

        {supabase && !failed && all.length > 0 && (
          <nav aria-label="Filter by category" className="mt-8 flex flex-wrap gap-2">
            {tabs.map((id) => {
              const on = id === filter;
              return (
                <a
                  key={id ?? "all"}
                  href={id ? `?c=${id}` : "?"}
                  aria-current={on ? "page" : undefined}
                  className={
                    "inline-flex h-9 items-center gap-2 rounded-full border px-4 text-[14px] transition-colors " +
                    (on ? "border-signal bg-signal/15 font-medium text-fg" : "border-line-strong text-fg-muted hover:bg-fg/5")
                  }
                >
                  {id ? qt.categories[id].title : "All"}
                  <span className="font-mono text-[12px] text-fg-subtle">{count(id)}</span>
                </a>
              );
            })}
          </nav>
        )}

        {supabase && !failed && quotes.length === 0 && (
          <p className="mt-8 text-[15px] text-fg-muted">No messages yet.</p>
        )}

        {supabase && !failed && quotes.length > 0 && (
          <ul className="mt-8 grid gap-4">
            {quotes.map((q) => (
              <li key={q.id} className="card-surface rounded-2xl p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-lg font-semibold tracking-tight">{q.name}</h2>
                  <time className="text-[13px] text-fg-subtle" dateTime={q.created_at}>
                    {when.format(new Date(q.created_at))}
                  </time>
                </div>
                <p className="mt-1 text-[14px] font-medium text-signal">{q.category ? qt.categories[q.category].title : q.interest}</p>
                {q.items && q.items.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {q.items.map((item) => (
                      <li key={item} className="rounded-full bg-signal-soft px-2.5 py-1 text-[12px] font-medium text-signal">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                <dl className="mt-4 grid gap-2 text-[14px] sm:grid-cols-2">
                  <div>
                    <dt className="text-fg-subtle">Email</dt>
                    <dd>
                      <a className="hover:underline" href={`mailto:${q.email}`}>
                        {q.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-fg-subtle">Phone</dt>
                    <dd>
                      <a className="hover:underline" href={`tel:${q.phone}`}>
                        {q.phone}
                      </a>
                    </dd>
                  </div>
                  {q.company && (
                    <div>
                      <dt className="text-fg-subtle">Organisation</dt>
                      <dd>{q.company}</dd>
                    </div>
                  )}
                  {q.location && (
                    <div>
                      <dt className="text-fg-subtle">Location</dt>
                      <dd>{q.location}</dd>
                    </div>
                  )}
                  {Object.entries(detailLabels).map(([key, label]) => {
                    const v = q.details?.[key];
                    return typeof v === "string" && v ? (
                      <div key={key}>
                        <dt className="text-fg-subtle">{label}</dt>
                        <dd>{v}</dd>
                      </div>
                    ) : null;
                  })}
                </dl>
                {Array.isArray(q.details?.products) && q.details.products.length > 0 && (
                  <div className="mt-4 overflow-x-auto rounded-xl border border-line">
                    <table className="w-full text-left text-[14px]">
                      <thead className="bg-surface text-[12px] uppercase tracking-wide text-fg-subtle">
                        <tr>
                          <th className="px-3 py-2 font-medium">Product</th>
                          <th className="px-3 py-2 font-medium">Brand / model</th>
                          <th className="px-3 py-2 text-right font-medium">Qty</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {(q.details.products as QuoteProduct[]).map((p, i) => (
                          <tr key={i}>
                            <td className="px-3 py-2">{p.name}</td>
                            <td className="px-3 py-2 text-fg-muted">{p.model || "—"}</td>
                            <td className="whitespace-nowrap px-3 py-2 text-right">
                              {p.qty} {p.unit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {q.message && <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed">{q.message}</p>}
              </li>
            ))}
          </ul>
        )}
    </AdminShell>
  );
}
