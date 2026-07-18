export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-bold tracking-[0.25em] text-gold uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold text-cream sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-cream-dim normal-case">{subtitle}</p>}
    </div>
  )
}
