-- Shray's recordings (Google Drive links), the private uploader account, and the public visitor counter.
-- Run once in the Supabase SQL editor (or with `supabase db push`).
-- Audio stays in Google Drive; this database only stores titles, descriptions, Drive file ids, and counts.

-- 1. Who may add recordings. Add Shray's login email here (see README › "Shray's upload page").
create table if not exists public.site_admins (
  email text primary key
);
alter table public.site_admins enable row level security;
-- No policies: the list is invisible to visitors and only read by is_site_admin().

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.site_admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- 2. Recordings: everyone can see them, only the admin can add, edit, or remove them.
create table if not exists public.recordings (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 120),
  description text not null default '' check (char_length(description) <= 1000),
  drive_file_id text not null unique check (drive_file_id ~ '^[A-Za-z0-9_-]{10,}$'),
  plays bigint not null default 0,
  created_at timestamptz not null default now()
);
alter table public.recordings enable row level security;

drop policy if exists "Anyone can view recordings" on public.recordings;
create policy "Anyone can view recordings" on public.recordings
  for select using (true);

drop policy if exists "Admin can add recordings" on public.recordings;
create policy "Admin can add recordings" on public.recordings
  for insert to authenticated with check (public.is_site_admin());

drop policy if exists "Admin can edit recordings" on public.recordings;
create policy "Admin can edit recordings" on public.recordings
  for update to authenticated using (public.is_site_admin()) with check (public.is_site_admin());

drop policy if exists "Admin can delete recordings" on public.recordings;
create policy "Admin can delete recordings" on public.recordings
  for delete to authenticated using (public.is_site_admin());

-- 3. Public counters shown on the website.
create table if not exists public.site_counters (
  name text primary key,
  value bigint not null default 0
);
alter table public.site_counters enable row level security;

drop policy if exists "Anyone can read counters" on public.site_counters;
create policy "Anyone can read counters" on public.site_counters
  for select using (true);

insert into public.site_counters (name, value) values ('visitors', 0)
on conflict (name) do nothing;

-- Visitors can only add one at a time through these functions; they cannot set arbitrary values.
create or replace function public.count_visit()
returns bigint
language sql
security definer
set search_path = public
as $$
  update public.site_counters set value = value + 1 where name = 'visitors' returning value;
$$;

create or replace function public.count_play(recording_id uuid)
returns bigint
language sql
security definer
set search_path = public
as $$
  update public.recordings set plays = plays + 1 where id = recording_id returning plays;
$$;

revoke all on function public.count_visit() from public;
revoke all on function public.count_play(uuid) from public;
grant execute on function public.count_visit() to anon, authenticated;
grant execute on function public.count_play(uuid) to anon, authenticated;
