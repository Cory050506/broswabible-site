'use client'

import { useState } from 'react'

export default function ShareEpisodeButton({ episodeNumber }: { episodeNumber: number }) {
  const [copied, setCopied] = useState(false)

  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/episode/${episodeNumber}`
      : `/episode/${episodeNumber}`

  async function onShare() {
    try {
      // iOS Safari / modern browsers
      if (navigator.share) {
        await navigator.share({
          title: `Episode ${episodeNumber} — Bros With a Bible`,
          url,
        })
        return
      }

      // Clipboard API (may fail on Safari)
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
        return
      }

      // Last-resort fallback for Safari
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)

      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // Don't crash hydration if anything fails
      alert(`Copy this link:\n${url}`)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={`/episode/${episodeNumber}`}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10
                   bg-white/5 px-3 py-1.5 text-sm text-slate-100
                   hover:bg-white/10 transition"
      >
        Open
      </a>

      <button
        onClick={onShare}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10
                   bg-white/5 px-3 py-1.5 text-sm text-slate-100
                   hover:bg-white/10 transition"
        type="button"
      >
        {copied ? 'Copied!' : 'Share'}
      </button>
    </div>
  )
}
