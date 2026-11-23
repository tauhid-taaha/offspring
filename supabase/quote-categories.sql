-- Category-based quote form: run once in Supabase → SQL Editor.
-- Older rows keep working; they just have no category.

alter table public.quote_requests
  add column if not exists category text
    check (category is null or category in ('software', 'supply', 'install')),
  add column if not exists items text[] not null default '{}',
  add column if not exists details jsonb not null default '{}'::jsonb;

-- Supply requests can be sent without a free-text message.
alter table public.quote_requests alter column message drop not null;

create index if not exists quote_requests_category_idx on public.quote_requests (category, created_at desc);
