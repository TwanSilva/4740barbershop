import { Link, Navigate, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { MobileCallBar } from '../components/MobileCallBar'
import { StampWatermark } from '../components/StampMark'
import { useLang } from '../lib/i18n'
import { getService, SERVICE_DURATIONS } from '../lib/booking'
import { SERVICE_MEDIA } from '../lib/service-media'
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
  const media = SERVICE_MEDIA[service.slug]

  return (
    <>
      <Header />
      <main className={media ? 'bg-ink' : 'bg-mist'}>
        <section className="relative overflow-hidden py-24 sm:py-32">
          {media ? (
            <>
              <video
                className="absolute inset-y-0 left-1/2 h-full w-[min(100%,980px)] -translate-x-1/2 object-cover"
                poster={media.video.poster}
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
              >
                <source src={media.video.webm} type="video/webm" />
                <source src={media.video.mp4} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
            </>
          ) : (
            <StampWatermark className="-right-24 -top-24 h-96 w-96 rotate-12 text-stone" />
          )}

          <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
            <Link
              to="/#services"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold normal-case transition-colors duration-200 ${
                media ? 'text-cream-dim hover:text-cream' : 'text-stone-dim hover:text-stone'
              }`}
            >
              <IconChevronLeft className="h-4 w-4" />
              {tr('service_back')}
            </Link>

            <div
              className={`mt-8 grid h-16 w-16 place-items-center rounded-2xl ${media ? 'bg-gold text-ink' : 'bg-stone text-mist'}`}
            >
              <Icon className="h-8 w-8" />
            </div>

            <h1 className={`mt-6 text-4xl font-bold sm:text-6xl ${media ? 'text-cream' : 'text-stone'}`}>
              {service.name[lang]}
            </h1>

            {media?.caption && (
              <div className="mt-6 max-w-2xl border-l-2 border-gold/50 pl-5">
                <p className="text-xl font-bold text-cream normal-case sm:text-2xl">{media.caption.headline[lang]}</p>
                <p className="mt-2 text-base leading-relaxed text-cream-dim normal-case">{media.caption.subline[lang]}</p>
              </div>
            )}

            <p className={`mt-6 max-w-2xl text-lg leading-relaxed normal-case ${media ? 'text-cream-dim' : 'text-stone-dim'}`}>
              {service.longDesc[lang]}
            </p>

            {duration && (
              <p className={`mt-6 text-sm font-semibold normal-case ${media ? 'text-gold' : 'text-gold-dim'}`}>
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
