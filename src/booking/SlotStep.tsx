import { useEffect, useMemo, useState } from 'react'
import { useLang } from '../lib/i18n'
import { fetchProviderAppointments, generateDaySlots, nextDays, type Slot } from '../lib/availability'

const DAY_LABEL_LOCALE: Record<string, string> = { pt: 'pt-PT', en: 'en-GB' }

export function SlotStep({
  providerId,
  durationMinutes,
  light,
  onSelect,
}: {
  providerId: string
  durationMinutes: number
  light?: boolean
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
      <h2 className={`text-2xl font-black sm:text-3xl ${light ? 'text-stone' : 'text-white'}`}>
        {tr('booking_step_slot_title')}
      </h2>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {days.map((day) => {
          const date = new Date(`${day}T12:00:00`)
          const isSelected = day === selectedDay
          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`flex shrink-0 flex-col items-center rounded-2xl border px-4 py-3 transition-colors ${
                isSelected
                  ? 'border-gold bg-gold text-ink'
                  : light
                    ? 'border-stone/15 text-stone hover:border-gold/50'
                    : 'border-white/10 text-white hover:border-gold/40'
              }`}
            >
              <span className="text-[10px] font-bold uppercase">
                {date.toLocaleDateString(locale, { weekday: 'short' })}
              </span>
              <span className="text-base font-black">{date.getDate()}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-6">
        {loading && (
          <p className={`text-sm normal-case ${light ? 'text-stone/60' : 'text-white/50'}`}>{tr('booking_slot_loading')}</p>
        )}
        {!loading && slots && slots.length === 0 && (
          <p className={`text-sm normal-case ${light ? 'text-stone/60' : 'text-white/50'}`}>{tr('booking_slot_closed')}</p>
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
                className={`rounded-xl border px-3 py-3 text-sm font-bold transition-colors ${
                  slot.available
                    ? light
                      ? 'border-stone/15 text-stone hover:border-gold hover:bg-gold/10'
                      : 'border-white/10 text-white hover:border-gold hover:bg-gold/10'
                    : 'cursor-not-allowed border-transparent bg-white/5 text-white/25 line-through'
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
