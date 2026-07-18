import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import { useReveal } from '../hooks/useReveal'
import { SERVICES } from '../lib/booking'
import { SectionHeading } from './SectionHeading'
import { IconBeard, IconFish, IconLaser, IconScissors, IconSparkle, IconSpa } from './icons'
import { IconChevronRight } from './icons'

const SERVICE_ICONS: Record<string, typeof IconScissors> = {
  corte: IconScissors,
  'corte-barba': IconBeard,
  ictioterapia: IconFish,
  massagem: IconSpa,
  laser: IconLaser,
  'limpeza-de-pele': IconSparkle,
}

export function Services() {
  const { tr, lang } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={tr('services_eyebrow')}
          title={tr('services_title')}
          subtitle={tr('services_subtitle')}
        />

        <div ref={ref} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.slug] ?? IconScissors
            // Sónia's aesthetics services get the lighter sub-palette — a
            // deliberate, meaningful split (barber energy vs. spa energy),
            // not decoration.
            const light = service.category === 'aesthetics'
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                data-reveal
                className={`group flex flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-[0.98] ${
                  light ? 'border-mist-2 bg-mist hover:border-gold' : 'border-line bg-charcoal-2 hover:border-gold'
                }`}
              >
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl ${
                    light ? 'bg-stone text-mist' : 'bg-gold text-ink'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className={`mt-6 text-xl font-bold normal-case ${light ? 'text-stone' : 'text-cream'}`}>
                  {service.name[lang]}
                </h3>
                <p className={`mt-2 flex-1 text-sm leading-relaxed normal-case ${light ? 'text-stone-dim' : 'text-cream-dim'}`}>
                  {service.shortDesc[lang]}
                </p>
                <span
                  className={`mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${
                    light ? 'text-gold-dim' : 'text-gold'
                  }`}
                >
                  {tr('service_learn_more')}
                  <IconChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
