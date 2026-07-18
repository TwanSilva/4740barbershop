import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import { GOOGLE_RATING, GOOGLE_REVIEWS_COUNT, HERO_VIDEO_SRC } from '../lib/config'
import { IconStar } from './icons'
import { StampWatermark } from './StampMark'

export function Hero() {
  const { tr } = useLang()
  const hasVideo = Boolean(HERO_VIDEO_SRC.mp4 || HERO_VIDEO_SRC.webm)

  return (
    <section id="top" className="relative overflow-hidden bg-ink">
      {hasVideo ? (
        <video
          className="absolute inset-y-0 left-1/2 h-full w-[min(100%,980px)] -translate-x-1/2 object-cover object-[50%_20%]"
          poster={HERO_VIDEO_SRC.poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          {HERO_VIDEO_SRC.webm && <source src={HERO_VIDEO_SRC.webm} type="video/webm" />}
          {HERO_VIDEO_SRC.mp4 && <source src={HERO_VIDEO_SRC.mp4} type="video/mp4" />}
        </video>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,var(--color-charcoal-2),var(--color-ink)_70%)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/50" />
      <StampWatermark className="-top-32 -right-32 h-[28rem] w-[28rem] rotate-12" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-gold/10 blur-[100px]" />

      <div className="relative mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-center px-5 py-24 sm:px-8">
        <p className="mb-5 text-sm font-bold tracking-[0.25em] text-gold uppercase">{tr('hero_eyebrow')}</p>
        <h1 className="max-w-3xl text-5xl leading-[0.95] font-bold text-cream sm:text-7xl">
          {tr('hero_headline')}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-cream-dim normal-case">{tr('hero_subheadline')}</p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            to="/book/barber"
            className="rounded-full bg-gold px-7 py-4 text-sm font-bold text-ink transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-95"
          >
            {tr('hero_cta_primary')}
          </Link>
          <Link
            to="/#services"
            className="rounded-full border border-line px-7 py-4 text-sm font-bold text-cream transition-colors duration-200 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-95"
          >
            {tr('hero_cta_secondary')}
          </Link>
        </div>

        <div className="mt-12 flex items-center gap-3">
          <div className="flex text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStar key={i} className="h-4 w-4" />
            ))}
          </div>
          <p className="text-sm font-semibold text-cream-dim">
            {GOOGLE_RATING.toFixed(1)} {tr('hero_stat_rating')} · {GOOGLE_REVIEWS_COUNT} {tr('hero_stat_reviews')}
          </p>
        </div>
      </div>
    </section>
  )
}
