import { useLang } from '../lib/i18n'
import { IconScissors } from '../components/icons'

export type CutType = 'haircut' | 'combo'

export function CutTypeStep({ onSelect }: { onSelect: (cutType: CutType) => void }) {
  const { tr } = useLang()

  const options: { value: CutType; labelKey: 'booking_cuttype_haircut' | 'booking_cuttype_combo' }[] = [
    { value: 'haircut', labelKey: 'booking_cuttype_haircut' },
    { value: 'combo', labelKey: 'booking_cuttype_combo' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-cream sm:text-3xl">{tr('booking_step_cuttype_title')}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className="group flex flex-col items-center gap-3 rounded-3xl border border-line bg-charcoal-2 p-7 text-center transition-all duration-200 hover:-translate-y-1 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-[0.98]"
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gold/10 text-gold">
              <IconScissors className="h-7 w-7" />
            </div>
            <p className="text-lg font-bold text-cream normal-case">{tr(opt.labelKey)}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
