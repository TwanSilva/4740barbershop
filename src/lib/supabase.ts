import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — copy .env.example to .env and fill them in. ' +
      'The site will render, but booking/admin features will fail until this is set.',
  )
}

// Falls back to a syntactically valid placeholder URL so createClient never
// throws at module load (which would blank-screen the whole app before
// Supabase is configured) — real calls just fail until .env is filled in.
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-anon-key')

export type AppointmentStatus = 'confirmed' | 'cancelled'

export type Appointment = {
  id: string
  service_slug: string
  provider_id: string
  date: string // YYYY-MM-DD
  start_time: string // HH:MM:SS
  end_time: string // HH:MM:SS
  duration_minutes: number
  client_name: string
  client_email: string
  client_phone: string
  client_notes: string | null
  status: AppointmentStatus
  reminder_sent: boolean
  created_at: string
}

export type NewAppointment = {
  service_slug: string
  provider_id: string
  date: string
  start_time: string
  end_time: string
  duration_minutes: number
  client_name: string
  client_email: string
  client_phone: string
  client_notes?: string
}
