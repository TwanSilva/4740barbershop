import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import { BUSINESS_FULL_NAME, BUSINESS_NAME, FACEBOOK_URL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_TEL } from '../lib/config'
import { StampMark } from './StampMark'
import { IconFacebook, IconInstagram, IconPhone } from './icons'

const NAV_LINKS: { key: 'nav_team' | 'nav_services' | 'nav_reviews' | 'nav_visit'; hash: string }[] = [
  { key: 'nav_team', hash: '#team' },
  { key: 'nav_services', hash: '#services' },
  { key: 'nav_reviews', hash: '#reviews' },
  { key: 'nav_visit', hash: '#visit' },
]

export function Footer() {
  const { tr } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold text-cream normal-case">
            <StampMark className="h-8 w-8" />
            {BUSINESS_NAME}
          </div>
          <p className="mt-2 max-w-xs text-sm text-cream-dim normal-case">{tr('footer_tagline')}</p>
        </div>

        <div>
          <p className="text-xs font-bold tracking-wide text-cream-dim-2 uppercase">{tr('footer_quick_links')}</p>
          <nav className="mt-3 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link key={link.key} to={`/${link.hash}`} className="text-sm text-cream-dim transition-colors duration-200 hover:text-gold">
                {tr(link.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-end">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-cream-dim transition-colors duration-200 hover:text-gold"
          >
            <IconInstagram className="h-4 w-4" />
            Instagram
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-cream-dim transition-colors duration-200 hover:text-gold"
          >
            <IconFacebook className="h-4 w-4" />
            Facebook
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-2 text-sm font-semibold text-cream-dim transition-colors duration-200 hover:text-gold"
          >
            <IconPhone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-cream-dim-2 normal-case">
        © {year} {BUSINESS_FULL_NAME}. {tr('footer_rights')}
      </p>
    </footer>
  )
}
