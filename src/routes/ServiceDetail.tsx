import { Link, Navigate, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { MobileCallBar } from '../components/MobileCallBar'
import { StampWatermark } from '../components/StampMark'
import { SectionHeading } from '../components/SectionHeading'
import { useLang } from '../lib/i18n'
import { getService, SERVICE_DURATIONS } from '../lib/booking'
import { IconBeard, IconChevronLeft, IconFish, IconLaser, IconScissors, IconSparkle, IconSpa } from '../components/icons'

const SERVICE_ICONS: Record<string, typeof IconScissors> = {
  corte: IconScissors,
  'corte-barba': IconBeard,
  ictioterapia: IconFish,
  massagem: IconSpa,
  laser: IconLaser,
  'limpeza-de-pele': IconSparkle,
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { tr, lang } = useLang()
  const service = slug ? getService(slug) : undefined

  if (!service) return <Navigate to="/#services" replace />

  const light = service.category === 'aesthetics'
  const Icon = SERVICE_ICONS[service.slug] ?? IconScissors
  const duration = SERVICE_DURATIONS[service.slug]
  const bookHref = service.category === 'barber' ? `/book/barber?service=${service.slug}` : `/book/aesthetics/${service.slug}`

  return (
    <>
      <Header />
      <main className={light ? 'bg-mist' : 'bg-ink'}>
        <section className={`relative overflow-hidden py-20 sm:py-28 ${light ? 'bg-mist' : 'bg-ink'}`}>
          <StampWatermark className={`-right-24 -top-24 h-96 w-96 rotate-12 ${light ? 'text-stone' : 'text-gold'}`} />
          <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
            <Link
              to="/#services"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold normal-case ${light ? 'text-stone/70 hover:text-stone' : 'text-white/60 hover:text-white'}`}
            >
              <IconChevronLeft className="h-4 w-4" />
              {tr('service_back')}
            </Link>

            <div
              className={`mt-8 grid h-16 w-16 place-items-center rounded-2xl ${light ? 'bg-stone text-mist' : 'bg-gold text-ink'}`}
            >
              <Icon className="h-8 w-8" />
            </div>

            <h1 className={`mt-6 text-4xl font-black sm:text-6xl ${light ? 'text-stone' : 'text-white'}`}>
              {service.name[lang]}
            </h1>
            <p className={`mt-6 max-w-2xl text-lg leading-relaxed normal-case ${light ? 'text-stone/75' : 'text-white/70'}`}>
              {service.longDesc[lang]}
            </p>

            {duration && (
              <p className={`mt-6 text-sm font-semibold normal-case ${light ? 'text-gold-dim' : 'text-gold'}`}>
                {tr('service_duration_label')}: {duration} {tr('service_minutes')}
              </p>
            )}

            <Link
              to={bookHref}
              className="mt-10 inline-flex items-center rounded-full bg-gold px-8 py-4 text-sm font-bold text-ink transition-transform hover:scale-105"
            >
              {tr('service_book_now')}
            </Link>
          </div>
        </section>

        <section className={`py-16 ${light ? 'bg-mist-2' : 'bg-charcoal'}`}>
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <SectionHeading
              light={light}
              eyebrow={tr('services_eyebrow')}
              title={tr('services_title')}
              subtitle={tr('services_subtitle')}
            />
            <Link
              to="/#services"
              className={`mt-6 inline-flex items-center rounded-full border px-6 py-3 text-sm font-bold normal-case ${
                light ? 'border-stone/20 text-stone hover:border-gold/50' : 'border-white/15 text-white hover:border-gold/40'
              }`}
            >
              {tr('service_back')}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCallBar />
    </>
  )
}
