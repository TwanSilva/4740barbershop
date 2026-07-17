type IconProps = {
  className?: string
}

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
}

export function IconBeard({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M6 8c0-3 2.5-5 6-5s6 2 6 5c0 1-.3 1.7-1 2.3 1 3.7 0 9.7-2.5 12.2-.8.8-1.6 1.2-2.5 1.2s-1.7-.4-2.5-1.2C7 20.3 6 14.3 7 10.6 6.3 10 6 9.3 6 8Z" />
      <path d="M10 9c0 3-.5 5.5-.5 5.5M14 9c0 3 .5 5.5.5 5.5" />
    </svg>
  )
}

export function IconScissors({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8.5 8 20 19M8.5 16 20 5M8 12h1" />
    </svg>
  )
}

export function IconFish({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M3 12c3-4 8-6 13-4 2 .8 4 2.4 5 4-1 1.6-3 3.2-5 4-5 2-10 0-13-4Z" />
      <path d="M18 9.5 21 7M18 14.5 21 17" />
      <circle cx="8" cy="11.3" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconSpa({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 21c-4.5-1-7-4.5-7-8.5C5 8 8 4.5 12 3c4 1.5 7 5 7 9.5 0 4-2.5 7.5-7 8.5Z" />
      <path d="M12 21V9" />
    </svg>
  )
}

export function IconLaser({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="4" y="10" width="9" height="4" rx="1.5" />
      <path d="M13 12h7M17 8l3-2M17 16l3 2" />
    </svg>
  )
}

export function IconSparkle({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M17.5 17.5 15 15M6 18l2.5-2.5M17.5 6.5 15 9" />
    </svg>
  )
}

export function IconMapPin({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M4.5 4.5h3.7l1.6 4.4-2.1 1.9a12.3 12.3 0 0 0 5.5 5.5l1.9-2.1 4.4 1.6v3.7c0 1-.9 1.8-1.9 1.6-4-.6-7.8-2.6-10.6-5.4C4.2 13 2.2 9.2 1.6 5.2c-.2-1 .6-1.9 1.6-1.9Z" />
    </svg>
  )
}

export function IconInstagram({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconFacebook({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.9.2-1.5 1.6-1.5H16.5V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8v3h2.3V21h3.2Z" />
    </svg>
  )
}

export function IconStar({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="m12 2.5 2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.6l-6.1 3.4 1.5-6.8L2.2 9.5l6.9-.7Z" />
    </svg>
  )
}

export function IconClock({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="m4 12 5.5 5.5L20 7" />
    </svg>
  )
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </svg>
  )
}

export function IconX({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  )
}

export function IconSearch({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export function IconChevronLeft({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M15 5 8 12l7 7" />
    </svg>
  )
}

export function IconChevronRight({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  )
}

export function IconCalendar({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </svg>
  )
}

export function IconLock({ className }: IconProps) {
  return (
    <svg className={className} {...base}>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  )
}
