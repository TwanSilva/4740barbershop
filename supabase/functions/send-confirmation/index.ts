// Triggered by a Supabase Database Webhook on INSERT into public.appointments.
// Configure in Dashboard → Database → Webhooks:
//   table: appointments, event: Insert, type: HTTP Request (POST)
//   URL: this function's deployed URL
//   Headers: x-webhook-secret: <same value as the DB_WEBHOOK_SECRET secret>
//
// Deploy: supabase functions deploy send-confirmation
// Secrets: supabase secrets set RESEND_API_KEY=... EMAIL_FROM=... DB_WEBHOOK_SECRET=...

import { PROVIDER_NAMES, SERVICE_NAMES } from '../_shared/labels.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const EMAIL_FROM = Deno.env.get('EMAIL_FROM') ?? '4740 Barbershop <onboarding@resend.dev>'
const DB_WEBHOOK_SECRET = Deno.env.get('DB_WEBHOOK_SECRET')

type AppointmentRecord = {
  id: string
  service_slug: string
  provider_id: string
  date: string
  start_time: string
  client_name: string
  client_email: string
}

Deno.serve(async (req) => {
  if (DB_WEBHOOK_SECRET) {
    const provided = req.headers.get('x-webhook-secret')
    if (provided !== DB_WEBHOOK_SECRET) {
      return new Response('Unauthorized', { status: 401 })
    }
  }

  const payload = await req.json()
  const record: AppointmentRecord = payload.record

  const serviceName = SERVICE_NAMES[record.service_slug] ?? record.service_slug
  const providerName = PROVIDER_NAMES[record.provider_id] ?? record.provider_id
  const formattedDate = new Date(`${record.date}T12:00:00`).toLocaleDateString('pt-PT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const time = record.start_time.slice(0, 5)

  const html = `
    <div style="font-family: Arial, sans-serif; color: #16161a;">
      <h2 style="color:#a8843a;">Marcação confirmada — 4740 Barbershop</h2>
      <p>Olá ${record.client_name},</p>
      <p>A tua marcação está confirmada:</p>
      <ul>
        <li><strong>Serviço:</strong> ${serviceName}</li>
        <li><strong>Com:</strong> ${providerName}</li>
        <li><strong>Quando:</strong> ${formattedDate}, ${time}</li>
      </ul>
      <p>Vais receber um lembrete 1 hora antes da tua marcação.</p>
      <p>Até já!</p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: record.client_email,
      subject: 'A tua marcação na 4740 Barbershop está confirmada',
      html,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error('Resend error', res.status, body)
    return new Response(body, { status: 502 })
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
