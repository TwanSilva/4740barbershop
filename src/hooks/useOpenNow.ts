import { useEffect, useMemo, useState } from 'react'
import { HOURS, type HourRow } from '../lib/config'

function nowInLisbon() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Lisbon',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())

  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  const weekdayStr = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon'
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0')
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0')
  return { day: weekdayMap[weekdayStr], minutesNow: hour * 60 + minute }
}

export function useOpenNow(hours: HourRow[] = HOURS) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    function check() {
      const { day, minutesNow } = nowInLisbon()
      const row = hours.find((r) => r.day === day)
      if (!row || !row.open || !row.close) {
        setIsOpen(false)
        return
      }
      const [openH, openM] = row.open.split(':').map(Number)
      const [closeH, closeM] = row.close.split(':').map(Number)
      const openMinutes = openH * 60 + openM
      const closeMinutes = closeH * 60 + closeM
      setIsOpen(minutesNow >= openMinutes && minutesNow < closeMinutes)
    }

    check()
    const interval = setInterval(check, 60_000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hours])

  return isOpen
}

export function useCurrentDayKey(hours: HourRow[] = HOURS) {
  return useMemo(() => {
    const { day } = nowInLisbon()
    return hours.find((r) => r.day === day)?.dayKey
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hours])
}
