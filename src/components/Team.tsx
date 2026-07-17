import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'
import { useReveal } from '../hooks/useReveal'
import { TEAM } from '../lib/config'
import { SectionHeading } from './SectionHeading'

export function Team() {
  const { tr, lang } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="team" className="relative bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          light
          eyebrow={tr('team_eyebrow')}
          title={tr('team_title')}
          subtitle={tr('team_subtitle')}
        />

        <div ref={ref} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => {
            const bookHref = member.kind === 'barber' ? '/book/barber' : '/book/aesthetics/ictioterapia'
            return (
              <div
                key={member.id}
                data-reveal
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-gold/25 bg-white p-6 shadow-sm transition-colors hover:border-gold"
              >
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-stone text-lg font-black text-gold-metallic">
                  {member.initials}
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-stone normal-case">{member.name}</h3>
                <p className="mt-1 text-xs font-bold tracking-wide text-gold-dim uppercase">{member.role[lang]}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-stone/70 normal-case">{member.bio[lang]}</p>
                <Link
                  to={bookHref}
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-stone/20 px-4 py-2.5 text-xs font-bold text-stone transition-colors hover:border-gold hover:text-gold-dim"
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
