'use client'

import { useState } from 'react'

export default function ShareEpisodeButton({
  seasonNumber,
  episodeNumber,
}: {
  seasonNumber: number
  episodeNumber: number
}) {
  const [copied, setCopied] = useState(false)

  async function onShare() {
    const url = `${window.location.origin}/season/${seasonNumber}/episode/${episodeNumber}`

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Season ${seasonNumber} • Episode ${episodeNumber}`,
          url,
        })
        return
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
        return
      }

      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)

      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      alert(`Copy this link:\n${url}`)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={`/season/${seasonNumber}/episode/${episodeNumber}`}
        className="
          inline-flex items-center gap-2 rounded-xl border border-white/10
          bg-white/5 px-3 py-1.5 text-sm text-slate-100
          backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
          hover:bg-white/10 transition
        "
      >
        Open
      </a>

      <button
        onClick={onShare}
        type="button"
        aria-label={`Share Season ${seasonNumber} Episode ${episodeNumber}`}
        className="
          inline-flex items-center gap-2 rounded-xl border border-white/10
          bg-white/5 px-3 py-1.5 text-sm text-slate-100
          backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
          hover:bg-white/10 transition
        "
      >
        {copied ? 'Copied!' : 'Share'}
      </button>
    </div>
  )
}