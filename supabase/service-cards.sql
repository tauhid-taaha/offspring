-- Home page cards (Software & IT · Supply · Installation & consultancy)
-- Run once in Supabase → SQL Editor. Safe to run again: nothing is duplicated.

-- 1) Table
create table if not exists public.service_cards (
  id          uuid primary key default gen_random_uuid(),
  area        text not null check (area in ('software', 'supply', 'install')),
  icon        text not null default 'box',
  title       text not null check (char_length(title) between 1 and 120),
  description text not null default '',
  tags        text[] not null default '{}',
  image_url   text,
  image_path  text,
  link        text,
  sort        integer not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists service_cards_area_sort_idx on public.service_cards (area, sort);

-- 2) Security: the public site may read published cards only.
--    Adding, editing and deleting happen on the server with the secret key (bypasses RLS).
alter table public.service_cards enable row level security;

drop policy if exists "Public reads published cards" on public.service_cards;
create policy "Public reads published cards"
  on public.service_cards for select
  to anon, authenticated
  using (published);

-- 3) Photo storage: a public bucket so card photos can be shown on the site.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('card-images', 'card-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do nothing;

-- 4) Starter cards (only added when the table is empty)
insert into public.service_cards (area, icon, title, description, tags, link, sort)
select * from (values
  ('software', 'school',   'School & College Management',   'Admission, attendance, exams & results, fees and guardian SMS — in one system.',                     array['Online admission','Result cards','Fee collection','Guardian SMS'],     '/solutions/digital#school-college', 0),
  ('software', 'chart',    'Business & Factory ERP',        'Inventory, sales, purchase, accounts, HR and payroll — with reports you can trust.',                   array['Inventory','Accounts','HR & payroll','POS'],                           '/solutions/digital#erp', 1),
  ('software', 'globe',    'Websites & Portfolios',         'Fast, mobile-friendly websites for companies, institutions and professionals.',                        array['Company sites','Personal portfolios','E-commerce','Bangla/English'],   '/solutions/digital#websites', 2),
  ('software', 'phone',    'Mobile Apps',                   'Android and iOS apps for customers, students, staff and field teams.',                                 array['Android','iOS','Admin panel','Push notifications'],                    '/solutions/digital#mobile', 3),
  ('supply',   'bolt',     'Generators & Power Backup',     'Diesel and gas generators, IPS, online UPS and batteries for factories, offices and hospitals.',       array['Generators','IPS & UPS','Batteries','Stabilisers'],                    '/solutions/equipment#power', 0),
  ('supply',   'sun',      'Solar Systems',                 'On-grid and hybrid solar, batteries, street lights and irrigation pumps.',                             array['Solar panels','Inverters','Street lights','Irrigation pumps'],         '/solutions/equipment#solar', 1),
  ('supply',   'gear',     'Garment & Industrial Machinery','Sewing, cutting and finishing machines, compressors, pumps and workshop tools.',                        array['RMG machines','Compressors','Pumps & motors','Spare parts'],           '/solutions/equipment#industrial', 2),
  ('supply',   'server',   'IT, Networking & CCTV',         'Computers, printers, networking, servers and CCTV — supplied with warranty.',                          array['Laptops & PCs','Networking','CCTV','Access control'],                  '/solutions/equipment#it-security', 3),
  ('install',  'wrench',   'Machine Installation',          'Positioning, connection, testing and commissioning of machines and equipment.',                        array['Commissioning','Testing','Handover','Staff training'],                 '/solutions/engineering', 0),
  ('install',  'building', 'Electrical & Civil Works',      'Wiring, panels and earthing, plus machine foundations, cable trenches and site fit-out.',              array['Wiring & panels','Foundations','Cable trenches','Fit-out'],            '/solutions/engineering#civil', 1),
  ('install',  'sun',      'Solar & Network Setup',         'Rooftop solar, structured cabling, Wi-Fi and CCTV — installed neatly and safely.',                     array['Rooftop solar','Cabling','Wi-Fi','CCTV'],                              '/solutions/engineering#solar-install', 2),
  ('install',  'chart',    'Technical Consultancy',         'Site surveys, load calculation, equipment selection and BOQ — before you spend.',                      array['Site survey','Load calculation','Equipment selection','BOQ'],          '/contact?type=install', 3)
) as seed(area, icon, title, description, tags, link, sort)
where not exists (select 1 from public.service_cards);
