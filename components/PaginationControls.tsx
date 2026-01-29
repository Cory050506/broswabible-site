'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

function buildHref(page: number, q?: string) {
  const parts: string[] = []
  if (q && q.trim()) parts.push(`q=${encodeURIComponent(q.trim())}`)
  if (page > 1) parts.push(`page=${page}`)
  return parts.length ? `/?${parts.join('&')}` : '/'
}

export default function PaginationControls({
  page,
  totalPages,
  q,
}: {
  page: number
  totalPages: number
  q?: string
}) {
  const router = useRouter()
  const [jump, setJump] = useState('')

  function go(toPage: number) {
    const safe = Math.min(totalPages, Math.max(1, toPage))
    router.push(buildHref(safe, q), { scroll: false })
  }

  function onJumpSubmit(e: React.FormEvent) {
    e.preventDefault()
    const n = parseInt(jump, 10)
    if (!Number.isFinite(n)) return
    go(n)
    setJump('')
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Prev / Next */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => go(page - 1)}
          disabled={page <= 1}
          className="
            px-4 py-2 rounded-xl
            border border-white/10
            bg-white/5 text-slate-100
            backdrop-blur
            hover:bg-white/10
            transition
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          ← Newer
        </button>

        <p className="text-sm text-slate-300/70">
          Page <span className="text-slate-100">{page}</span> of{' '}
          <span className="text-slate-100">{totalPages}</span>
        </p>

        <button
          onClick={() => go(page + 1)}
          disabled={page >= totalPages}
          className="
            px-4 py-2 rounded-xl
            border border-white/10
            bg-white/5 text-slate-100
            backdrop-blur
            hover:bg-white/10
            transition
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          Older →
        </button>
      </div>

      {/* Jump to page */}
      <form
        onSubmit={onJumpSubmit}
        className="flex items-center gap-2 justify-end"
      >
        <span className="text-sm text-slate-300/70">Go to</span>

        <input
          inputMode="numeric"
          pattern="[0-9]*"
          value={jump}
          onChange={(e) => setJump(e.target.value)}
          placeholder={`${page}`}
          className="
            w-20 rounded-xl
            border border-white/10
            bg-black/30
            px-3 py-2
            text-sm text-slate-100
            placeholder:text-slate-400/70
            outline-none
            focus:ring-2 focus:ring-indigo-400/30
          "
        />

        <span className="text-sm text-slate-300/70">
          / {totalPages}
        </span>

        <button
          type="submit"
          className="
            rounded-xl
            bg-white text-black
            px-3 py-2
            text-sm font-medium
            hover:opacity-90
            transition
          "
        >
          Go
        </button>
      </form>
    </div>
  )
}
