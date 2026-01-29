import { getEpisodes } from '@/lib/getEpisodes'
import { getDailyVerse } from '@/lib/getDailyVerse'
import ShareEpisodeButton from '@/components/ShareEpisodeButton'
import LazyMedia from '@/components/LazyMedia'

function buildHref(page: number, q?: string) {
  const parts: string[] = []
  if (q && q.trim()) parts.push(`q=${encodeURIComponent(q.trim())}`)
  if (page > 1) parts.push(`page=${page}`)
  return parts.length ? `/?${parts.join('&')}` : '/'
}


export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; q?: string }
}) {
  const pageSize = 10
  const page = Math.max(1, Number(searchParams.page ?? '1') || 1)
  const q = (searchParams.q ?? '').trim()

  const { items: episodes, total } = await getEpisodes(page, pageSize, q)
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  // Only show "Latest Episode" when NOT searching and on page 1
  const showLatest = page === 1 && !q
  const latest = showLatest ? episodes?.[0] : null
  const rest = showLatest ? episodes?.slice(1) ?? [] : episodes

  const verse = await getDailyVerse()

  return (
    <main className="min-h-screen bg-stone-50 text-slate-800">
      {/* HERO */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <br />

        {/* DAILY VERSE */}
        {verse && (
          <div
            className="mb-6 rounded-lg border bg-white px-6 py-4 shadow-sm
                       transition-transform duration-200 hover:-translate-y-[1px]"
          >
            <p className="text-sm text-slate-500 mb-1">
              Daily Verse — {verse.reference}
            </p>
            <p className="text-slate-700 italic whitespace-pre-line">
              {verse.text}
            </p>

            {verse.link && (
              <a
                href={verse.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 underline text-sm"
              >
                Read on BibleGateway
              </a>
            )}
          </div>
        )}

        <img
          src="/logo.jpg"
          alt="Bros With a Bible Logo"
          className="mx-auto mb-5 w-56 sm:w-64 md:w-72 rounded-xl border border-slate-200 p-3
                     transition-transform duration-200 hover:scale-[1.02]"
        />

        <h1 className="text-4xl font-bold mb-4">Bros With a Bible</h1>

        <p className="text-lg text-slate-600 whitespace-pre-line">
          Weekly Christian podcast by two brothers in Christ, Rocco and Kayne.
        </p>

        {/* SEARCH */}
        <div className="mt-8 max-w-xl mx-auto">
          <form action="/" method="GET" className="flex gap-2">
            <input
              name="q"
              defaultValue={q}
              placeholder="Search episodes… (title or description)"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2
                         outline-none focus:ring-2 focus:ring-slate-200"
            />
            <button
              type="submit"
              className="rounded-lg bg-black text-white px-4 py-2 hover:opacity-90 transition"
            >
              Search
            </button>
          </form>

          {q && (
            <div className="mt-2 text-sm text-slate-500">
              Showing results for <span className="font-medium">“{q}”</span> —{' '}
              <a className="underline" href="/">
                clear
              </a>
            </div>
          )}
        </div>

        <br />
        <p className="text-lg text-slate-600 whitespace-pre-line">
          Follow us on Instagram:{' '}
          <a
            className="underline"
            href="https://www.instagram.com/bros_with_a_bible"
            target="_blank"
            rel="noopener noreferrer"
          >
            @bros_with_a_bible
          </a>
        </p>

        <br />
        <p className="text-lg text-slate-600 whitespace-pre-line">
          Follow us on TikTok:{' '}
          <a
            className="underline"
            href="https://www.tiktok.com/@broswithabible"
            target="_blank"
            rel="noopener noreferrer"
          >
            @broswithabible
          </a>
        </p>

        <br />
        <p className="text-lg text-slate-600 whitespace-pre-line">
          Watch on YouTube:{' '}
          <a
            className="underline"
            href="https://www.youtube.com/@BrosWithaBible"
            target="_blank"
            rel="noopener noreferrer"
          >
            @BrosWithaBible
          </a>
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="https://open.spotify.com/show/0BDGvnUCfxMA1hKb1Y0cOV?si=a5292b9144344b50"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded bg-black text-white transition hover:opacity-90"
          >
            Listen on Spotify
          </a>

          <a
            href="https://facebook.com/kayne.couch"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded border bg-white transition hover:bg-slate-50"
          >
            Watch on Kayne&apos;s Facebook
          </a>

          <a
            href="https://facebook.com/rocco.willis.31"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded border bg-white transition hover:bg-slate-50"
          >
            Watch on Rocco&apos;s Facebook
          </a>
        </div>
      </section>

      {/* LATEST EPISODE */}
      {showLatest && (
        <section
          className="max-w-3xl mx-auto px-6 pb-16"
          id={latest ? `ep-${latest.episodeNumber}` : undefined}
        >
          <h2 className="text-2xl font-semibold mb-4">Latest Episode</h2>

          {!latest ? (
            <p className="text-slate-600">No episodes found yet.</p>
          ) : (
            <div className="rounded-lg border p-6 shadow-sm bg-white transition-transform duration-200 hover:-translate-y-[1px]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">
                    Episode {latest.episodeNumber}
                  </p>
                  <h3 className="text-xl font-semibold mt-1">{latest.title}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <ShareEpisodeButton episodeNumber={latest.episodeNumber} />
                  {latest.publishedAt && (
                    <p className="text-sm text-slate-500 whitespace-nowrap">
                      {new Date(latest.publishedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {latest.description && (
                <p className="text-slate-600 mt-3 whitespace-pre-line">
                  {latest.description}
                </p>
              )}

              <LazyMedia
                facebookUrl={latest.facebookUrl}
                audioUrl={latest.audioUrl}
                title={`Episode ${latest.episodeNumber}: ${latest.title}`}
              />
            </div>
          )}
        </section>
      )}

      {/* ALL EPISODES */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="flex items-end justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold">
            {q ? 'Search Results' : 'All Episodes'}
          </h2>
          <p className="text-sm text-slate-500">
            {total} episode{total === 1 ? '' : 's'}
          </p>
        </div>

        {/* Pagination (top) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mb-8">
            <a
              className={`px-4 py-2 rounded border bg-white hover:bg-slate-50 transition ${
                page <= 1 ? 'pointer-events-none opacity-50' : ''
              }`}
              href={buildHref(page - 1, q)}
            >
              ← Newer
            </a>

            <p className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </p>

            <a
              className={`px-4 py-2 rounded border bg-white hover:bg-slate-50 transition ${
                page >= totalPages ? 'pointer-events-none opacity-50' : ''
              }`}
              href={buildHref(page + 1, q)}
            >
              Older →
            </a>
          </div>
        )}

        {(!episodes || episodes.length === 0) ? (
          <p className="text-slate-600">No episodes found.</p>
        ) : (
          <div className="space-y-12">
            {rest.map((ep: any) => (
              <div
                key={ep._id}
                id={`ep-${ep.episodeNumber}`}
                className="border-t pt-8 scroll-mt-24"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold">
                    Episode {ep.episodeNumber}: {ep.title}
                  </h3>
                  <ShareEpisodeButton episodeNumber={ep.episodeNumber} />
                </div>

                {ep.description && (
                  <p className="text-slate-600 mt-2 whitespace-pre-line">
                    {ep.description}
                  </p>
                )}

                <LazyMedia
                  facebookUrl={ep.facebookUrl}
                  audioUrl={ep.audioUrl}
                  title={`Episode ${ep.episodeNumber}: ${ep.title}`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Pagination (bottom) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-10">
            <a
              className={`px-4 py-2 rounded border bg-white hover:bg-slate-50 transition ${
                page <= 1 ? 'pointer-events-none opacity-50' : ''
              }`}
              href={buildHref(page - 1, q)}
            >
              ← Newer
            </a>

            <p className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </p>

            <a
              className={`px-4 py-2 rounded border bg-white hover:bg-slate-50 transition ${
                page >= totalPages ? 'pointer-events-none opacity-50' : ''
              }`}
              href={buildHref(page + 1, q)}
            >
              Older →
            </a>
          </div>
        )}
      </section>

      <footer className="text-center py-8 text-slate-500 text-sm">
        <p>
          For support, email{' '}
          <a className="underline" href="mailto:support@broswabible.qzz.io">
            support@broswabible.qzz.io
          </a>
        </p>
        <p className="mt-2">© {new Date().getFullYear()} Bros With a Bible</p>
      </footer>
    </main>
  )
}
