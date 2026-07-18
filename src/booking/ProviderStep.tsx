import { useLang } from '../lib/i18n'
import { PROVIDERS } from '../lib/booking'

export function ProviderStep({ onSelect }: { onSelect: (providerId: string) => void }) {
  const { tr } = useLang()
  const barbers = PROVIDERS.filter((p) => p.kind === 'barber')

  return (
    <div>
      <h2 className="text-2xl font-bold text-cream sm:text-3xl">{tr('booking_step_provider_title')}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {barbers.map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={() => onSelect(provider.id)}
            className="group flex flex-col items-center gap-3 rounded-3xl border border-line bg-charcoal-2 p-7 text-center transition-all duration-200 hover:-translate-y-1 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-[0.98]"
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gold/10 text-xl font-bold text-gold">
              {provider.name[0]}
            </div>
            <p className="text-lg font-bold text-cream normal-case">{provider.name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
