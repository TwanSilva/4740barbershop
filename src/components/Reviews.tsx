import { useLang } from '../lib/i18n'
import { useReveal } from '../hooks/useReveal'
import { GOOGLE_RATING, GOOGLE_REVIEWS_COUNT, GOOGLE_REVIEW_URL, GOOGLE_SEARCH_URL, TESTIMONIALS } from '../lib/config'
import { SectionHeading } from './SectionHeading'
import { IconStar } from './icons'

export function Reviews() {
  const { tr, lang } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="reviews" className="relative bg-charcoal py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={tr('reviews_eyebrow')} title={tr('reviews_title')} />

        <div className="mt-10 flex flex-wrap items-center gap-4 border-b border-line pb-8">
          <div className="flex text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStar key={i} className="h-6 w-6" />
            ))}
          </div>
          <p className="text-2xl font-bold text-cream">{GOOGLE_RATING.toFixed(1)}</p>
          <p className="text-sm font-semibold text-cream-dim normal-case">
            {GOOGLE_REVIEWS_COUNT} {tr('hero_stat_reviews')} · Google
          </p>
        </div>

        <div ref={ref} className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-3">
          {TESTIMONIALS.map((quote, i) => (
            <blockquote key={i} data-reveal className="border-l-2 border-gold/40 pl-5">
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, j) => (
                  <IconStar key={j} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-4 text-base leading-relaxed text-cream normal-case">“{quote[lang]}”</p>
            </blockquote>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-ink transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal active:scale-95"
          >
            {tr('reviews_leave')}
          </a>
          <a
            href={GOOGLE_SEARCH_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line px-6 py-3.5 text-sm font-bold text-cream transition-colors duration-200 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-95"
          >
            {tr('reviews_see_all')}
          </a>
        </div>
      </div>
    </section>
  )
}
