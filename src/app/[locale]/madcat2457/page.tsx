import type { Metadata } from "next";
import { logout } from "./actions";
import { LoginForm } from "./login-form";
import { isDeskAuthed } from "@/lib/admin-session";
import { getSupabaseAdmin } from "@/lib/supabase";

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
        .select("id, created_at, name, email, company, phone, location, interest, message")
        .order("created_at", { ascending: false })
    : null;
  const quotes = (loaded?.data ?? []) as Quote[];
  const failed = Boolean(loaded?.error);

  return (
    <main id="main" className="min-h-dvh px-5 py-10 sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-subtle">Offspring</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Messages</h1>
          </div>
          <form action={logout}>
            <input type="hidden" name="locale" value={locale} />
            <button type="submit" className="h-10 rounded-full border border-line-strong px-4 text-[14px] hover:bg-fg/5">
              Log out
            </button>
          </form>
        </div>

        {!supabase && (
          <p className="card-surface mt-8 rounded-2xl p-5 text-[15px] leading-relaxed text-fg-muted">
            The inbox needs the Supabase secret key. In Project Settings → API Keys, copy the secret key into{" "}
            <span className="font-mono text-[13px] text-fg">SUPABASE_SERVICE_ROLE_KEY</span> in `.env.local`, then restart the site. Keep that key out of chat.
          </p>
        )}

        {supabase && failed && (
          <p className="mt-8 text-[15px] text-pulse">Couldn’t load messages. Check the Supabase table and try again.</p>
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
                <p className="mt-1 text-[14px] text-signal">{q.interest}</p>
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
                </dl>
                <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed">{q.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
