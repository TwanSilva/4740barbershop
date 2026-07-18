import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import { IconCheck } from '../components/icons'

export function Confirmation({
  serviceName,
  providerName,
  date,
  time,
}: {
  serviceName: string
  providerName: string
  date: string
  time: string
}) {
  const { tr, lang } = useLang()
  const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString(lang === 'pt' ? 'pt-PT' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-ink">
        <IconCheck className="h-8 w-8" />
      </div>
      <h2 className="mt-6 text-3xl font-bold text-cream sm:text-4xl">{tr('booking_confirmed_title')}</h2>
      <p className="mx-auto mt-4 max-w-md text-base text-cream-dim normal-case">{tr('booking_confirmed_body')}</p>

      <div className="mx-auto mt-8 max-w-sm border-t border-line pt-6 text-left">
        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-cream-dim">{tr('booking_summary_service')}</dt>
            <dd className="font-semibold text-cream normal-case">{serviceName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-cream-dim">{tr('booking_summary_provider')}</dt>
            <dd className="font-semibold text-cream normal-case">{providerName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-cream-dim">{tr('booking_summary_when')}</dt>
            <dd className="text-right font-semibold text-cream normal-case">
              {formattedDate}, {time}
            </dd>
          </div>
        </dl>
      </div>

      <Link
        to="/"
        className="mt-8 inline-flex items-center rounded-full bg-gold px-8 py-4 text-sm font-bold text-ink transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 active:scale-95"
      >
        {tr('booking_confirmed_back_home')}
      </Link>
    </div>
  )
}
