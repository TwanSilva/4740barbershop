import { useLang } from '../lib/i18n'
import { useReveal } from '../hooks/useReveal'
import { useOpenNow, useCurrentDayKey } from '../hooks/useOpenNow'
import {
  ADDRESS_LINE,
  BUSINESS_FULL_NAME,
  FACEBOOK_URL,
  GOOGLE_REVIEW_URL,
  GOOGLE_SEARCH_URL,
  HOURS,
  INSTAGRAM_URL,
  MAPS_DIRECTIONS_URL,
  MAPS_EMBED_URL,
  PHONE_TEL,
} from '../lib/config'
import { SectionHeading } from './SectionHeading'
import { IconClock, IconFacebook, IconInstagram, IconMapPin, IconPhone, IconSearch, IconStar } from './icons'

function Hours() {
  const { tr } = useLang()
  const isOpen = useOpenNow()
  const currentDayKey = useCurrentDayKey()

  return (
    <div className="rounded-3xl border border-line bg-charcoal-2 p-7">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-cream normal-case">
          <IconClock className="h-5 w-5 text-gold" />
          {tr('hours_title')}
        </h3>
        {isOpen !== null && (
          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold normal-case ${
              isOpen ? 'bg-gold/15 text-gold' : 'bg-charcoal text-cream-dim'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-gold' : 'bg-cream-dim-2'}`} />
            {isOpen ? tr('hours_open_now') : tr('hours_closed_now')}
          </span>
        )}
      </div>

      <ul className="mt-5 divide-y divide-line">
        {HOURS.map((row) => (
          <li
            key={row.dayKey}
            className={`flex items-center justify-between py-3 text-sm normal-case ${
              currentDayKey === row.dayKey ? 'text-gold' : 'text-cream-dim'
            }`}
          >
            <span className="font-semibold">{tr(row.dayKey)}</span>
            <span className="font-medium">{row.open && row.close ? `${row.open} – ${row.close}` : tr('closed')}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Visit() {
  const { tr } = useLang()
  const ref = useReveal<HTMLDivElement>()

  const actions = [
    { key: 'visit_directions', href: MAPS_DIRECTIONS_URL, icon: <IconMapPin className="h-4 w-4" /> },
    { key: 'visit_call', href: `tel:${PHONE_TEL}`, icon: <IconPhone className="h-4 w-4" /> },
    { key: 'visit_instagram', href: INSTAGRAM_URL, icon: <IconInstagram className="h-4 w-4" /> },
    { key: 'visit_facebook', href: FACEBOOK_URL, icon: <IconFacebook className="h-4 w-4" /> },
    { key: 'visit_review', href: GOOGLE_REVIEW_URL, icon: <IconStar className="h-4 w-4" /> },
    { key: 'visit_find_google', href: GOOGLE_SEARCH_URL, icon: <IconSearch className="h-4 w-4" /> },
  ] as const

  return (
    <section id="visit" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={tr('visit_eyebrow')} title={tr('visit_title')} />

        <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-2">
          <div data-reveal className="flex flex-col gap-6">
            <Hours />

            <div className="rounded-3xl border border-line bg-charcoal-2 p-7">
              <p className="text-xs font-bold tracking-wide text-gold uppercase">{tr('address_label')}</p>
              <p className="mt-2 text-base font-semibold text-cream normal-case">{ADDRESS_LINE}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {actions.map((action) => (
                  <a
                    key={action.key}
                    href={action.href}
                    target={action.href.startsWith('tel:') ? undefined : '_blank'}
                    rel={action.href.startsWith('tel:') ? undefined : 'noreferrer'}
                    className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-xs font-bold text-cream transition-colors duration-200 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-95"
                  >
                    {action.icon}
                    {tr(action.key)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div data-reveal className="min-h-[360px] overflow-hidden rounded-3xl border border-line">
            <iframe
              title={`${BUSINESS_FULL_NAME} — Google Maps`}
              src={MAPS_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[360px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
