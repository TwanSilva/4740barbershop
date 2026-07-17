import { useLang } from '../lib/i18n'
import { SERVICES, SERVICE_DURATIONS, type Service } from '../lib/booking'

export function ServiceStep({
  services,
  selected,
  onSelect,
}: {
  services?: Service[]
  selected?: string
  onSelect: (slug: string) => void
}) {
  const { tr, lang } = useLang()
  const list = services ?? SERVICES.filter((s) => s.category === 'barber')

  return (
    <div>
      <h2 className="text-2xl font-black text-white sm:text-3xl">{tr('booking_step_service_title')}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {list.map((service) => (
          <button
            key={service.slug}
            type="button"
            onClick={() => onSelect(service.slug)}
            className={`flex flex-col items-start rounded-3xl border p-6 text-left transition-all hover:-translate-y-1 ${
              selected === service.slug ? 'border-gold bg-gold/10' : 'border-gold/15 bg-charcoal hover:border-gold/40'
            }`}
          >
            <p className="text-lg font-bold text-white normal-case">{service.name[lang]}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60 normal-case">{service.shortDesc[lang]}</p>
            <p className="mt-3 text-xs font-bold text-gold uppercase">
              {SERVICE_DURATIONS[service.slug]} {tr('service_minutes')}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
