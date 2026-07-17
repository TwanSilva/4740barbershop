import { useEffect, useRef } from 'react'

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))
    const targets = children.length > 0 ? children : [el]

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )

    for (const target of targets) {
      target.classList.add('reveal')
      observer.observe(target)
    }

    return () => observer.disconnect()
  }, [])

  return ref
}
