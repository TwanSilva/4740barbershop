-- 4740 Barbershop — initial schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) on a fresh project.

create extension if not exists btree_gist;

create table public.providers (
  id text primary key,
  name text not null,
  role text not null check (role in ('barber', 'aesthetics'))
);

insert into public.providers (id, name, role) values
  ('luis', 'Luís', 'barber'),
  ('leandro', 'Leandro', 'barber'),
  ('enzo', 'Enzo', 'barber'),
  ('sonia', 'Sónia', 'aesthetics');

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null,
  provider_id text not null references public.providers (id),
  date date not null,
  start_time time not null,
  end_time time not null,
  duration_minutes integer not null check (duration_minutes > 0),
  client_name text not null,
  client_email text not null,
  client_phone text not null,
  client_notes text,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  reminder_sent boolean not null default false,
  created_at timestamptz not null default now(),

  constraint end_after_start check (end_time > start_time)
);

-- Prevents two confirmed appointments for the same provider from ever
-- overlapping, even under concurrent bookings — enforced atomically by
-- Postgres itself, not just by the UI disabling occupied slots.
alter table public.appointments
  add constraint no_overlapping_appointments
  exclude using gist (
    provider_id with =,
    tsrange((date + start_time), (date + end_time)) with &&
  )
  where (status = 'confirmed');

create index appointments_provider_date_idx on public.appointments (provider_id, date);
create index appointments_reminder_idx on public.appointments (status, reminder_sent, date, start_time);

-- Non-sensitive view of booked slots — what the public booking UI queries to
-- render "Occupied" slots, without exposing any client PII to the anon key.
create view public.appointment_slots as
  select provider_id, date, start_time, end_time
  from public.appointments
  where status = 'confirmed';

alter table public.providers enable row level security;
alter table public.appointments enable row level security;

create policy "providers are publicly readable"
  on public.providers for select
  to anon
  using (true);

-- Anon may create bookings, but only via the columns below — id, status and
-- reminder_sent are never client-settable. There is intentionally no anon
-- SELECT/UPDATE/DELETE policy on this table: reading appointment PII and
-- cancelling/editing appointments only happens through the admin-appointments
-- Edge Function (service-role key, password gated).
create policy "anon can create appointments"
  on public.appointments for insert
  to anon
  with check (true);

revoke insert on public.appointments from anon;
grant insert (service_slug, provider_id, date, start_time, end_time, duration_minutes, client_name, client_email, client_phone, client_notes)
  on public.appointments to anon;

grant select on public.appointment_slots to anon;

-- Database Webhook (configure in Supabase Dashboard → Database → Webhooks):
-- table: appointments, event: INSERT, target: the deployed send-confirmation
-- Edge Function URL. See supabase/functions/send-confirmation/index.ts.
