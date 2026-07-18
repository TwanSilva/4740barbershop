import type { ReactNode } from 'react'
import locationImg from '../assets/visit/location.jpg'

/**
 * Wraps Services + Reviews with one continuous shop-interior background.
 * `bg-fixed` keeps the photo pinned to the viewport while both sections
 * scroll over it, so it reads as one backdrop revealed across the two
 * sections rather than two separate section images.
 */
export function LocationBackdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${locationImg})` }}>
      <div className="absolute inset-0 bg-ink/90" />
      <div className="relative">{children}</div>
    </div>
  )
}
