import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { MobileCallBar } from '../components/MobileCallBar'
import { useLang } from '../lib/i18n'
import { SERVICES } from '../lib/booking'
import { SERVICE_ICONS } from '../lib/service-icons'
import { IconScissors } from '../components/icons'

export default function BookingStartPage() {
  const { tr, lang } = useLang()

  return (
    <>
      <Header />
      <main className="min-h-[80vh] bg-ink">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="text-3xl font-bold text-cream sm:text-4xl">{tr('booking_step_service_title')}</h1>
          <p className="mt-3 text-base text-cream-dim normal-case">{tr('booking_start_subtitle')}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {SERVICES.map((service) => {
              const Icon = SERVICE_ICONS[service.slug] ?? IconScissors
              const href = service.category === 'barber' ? '/book/barber' : `/book/aesthetics/${service.slug}`
              return (
                <Link
                  key={service.slug}
                  to={href}
                  className="group flex flex-col gap-4 rounded-3xl border border-line bg-charcoal-2 p-7 text-left transition-all duration-200 hover:-translate-y-1 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-[0.98]"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/10 text-gold">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-cream normal-case">{service.name[lang]}</p>
                    <p className="mt-1 text-sm leading-relaxed text-cream-dim normal-case">{service.shortDesc[lang]}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
      <MobileCallBar />
    </>
  )
}
