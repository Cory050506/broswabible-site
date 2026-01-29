'use client'

import { useState } from 'react'

export default function ShareEpisodeButton({
  episodeNumber,
}: {
  episodeNumber: number
}) {
  const [copied, setCopied] = useState(false)

  async function onShare() {
    const url = `${window.location.origin}/episode/${episodeNumber}`

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      prompt('Copy this link:', url)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={`/episode/${episodeNumber}`}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10
      bg-white/5 px-3 py-1.5 text-sm text-slate-100
      backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.04)]
      hover:bg-white/10 transition
"
      >
        Open
      </a>

      <button
        onClick={onShare}
        className="inline-flex items-center gap-2 rounded-xl
  bg-white text-black px-3 py-1.5 text-sm font-medium
  hover:opacity-90 transition"
        type="button"
        aria-label={`Share Episode ${episodeNumber}`}
      >
        {copied ? 'Copied!' : 'Share'}
      </button>
    </div>
  )
}
