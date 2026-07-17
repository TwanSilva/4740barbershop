import { useLang } from '../lib/i18n'
import { useReveal } from '../hooks/useReveal'
import { GOOGLE_RATING, GOOGLE_REVIEWS_COUNT, GOOGLE_REVIEW_URL, GOOGLE_SEARCH_URL, TESTIMONIALS } from '../lib/config'
import { SectionHeading } from './SectionHeading'
import { IconStar } from './icons'

export function Reviews() {
  const { tr, lang } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="reviews" className="relative bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading light eyebrow={tr('reviews_eyebrow')} title={tr('reviews_title')} />

        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-3xl border border-gold/25 bg-white px-7 py-6 shadow-sm">
          <div className="flex text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStar key={i} className="h-6 w-6" />
            ))}
          </div>
          <p className="text-2xl font-black text-stone">{GOOGLE_RATING.toFixed(1)}</p>
          <p className="text-sm font-semibold text-stone/60 normal-case">
            {GOOGLE_REVIEWS_COUNT} {tr('hero_stat_reviews')} · Google
          </p>
        </div>

        <div ref={ref} className="mt-10 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((quote, i) => (
            <blockquote key={i} data-reveal className="rounded-3xl border border-gold/25 bg-white p-7 shadow-sm">
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, j) => (
                  <IconStar key={j} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-4 text-base leading-relaxed text-stone/80 normal-case">“{quote[lang]}”</p>
            </blockquote>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-ink transition-transform hover:scale-105"
          >
            {tr('reviews_leave')}
          </a>
          <a
            href={GOOGLE_SEARCH_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-stone/25 px-6 py-3.5 text-sm font-bold text-stone transition-colors hover:border-gold"
          >
            {tr('reviews_see_all')}
          </a>
        </div>
      </div>
    </section>
  )
}
