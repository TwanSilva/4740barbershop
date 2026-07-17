const ADMIN_PASSWORD_KEY = '4740-admin-password'

export type AdminAppointment = {
  id: string
  service_slug: string
  provider_id: string
  date: string
  start_time: string
  end_time: string
  client_name: string
  client_email: string
  client_phone: string
  client_notes: string | null
  status: string
  reminder_sent: boolean
}

const FUNCTIONS_URL = `${import.meta.env.VITE_SUPABASE_URL ?? ''}/functions/v1`
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export function getStoredAdminPassword() {
  return sessionStorage.getItem(ADMIN_PASSWORD_KEY)
}

export function storeAdminPassword(password: string) {
  sessionStorage.setItem(ADMIN_PASSWORD_KEY, password)
}

export function clearAdminPassword() {
  sessionStorage.removeItem(ADMIN_PASSWORD_KEY)
}

export async function fetchAdminAppointments(password: string, providerId?: string) {
  const url = new URL(`${FUNCTIONS_URL}/admin-appointments`)
  if (providerId) url.searchParams.set('provider', providerId)

  const res = await fetch(url, {
    headers: {
      'x-admin-password': password,
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
    },
  })

  if (res.status === 401) throw new Error('unauthorized')
  if (!res.ok) throw new Error('request_failed')

  const body = await res.json()
  return body.appointments as AdminAppointment[]
}
