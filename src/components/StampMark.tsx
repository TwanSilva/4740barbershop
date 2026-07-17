import { LOGO_SRC, BUSINESS_FULL_NAME } from '../lib/config'
import { IconBeard } from './icons'

/**
 * Placeholder for the real "4740 Barbershop" stamp logo (LOGO_SRC in
 * lib/config.ts). Renders the real file once it's supplied; until then falls
 * back to a simple circular mark echoing the same motif (ring border, beard
 * glyph, "4740" label) so header/favicon/watermarks aren't empty.
 */
export function StampMark({ className }: { className?: string }) {
  if (LOGO_SRC) {
    return <img src={LOGO_SRC} alt={BUSINESS_FULL_NAME} className={className} />
  }

  return (
    <div
      className={`relative grid place-items-center rounded-full border border-gold/70 text-gold ${className ?? 'h-10 w-10'}`}
    >
      <div className="absolute inset-1 rounded-full border border-gold/30" />
      <IconBeard className="h-[45%] w-[45%]" />
    </div>
  )
}

/** Large, faint rotated stamp watermark used as a section background accent. */
export function StampWatermark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border-[3px] border-gold text-gold opacity-[0.06] ${className ?? '-right-24 -top-24 h-96 w-96 rotate-12'}`}
    >
      <div className="absolute inset-4 rounded-full border border-gold" />
    </div>
  )
}
