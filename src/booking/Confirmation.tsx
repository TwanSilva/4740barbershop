import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import { IconCheck } from '../components/icons'

export function Confirmation({
  light,
  serviceName,
  providerName,
  date,
  time,
}: {
  light?: boolean
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
      <h2 className={`mt-6 text-3xl font-black sm:text-4xl ${light ? 'text-stone' : 'text-white'}`}>
        {tr('booking_confirmed_title')}
      </h2>
      <p className={`mx-auto mt-4 max-w-md text-base normal-case ${light ? 'text-stone/70' : 'text-white/70'}`}>
        {tr('booking_confirmed_body')}
      </p>

      <div className={`mx-auto mt-8 max-w-sm rounded-3xl border p-6 text-left ${light ? 'border-stone/15 bg-white' : 'border-white/10 bg-charcoal'}`}>
        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className={light ? 'text-stone/60' : 'text-white/50'}>{tr('booking_summary_service')}</dt>
            <dd className={`font-semibold normal-case ${light ? 'text-stone' : 'text-white'}`}>{serviceName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className={light ? 'text-stone/60' : 'text-white/50'}>{tr('booking_summary_provider')}</dt>
            <dd className={`font-semibold normal-case ${light ? 'text-stone' : 'text-white'}`}>{providerName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className={light ? 'text-stone/60' : 'text-white/50'}>{tr('booking_summary_when')}</dt>
            <dd className={`text-right font-semibold normal-case ${light ? 'text-stone' : 'text-white'}`}>
              {formattedDate}, {time}
            </dd>
          </div>
        </dl>
      </div>

      <Link
        to="/"
        className="mt-8 inline-flex items-center rounded-full bg-gold px-8 py-4 text-sm font-bold text-ink transition-transform hover:scale-105"
      >
        {tr('booking_confirmed_back_home')}
      </Link>
    </div>
  )
}
