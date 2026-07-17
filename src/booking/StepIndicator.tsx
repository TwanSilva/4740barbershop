import { useLang } from '../lib/i18n'

export function StepIndicator({ step, total, light }: { step: number; total: number; light?: boolean }) {
  const { tr } = useLang()

  return (
    <div className="mb-8">
      <p className={`text-xs font-bold tracking-[0.2em] uppercase ${light ? 'text-gold-dim' : 'text-gold'}`}>
        {tr('booking_step_label', { n: step, total })}
      </p>
      <div className="mt-3 flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < step ? 'bg-gold' : light ? 'bg-stone/15' : 'bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
