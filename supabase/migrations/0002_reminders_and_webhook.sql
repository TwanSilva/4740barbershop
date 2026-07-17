-- 4740 Barbershop — confirmation-email trigger + reminder cron
-- Run this in the Supabase SQL editor after 0001_init.sql AND after you've
-- deployed the send-confirmation / send-reminders Edge Functions (steps 3-5
-- in README.md), since it references their live URLs.

create extension if not exists pg_net;
create extension if not exists pg_cron;

-- Fires the confirmation email on every new appointment, in place of the
-- Dashboard "Database Webhooks" UI feature — same effect, but declarative
-- and checked into git. The secret below must match the DB_WEBHOOK_SECRET
-- Edge Function secret (see README.md step 4).
create or replace function public.notify_appointment_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url := 'https://cbndmczocihyqhhxjbvp.supabase.co/functions/v1/send-confirmation',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', 'f16e20cc83e15d6e9cf022e2d4a93025'
    ),
    body := jsonb_build_object('type', 'INSERT', 'table', 'appointments', 'record', to_jsonb(NEW))
  );
  return NEW;
end;
$$;

drop trigger if exists appointments_after_insert on public.appointments;
create trigger appointments_after_insert
  after insert on public.appointments
  for each row
  execute function public.notify_appointment_insert();

-- Reminder sweep every 10 minutes.
select cron.schedule(
  'send-reminders',
  '*/10 * * * *',
  $$
    select net.http_post(
      url := 'https://cbndmczocihyqhhxjbvp.supabase.co/functions/v1/send-reminders',
      headers := jsonb_build_object(
        'Authorization', 'Bearer sb_publishable_j9ybbX_jJh4t4n0NQogWXw_DehGuDB4'
      )
    )
  $$
);
