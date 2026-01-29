'use client'

import { useEffect, useRef, useState } from 'react'

export default function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    // If already shown, stop
    if (shown) return

    // Fallback: if no IntersectionObserver, just show
    if (!('IntersectionObserver' in window)) {
      setShown(true)
      return
    }

    const el = ref.current
    if (!el) {
      setShown(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      {
        root: null,
        threshold: 0.08,
        rootMargin: '120px 0px',
      }
    )

    obs.observe(el)

    // Extra Safari insurance: if it never intersects, show after 1.2s
    const t = window.setTimeout(() => setShown(true), 1200)

    return () => {
      window.clearTimeout(t)
      obs.disconnect()
    }
  }, [shown])

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}s`,
      }}
      className={[
        'transition-all duration-500 will-change-transform',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
      ].join(' ')}
    >
      {children}
    </div>
  )
}
