import { useLang } from '../lib/i18n'
import { PROVIDERS } from '../lib/booking'

export function ProviderStep({ onSelect }: { onSelect: (providerId: string) => void }) {
  const { tr } = useLang()
  const barbers = PROVIDERS.filter((p) => p.kind === 'barber')

  return (
    <div>
      <h2 className="text-2xl font-black text-white sm:text-3xl">{tr('booking_step_provider_title')}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {barbers.map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={() => onSelect(provider.id)}
            className="group flex flex-col items-center gap-3 rounded-3xl border border-gold/15 bg-charcoal p-7 text-center transition-all hover:-translate-y-1 hover:border-gold/50"
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gold/10 text-xl font-black text-gold">
              {provider.name[0]}
            </div>
            <p className="text-lg font-bold text-white normal-case">{provider.name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
