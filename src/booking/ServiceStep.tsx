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
      <h2 className="text-2xl font-bold text-cream sm:text-3xl">{tr('booking_step_service_title')}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {list.map((service) => (
          <button
            key={service.slug}
            type="button"
            onClick={() => onSelect(service.slug)}
            className={`flex flex-col items-start rounded-3xl border p-6 text-left transition-all duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-[0.98] ${
              selected === service.slug ? 'border-gold bg-gold/10' : 'border-line bg-charcoal-2 hover:border-gold'
            }`}
          >
            <p className="text-lg font-bold text-cream normal-case">{service.name[lang]}</p>
            <p className="mt-2 text-sm leading-relaxed text-cream-dim normal-case">{service.shortDesc[lang]}</p>
            <p className="mt-3 text-xs font-bold text-gold uppercase">
              {SERVICE_DURATIONS[service.slug]} {tr('service_minutes')}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
