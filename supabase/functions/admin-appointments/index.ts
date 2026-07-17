// Powers the /admin panel. Gated by a single shared password (not per-staff
// logins) so any team member can look up bookings across all providers.
// The service-role key never reaches the browser — only this function holds
// it, the frontend only ever sends the shared admin password.
//
// Deploy: supabase functions deploy admin-appointments --no-verify-jwt
// Secrets: supabase secrets set ADMIN_PASSWORD=...
// (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are auto-injected by Supabase.)

import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD')

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const providedPassword = req.headers.get('x-admin-password')
  if (!ADMIN_PASSWORD || providedPassword !== ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const url = new URL(req.url)
  const providerId = url.searchParams.get('provider')

  let query = supabase
    .from('appointments')
    .select('id, service_slug, provider_id, date, start_time, end_time, client_name, client_email, client_phone, client_notes, status, reminder_sent')
    .order('date', { ascending: true })
    .order('start_time', { ascending: true })

  if (providerId) {
    query = query.eq('provider_id', providerId)
  }

  const { data, error } = await query

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ appointments: data }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
