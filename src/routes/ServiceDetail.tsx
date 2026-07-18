import { Link, Navigate, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { MobileCallBar } from '../components/MobileCallBar'
import { StampWatermark } from '../components/StampMark'
import { useLang } from '../lib/i18n'
import { getService, SERVICE_DURATIONS } from '../lib/booking'
import { IconChevronLeft, IconFish, IconLaser, IconScissors, IconSparkle, IconSpa } from '../components/icons'

const SERVICE_ICONS: Record<string, typeof IconScissors> = {
  barbearia: IconScissors,
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

  const Icon = SERVICE_ICONS[service.slug] ?? IconScissors
  const duration = SERVICE_DURATIONS[service.slug]
  const bookHref = service.category === 'barber' ? '/book/barber' : `/book/aesthetics/${service.slug}`

  return (
    <>
      <Header />
      <main className="bg-mist">
        <section className="relative overflow-hidden py-24 sm:py-32">
          <StampWatermark className="-right-24 -top-24 h-96 w-96 rotate-12 text-stone" />
          <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
            <Link
              to="/#services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-dim normal-case transition-colors duration-200 hover:text-stone"
            >
              <IconChevronLeft className="h-4 w-4" />
              {tr('service_back')}
            </Link>

            <div className="mt-8 grid h-16 w-16 place-items-center rounded-2xl bg-stone text-mist">
              <Icon className="h-8 w-8" />
            </div>

            <h1 className="mt-6 text-4xl font-bold text-stone sm:text-6xl">{service.name[lang]}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-dim normal-case">{service.longDesc[lang]}</p>

            {duration && (
              <p className="mt-6 text-sm font-semibold text-gold-dim normal-case">
                {tr('service_duration_label')}: {duration} {tr('service_minutes')}
              </p>
            )}

            <Link
              to={bookHref}
              className="mt-10 inline-flex items-center rounded-full bg-gold px-8 py-4 text-sm font-bold text-ink transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 active:scale-95"
            >
              {tr('service_book_now')}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCallBar />
    </>
  )
}
