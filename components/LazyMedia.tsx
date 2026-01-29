'use client'

import { useEffect, useRef, useState } from 'react'

function fbEmbedSrc(videoUrl?: string) {
  if (!videoUrl) return null
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    videoUrl
  )}&show_text=false`
}

export default function LazyMedia({
  facebookUrl,
  audioUrl,
  title,
}: {
  facebookUrl?: string
  audioUrl?: string
  title: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      // start loading a little before it enters the viewport
      { rootMargin: '400px 0px' }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const fb = fbEmbedSrc(facebookUrl)

  // Prefer Facebook if present; otherwise audio
  const hasMedia = !!fb || !!audioUrl

  return (
    <div ref={ref} className="mt-4">
      {!hasMedia ? null : !visible ? (
        <div className="rounded-lg border bg-slate-50 p-4 text-sm text-slate-600">
          Loading media…
        </div>
      ) : !loaded ? (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="w-full rounded-lg border bg-white px-4 py-3 text-sm hover:bg-slate-50 transition"
        >
          Click to load video/audio
        </button>
      ) : fb ? (
        <div className="aspect-video w-full overflow-hidden rounded-lg border bg-black">
          <iframe
            src={fb}
            className="h-full w-full"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            title={title}
          />
        </div>
      ) : (
        <audio controls preload="none" className="w-full">
          <source src={audioUrl} />
          Your browser does not support the audio element.
        </audio>
      )}

      {/* Always keep a simple direct link too */}
      {facebookUrl && (
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-blue-600 underline text-sm"
        >
          Watch video on Facebook
        </a>
      )}
    </div>
  )
}
