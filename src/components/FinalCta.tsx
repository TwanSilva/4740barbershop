import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import { useReveal } from '../hooks/useReveal'
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/config'
import { IconPhone } from './icons'
import { StampWatermark } from './StampMark'

export function FinalCta() {
  const { tr } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="bg-mist px-5 py-24 sm:px-8 sm:py-32">
      <div
        ref={ref}
        data-reveal
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-gold/30 bg-ink px-8 py-16 text-center shadow-xl sm:px-16"
      >
        <StampWatermark className="-top-20 -left-20 h-72 w-72 -rotate-12" />
        <StampWatermark className="-right-20 -bottom-20 h-72 w-72 rotate-12" />

        <div className="relative">
          <h2 className="text-gold-metallic text-4xl font-black sm:text-5xl">{tr('final_cta_title')}</h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/70 normal-case">{tr('final_cta_subtitle')}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book/barber"
              className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-lg font-bold text-ink transition-transform hover:scale-105"
            >
              {tr('final_cta_button')}
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-3 rounded-full border border-white/25 px-8 py-4 text-lg font-bold text-white transition-colors hover:border-white/60"
            >
              <IconPhone className="h-5 w-5" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
