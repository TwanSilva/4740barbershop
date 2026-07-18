export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  /** Use on Sónia's aesthetics pages/sections for the lighter sub-theme. */
  light?: boolean
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-bold tracking-[0.25em] text-gold uppercase">{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${light ? 'text-stone' : 'text-cream'}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-4 text-base normal-case ${light ? 'text-stone-dim' : 'text-cream-dim'}`}>{subtitle}</p>
      )}
    </div>
  )
}
