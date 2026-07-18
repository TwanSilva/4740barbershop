import { useEffect, useMemo, useState } from 'react'
import { useLang } from '../lib/i18n'
import { fetchProviderAppointments, generateDaySlots, nextDays, type Slot } from '../lib/availability'

const DAY_LABEL_LOCALE: Record<string, string> = { pt: 'pt-PT', en: 'en-GB' }

export function SlotStep({
  providerId,
  durationMinutes,
  onSelect,
}: {
  providerId: string
  durationMinutes: number
  onSelect: (date: string, time: string) => void
}) {
  const { tr, lang } = useLang()
  const days = useMemo(() => nextDays(21), [])
  const [selectedDay, setSelectedDay] = useState(days[0])
  const [slots, setSlots] = useState<Slot[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchProviderAppointments(providerId, selectedDay)
      .then((existing) => {
        if (cancelled) return
        setSlots(generateDaySlots(providerId, selectedDay, durationMinutes, existing))
      })
      .catch(() => {
        if (!cancelled) setSlots([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [providerId, selectedDay, durationMinutes])

  const locale = DAY_LABEL_LOCALE[lang] ?? 'en-GB'

  return (
    <div>
      <h2 className="text-2xl font-bold text-cream sm:text-3xl">{tr('booking_step_slot_title')}</h2>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {days.map((day) => {
          const date = new Date(`${day}T12:00:00`)
          const isSelected = day === selectedDay
          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`flex shrink-0 flex-col items-center rounded-2xl border px-4 py-3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-95 ${
                isSelected ? 'border-gold bg-gold text-ink' : 'border-line text-cream hover:border-gold'
              }`}
            >
              <span className="text-[10px] font-bold uppercase">
                {date.toLocaleDateString(locale, { weekday: 'short' })}
              </span>
              <span className="text-base font-bold">{date.getDate()}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-6">
        {loading && <p className="text-sm text-cream-dim normal-case">{tr('booking_slot_loading')}</p>}
        {!loading && slots && slots.length === 0 && (
          <p className="text-sm text-cream-dim normal-case">{tr('booking_slot_closed')}</p>
        )}
        {!loading && slots && slots.length > 0 && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {slots.map((slot) => (
              <button
                key={slot.time}
                type="button"
                disabled={!slot.available}
                onClick={() => onSelect(selectedDay, slot.time)}
                title={!slot.available ? tr('booking_slot_occupied') : undefined}
                className={`rounded-xl border px-3 py-3 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                  slot.available
                    ? 'border-line text-cream hover:border-gold hover:bg-gold/10 active:scale-95'
                    : 'cursor-not-allowed border-transparent bg-charcoal-2 text-cream-dim-2 line-through'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
