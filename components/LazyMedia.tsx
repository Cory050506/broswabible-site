'use client'

import { useMemo, useState } from 'react'

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
  const [mode, setMode] = useState<'none' | 'video' | 'audio'>('none')

  const fb = useMemo(() => fbEmbedSrc(facebookUrl), [facebookUrl])

  const hasVideo = Boolean(fb)
  const hasAudio = Boolean(audioUrl)

  // If only one exists, we still don’t auto-load — we show one button.
  if (!hasVideo && !hasAudio) return null

  return (
    <div className="mt-5">
      {/* Choice buttons */}
      {mode === 'none' && (
        <div className="flex flex-col gap-3">
          {hasVideo && (
            <button
              type="button"
              onClick={() => setMode('video')}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3
                         text-slate-100 hover:bg-white/15 transition"
            >
              ▶ Watch Video
            </button>
          )}

          {hasAudio && (
            <button
              type="button"
              onClick={() => setMode('audio')}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3
                         text-slate-100 hover:bg-white/15 transition"
            >
              🎧 Listen Audio
            </button>
          )}

          {/* optional fallback link */}
          {facebookUrl && (
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-300/70 underline underline-offset-4"
            >
              Having trouble? Open video on Facebook →
            </a>
          )}
        </div>
      )}

      {/* VIDEO */}
      {mode === 'video' && fb && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setMode('none')}
            className="text-sm text-slate-300/70 hover:text-slate-200 underline underline-offset-4"
          >
            ← Back (choose video/audio)
          </button>

          <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
            <iframe
              src={fb}
              className="h-full w-full"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              title={title}
            />
          </div>
        </div>
      )}

      {/* AUDIO */}
      {mode === 'audio' && audioUrl && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setMode('none')}
            className="text-sm text-slate-300/70 hover:text-slate-200 underline underline-offset-4"
          >
            ← Back (choose video/audio)
          </button>

          <audio controls preload="none" className="w-full">
            <source src={audioUrl} />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  )
}
