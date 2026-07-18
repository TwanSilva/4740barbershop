import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import { useReveal } from '../hooks/useReveal'
import { SERVICES } from '../lib/booking'
import { SectionHeading } from './SectionHeading'
import { IconFish, IconLaser, IconScissors, IconSparkle, IconSpa } from './icons'
import { IconChevronRight } from './icons'

const SERVICE_ICONS: Record<string, typeof IconScissors> = {
  barbearia: IconScissors,
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
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                data-reveal
                className="group flex flex-col overflow-hidden rounded-3xl border border-mist-2 bg-mist p-7 transition-all duration-200 hover:-translate-y-1 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-[0.98]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-stone text-mist">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-stone normal-case">{service.name[lang]}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-dim normal-case">
                  {service.shortDesc[lang]}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-gold-dim uppercase tracking-wide">
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
