import { supabase, type NewAppointment } from './supabase'
import { PROVIDER_SCHEDULES } from './booking'

const SLOT_STEP_MINUTES = 30

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

function toHHMM(minutes: number) {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0')
  const m = (minutes % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

export type Slot = {
  time: string // "HH:MM"
  available: boolean
}

type ExistingRange = { start_time: string; end_time: string }

/** Builds the day's bookable start times for a provider, marking any that
 * overlap an existing appointment (or don't fit before closing) as taken. */
export function generateDaySlots(
  providerId: string,
  dateStr: string,
  durationMinutes: number,
  existing: ExistingRange[],
): Slot[] {
  const weekday = new Date(`${dateStr}T12:00:00`).getDay()
  const schedule = PROVIDER_SCHEDULES[providerId] ?? []
  const row = schedule.find((r) => r.day === weekday)
  if (!row || !row.open || !row.close) return []

  const openMin = toMinutes(row.open)
  const closeMin = toMinutes(row.close)
  const busy = existing.map((e) => ({ start: toMinutes(e.start_time), end: toMinutes(e.end_time) }))

  const slots: Slot[] = []
  for (let start = openMin; start + durationMinutes <= closeMin; start += SLOT_STEP_MINUTES) {
    const end = start + durationMinutes
    const overlaps = busy.some((b) => start < b.end && end > b.start)
    slots.push({ time: toHHMM(start), available: !overlaps })
  }
  return slots
}

export async function fetchProviderAppointments(providerId: string, dateStr: string) {
  // Reads from the appointment_slots view, not the appointments table — the
  // anon key has no SELECT grant on appointments itself (see migration),
  // since that table holds client PII.
  const { data, error } = await supabase
    .from('appointment_slots')
    .select('start_time, end_time')
    .eq('provider_id', providerId)
    .eq('date', dateStr)

  if (error) throw error
  return data as ExistingRange[]
}

export function slotEndTime(startHHMM: string, durationMinutes: number) {
  return toHHMM(toMinutes(startHHMM) + durationMinutes)
}

export async function createAppointment(appointment: NewAppointment) {
  // No .select() here on purpose: the anon key has no SELECT grant on
  // appointments (see migration), and INSERT ... RETURNING requires one.
  // The confirmation screen renders from local booking state instead.
  const { error } = await supabase.from('appointments').insert(appointment)
  if (error) throw error
}

/** Postgres exclusion-constraint violation — the slot was taken by someone
 * else between fetching availability and submitting. */
export function isSlotConflictError(error: unknown): boolean {
  return Boolean(error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === '23P01')
}

export function nextDays(count: number): string[] {
  const days: string[] = []
  const today = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}
