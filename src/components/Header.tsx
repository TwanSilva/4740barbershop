import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang, type Lang } from '../lib/i18n'
import { BUSINESS_NAME, PHONE_TEL } from '../lib/config'
import { StampMark } from './StampMark'
import { IconMenu, IconX } from './icons'

const NAV_LINKS: { key: 'nav_team' | 'nav_services' | 'nav_reviews' | 'nav_visit'; hash: string }[] = [
  { key: 'nav_team', hash: '#team' },
  { key: 'nav_services', hash: '#services' },
  { key: 'nav_reviews', hash: '#reviews' },
  { key: 'nav_visit', hash: '#visit' },
]

function LangToggle() {
  const { lang, setLang } = useLang()

  const options: { value: Lang; label: string }[] = [
    { value: 'pt', label: 'PT' },
    { value: 'en', label: 'EN' },
  ]

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={lang === opt.value}
          onClick={() => setLang(opt.value)}
          className={`rounded-full px-2.5 py-1 text-xs font-bold tracking-wide transition-colors ${
            lang === opt.value ? 'bg-gold text-ink' : 'text-white/60 hover:text-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const { tr } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link to="/#top" className="flex items-center gap-2.5 text-xl font-black tracking-tight text-white normal-case">
          <StampMark className="h-9 w-9" />
          {BUSINESS_NAME}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              to={`/${link.hash}`}
              className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              {tr(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LangToggle />
          <Link
            to="/book/barber"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink transition-transform hover:scale-105"
          >
            {tr('nav_cta')}
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LangToggle />
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white"
          >
            {menuOpen ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 bg-ink px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                to={`/${link.hash}`}
                onClick={() => setMenuOpen(false)}
                className="text-base font-semibold text-white/80"
              >
                {tr(link.key)}
              </Link>
            ))}
            <Link
              to="/book/barber"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-bold text-ink"
            >
              {tr('nav_cta')}
            </Link>
            <a href={`tel:${PHONE_TEL}`} className="text-center text-sm font-semibold text-white/60">
              {PHONE_TEL}
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
