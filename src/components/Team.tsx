import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import { useReveal } from '../hooks/useReveal'
import { TEAM } from '../lib/config'
import { SectionHeading } from './SectionHeading'

export function Team() {
  const { tr, lang } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="team" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={tr('team_eyebrow')} title={tr('team_title')} subtitle={tr('team_subtitle')} />

        <div ref={ref} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => {
            const bookHref = member.kind === 'barber' ? '/book/barber' : '/book/aesthetics/ictioterapia'
            return (
              <div
                key={member.id}
                data-reveal
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-charcoal p-6 transition-colors duration-200 hover:border-gold/60"
              >
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gold/10 text-lg font-bold text-gold">
                  {member.initials}
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-cream normal-case">{member.name}</h3>
                <p className="mt-1 text-xs font-bold tracking-wide text-gold uppercase">{member.role[lang]}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-cream-dim normal-case">{member.bio[lang]}</p>
                <Link
                  to={bookHref}
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-line px-4 py-2.5 text-xs font-bold text-cream transition-colors duration-200 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-[0.97]"
                >
                  {member.kind === 'barber' ? tr('team_book_barber') : tr('team_book_aesthetics')}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
