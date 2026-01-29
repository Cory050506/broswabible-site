'use client'

import { useEffect, useState } from 'react'

export default function ShareEpisodeButton({
  episodeNumber,
}: {
  episodeNumber: number
}) {
  const [copied, setCopied] = useState(false)

  const id = `ep-${episodeNumber}`

  useEffect(() => {
    // On first load, if URL has a hash, smoothly scroll to it
    const hash = window.location.hash?.replace('#', '')
    if (!hash) return

    const el = document.getElementById(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  async function onShare() {
    const base = window.location.href.split('#')[0]
    const url = `${base}#${id}`

    // update URL + scroll smoothly
    window.history.replaceState(null, '', `#${id}`)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      // fallback if clipboard blocked
      prompt('Copy this link:', url)
    }
  }

  return (
    <button
      onClick={onShare}
      className="inline-flex items-center gap-2 rounded border px-3 py-1.5 text-sm
                 bg-white hover:bg-slate-50 transition"
      type="button"
      aria-label={`Share Episode ${episodeNumber}`}
    >
      {copied ? 'Copied!' : 'Share'}
    </button>
  )
}
