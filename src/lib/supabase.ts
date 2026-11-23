import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function client(key: string | undefined): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Public form inserts. The anon key can insert only, because of row level security. */
export function getSupabase(): SupabaseClient | null {
  return client(process.env.SUPABASE_ANON_KEY);
}

/** Inbox reads. The secret key stays on the server and bypasses row level security. */
export function getSupabaseAdmin(): SupabaseClient | null {
  return client(process.env.SUPABASE_SERVICE_ROLE_KEY);
}
