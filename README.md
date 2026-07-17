# 4740 Barbershop

Marketing site + booking system for **4740 Barbershop** (Esposende, Portugal).
React + Vite + TypeScript + Tailwind CSS on the frontend, Supabase (Postgres +
Edge Functions) for data and email, Resend for transactional email.

Built as a reusable template — all business info, hours, team, services and
booking config live in a handful of clearly labeled files (see
[Editing business info](#editing-business-info)), so this can be re-skinned
for another barbershop/salon client.

## Stack

- React 19 + TypeScript, Vite, Tailwind CSS v4
- `react-router-dom` for client-side routing (home, service pages, booking
  flow, admin)
- Same `LanguageProvider` / `useLang()` / `t` bilingual (PT/EN) i18n pattern
  as the reference project, Portuguese by default
- Supabase: Postgres for `providers`/`appointments`, Row Level Security so
  the public anon key can only create bookings and read non-PII availability,
  Edge Functions (Deno) for everything that needs a real secret
- Resend for the booking confirmation email and the "1 hour before" reminder

## Getting started locally

```bash
npm install
cp .env.example .env   # then fill in VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
npm run dev
```

The site renders without Supabase configured, but booking and the admin
panel will fail until you complete the Supabase setup below.

## Supabase setup

1. Create a free project at [supabase.com](https://supabase.com).
2. **Database:** open the SQL editor and run
   [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql).
   This creates `providers` (seeded with Luís/Leandro/Enzo/Sónia),
   `appointments`, the `appointment_slots` view used for public availability,
   RLS policies, and — importantly — a Postgres **exclusion constraint** that
   makes double-booking a provider impossible even under concurrent requests,
   not just something the UI happens to prevent.
3. **Frontend env:** copy `Project Settings → API → Project URL` and `anon
   public` key into `.env` as `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
4. **Edge Functions:** install the [Supabase CLI](https://supabase.com/docs/guides/cli),
   then from the repo root:
   ```bash
   supabase login
   supabase link --project-ref <your-project-ref>
   supabase secrets set \
     RESEND_API_KEY=re_... \
     EMAIL_FROM="4740 Barbershop <bookings@yourdomain.pt>" \
     DB_WEBHOOK_SECRET=$(openssl rand -hex 16) \
     ADMIN_PASSWORD=choose-a-strong-shared-password
   supabase functions deploy send-confirmation
   supabase functions deploy send-reminders
   supabase functions deploy admin-appointments --no-verify-jwt
   ```
   (`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically
   — you don't set those yourself.)
5. **Confirmation email:** Dashboard → Database → Webhooks → Create a new
   webhook: table `appointments`, event `Insert`, type `HTTP Request`,
   URL = the deployed `send-confirmation` function URL, header
   `x-webhook-secret: <the DB_WEBHOOK_SECRET you set above>`.
6. **Reminder cron:** Dashboard → Edge Functions → `send-reminders` → enable
   a Cron schedule of `*/10 * * * *` (every 10 minutes). If your project's
   CLI/dashboard version doesn't offer Edge Function cron yet, enable the
   `pg_cron` and `pg_net` extensions instead and schedule:
   ```sql
   select cron.schedule(
     'send-reminders',
     '*/10 * * * *',
     $$ select net.http_post(
          url := 'https://<project-ref>.functions.supabase.co/send-reminders',
          headers := '{"Authorization": "Bearer <anon-or-service-key>"}'::jsonb
        ) $$
   );
   ```
7. **Resend:** create a free account at [resend.com](https://resend.com),
   verify a sending domain (or use their `onboarding@resend.dev` test
   address while developing), and use that API key as `RESEND_API_KEY`
   above.

## Admin panel

`/admin` is protected by a single shared password (`ADMIN_PASSWORD`, set as
an Edge Function secret above) — not per-staff logins, so any team member on
a shop device can check anyone's availability. It calls the
`admin-appointments` Edge Function, which is the only place the Supabase
service-role key is used; the browser only ever sends the shared password.

## Editing business info

Everything content-related lives in a small number of files, meant to be
edited without touching booking/rendering logic:

| What | File |
| --- | --- |
| Name, address, phone, socials, Google rating, hours, team, testimonials | `src/lib/config.ts` |
| Services, service durations, providers, per-provider weekly schedules | `src/lib/booking.ts` |
| All UI copy (PT/EN) | `src/lib/i18n.tsx` |
| Hero video / real logo file swap-in points | `LOGO_SRC` / `HERO_VIDEO_SRC` in `src/lib/config.ts` |

**Service durations** (`SERVICE_DURATIONS` in `src/lib/booking.ts`) are all
set to a 60-minute placeholder — edit each service's entry independently
once real durations are confirmed, booking/availability logic reads only
from that object.

**Provider schedules** (`PROVIDER_SCHEDULES` in `src/lib/booking.ts`) default
to the shop's general hours for every provider — edit each provider's rows
independently once their real hours are confirmed with the client.

**Logo:** the round "4740 Barbershop" stamp logo you provided couldn't be
saved into this repo as a file (it only ever reached the assistant as an
inline chat image, not a file on disk). The header, footer and favicon
currently fall back to a placeholder circular mark (`StampMark` in
`src/components/StampMark.tsx`). To use the real logo: drop the file at
`public/logo.png` (and ideally `public/og-image.jpg` for social previews),
then set `LOGO_SRC = '/logo.png'` in `src/lib/config.ts`.

**Hero video:** drop the files under `src/assets/hero/` and set
`HERO_VIDEO_SRC` in `src/lib/config.ts` — until then the hero falls back to
a dark gradient background.

## Project structure

```
src/
  lib/            business config, i18n, supabase client, booking/availability logic
  components/     shared homepage sections (Header, Hero, Team, Services, ...)
  booking/        multi-step booking flow building blocks
  routes/         Home, ServiceDetail, Booking, Admin
supabase/
  migrations/     SQL schema (run once in the Supabase SQL editor)
  functions/      Edge Functions: send-confirmation, send-reminders, admin-appointments
```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — oxlint
