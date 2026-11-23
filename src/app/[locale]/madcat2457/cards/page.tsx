import type { Metadata } from "next";
import { AdminShell } from "../admin-shell";
import { LoginForm } from "../login-form";
import { CardsManager } from "./cards-manager";
import { isDeskAuthed } from "@/lib/admin-session";
import { getAllCards } from "@/lib/cards";
import homeCards, { cardAreaIds, cardIcons } from "@/i18n/dictionaries/en-cards";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cards",
  robots: { index: false, follow: false },
};

export default async function CardsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!(await isDeskAuthed())) {
    return (
      <main id="main" className="flex min-h-dvh items-center justify-center px-5 py-16">
        <LoginForm locale={locale} failed={false} />
      </main>
    );
  }

  const { cards, error } = await getAllCards();
  const areas = cardAreaIds.map((id) => ({
    id,
    label: homeCards.sections[id].label,
    title: homeCards.sections[id].title,
  }));

  return (
    <AdminShell locale={locale} active="cards" title="Home page cards" wide>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
        These cards appear on the home page in three sections. Add, edit, reorder, hide or delete them — changes go live straight away.
      </p>

      {error === "missing-key" && (
        <p className="card-surface mt-8 rounded-2xl p-5 text-[15px] leading-relaxed text-fg-muted">
          Cards need the Supabase secret key. Put it in <span className="font-mono text-[13px] text-fg">SUPABASE_SERVICE_ROLE_KEY</span> in
          `.env`, then restart the site.
        </p>
      )}
      {error === "missing-table" && (
        <p className="card-surface mt-8 rounded-2xl p-5 text-[15px] leading-relaxed text-fg-muted">
          The cards table isn’t set up yet. In Supabase → SQL Editor, run{" "}
          <span className="font-mono text-[13px] text-fg">supabase/service-cards.sql</span> from the project, then reload this page. Until then the
          home page shows the starter cards.
        </p>
      )}

      {!error && <CardsManager areas={areas} cards={cards} icons={[...cardIcons]} />}
    </AdminShell>
  );
}
