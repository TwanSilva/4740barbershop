// Scheduled reminder sender — fires the "1 hour before" email exactly once
// per appointment. Schedule this to run every 10-15 minutes via Supabase's
// Dashboard → Edge Functions → Cron (or `supabase functions deploy
// send-reminders --schedule "*/10 * * * *"` on newer CLI versions; on older
// setups, schedule a `pg_cron` job that calls this URL with `net.http_post`).
//
// Deploy: supabase functions deploy send-reminders
// Secrets: supabase secrets set RESEND_API_KEY=... EMAIL_FROM=...
// (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are auto-injected by Supabase.)

import { createClient } from 'npm:@supabase/supabase-js@2'
import { PROVIDER_NAMES, SERVICE_NAMES } from '../_shared/labels.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const EMAIL_FROM = Deno.env.get('EMAIL_FROM') ?? '4740 Barbershop <onboarding@resend.dev>'

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

const REMINDER_WINDOW_MIN_AHEAD = 50
const REMINDER_WINDOW_MAX_AHEAD = 70

function lisbonNowParts() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Lisbon',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value)
  return { y: get('year'), mo: get('month'), d: get('day'), h: get('hour'), mi: get('minute') }
}

function minutesUntil(dateStr: string, timeStr: string, now: ReturnType<typeof lisbonNowParts>) {
  const [y, mo, d] = dateStr.split('-').map(Number)
  const [h, mi] = timeStr.split(':').map(Number)
  const target = new Date(y, mo - 1, d, h, mi).getTime()
  const nowMs = new Date(now.y, now.mo - 1, now.d, now.h, now.mi).getTime()
  return (target - nowMs) / 60000
}

Deno.serve(async () => {
  const now = lisbonNowParts()
  const todayStr = `${now.y}-${String(now.mo).padStart(2, '0')}-${String(now.d).padStart(2, '0')}`
  const tomorrow = new Date(now.y, now.mo - 1, now.d + 1)
  const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`

  const { data: candidates, error } = await supabase
    .from('appointments')
    .select('id, service_slug, provider_id, date, start_time, client_name, client_email')
    .eq('status', 'confirmed')
    .eq('reminder_sent', false)
    .in('date', [todayStr, tomorrowStr])

  if (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  const due = (candidates ?? []).filter((a) => {
    const mins = minutesUntil(a.date, a.start_time.slice(0, 5), now)
    return mins >= REMINDER_WINDOW_MIN_AHEAD && mins <= REMINDER_WINDOW_MAX_AHEAD
  })

  let sent = 0
  for (const appt of due) {
    const serviceName = SERVICE_NAMES[appt.service_slug] ?? appt.service_slug
    const providerName = PROVIDER_NAMES[appt.provider_id] ?? appt.provider_id
    const time = appt.start_time.slice(0, 5)

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: appt.client_email,
        subject: 'Lembrete: a tua marcação é daqui a 1 hora',
        html: `
          <div style="font-family: Arial, sans-serif; color: #16161a;">
            <h2 style="color:#a8843a;">Lembrete — 4740 Barbershop</h2>
            <p>Olá ${appt.client_name},</p>
            <p>A tua marcação é daqui a cerca de 1 hora:</p>
            <ul>
              <li><strong>Serviço:</strong> ${serviceName}</li>
              <li><strong>Com:</strong> ${providerName}</li>
              <li><strong>Hora:</strong> ${time}</li>
            </ul>
            <p>Até já!</p>
          </div>
        `,
      }),
    })

    if (res.ok) {
      sent += 1
      await supabase.from('appointments').update({ reminder_sent: true }).eq('id', appt.id)
    } else {
      console.error('Resend error for appointment', appt.id, await res.text())
    }
  }

  return new Response(JSON.stringify({ checked: candidates?.length ?? 0, sent }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
