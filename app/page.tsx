export const dynamic = 'force-dynamic'

import { getEpisodes } from '@/lib/getEpisodes'
import { getDailyVerse } from '@/lib/getDailyVerse'
import ShareEpisodeButton from '@/components/ShareEpisodeButton'
import LazyMedia from '@/components/LazyMedia'
import PaginationControls from '@/components/PaginationControls'
import Reveal from '@/components/Reveal'

type SearchParams = {
  page?: string
  q?: string
}

export default async function Home(props: {
  searchParams: Promise<SearchParams>
}) {
  const searchParams = await props.searchParams

  const pageSize = 10
  const page = Math.max(1, Number(searchParams.page ?? '1') || 1)
  const q = (searchParams.q ?? '').trim()

  const { items: episodes, total } = await getEpisodes(page, pageSize, q)
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const showLatest = page === 1 && !q
  const latest = showLatest ? episodes?.[0] : null
  const rest = showLatest ? episodes?.slice(1) ?? [] : episodes

  const verse = await getDailyVerse()

  return (
    <main className="min-h-screen text-slate-100">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05060a] via-[#070a14] to-[#06030a]" />
        <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-[30vh] left-[-120px] h-[360px] w-[360px] rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-140px] h-[420px] w-[420px] rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:22px_22px] opacity-40" />
      </div>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            {/* Daily Verse */}
            {verse && (
              <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur">
                <p className="text-xs uppercase tracking-wider text-slate-300/80 mb-1">
                  Daily Verse — {verse.reference}
                </p>
                <p className="text-slate-100/90 italic whitespace-pre-line">
                  {verse.text}
                </p>
                {verse.link && (
                  <a
                    href={verse.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-3 text-sm text-indigo-200 hover:text-indigo-100 underline underline-offset-4"
                  >
                    Read on BibleGateway →
                  </a>
                )}
              </div>
            )}

            {/* Logo */}
            <div className="mx-auto w-fit">
              <img
                src="/logo.jpg"
                alt="Bros With a Bible Logo"
                className="mx-auto mb-5 w-44 sm:w-56 md:w-64 rounded-2xl border border-white/10 bg-white/5 p-3 shadow-lg backdrop-blur transition-transform duration-300 hover:scale-[1.03]"
              />
            </div>

            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200/80 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400/90 shadow-[0_0_0_4px_rgba(52,211,153,0.15)]" />
              Weekly Scripture • Lessons • Real talk
            </p>

            <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight">
              Bros With a Bible
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-200/75">
              Weekly Christian podcast by two brothers in Christ, Rocco and Kayne.
            </p>

            {/* Links row */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://open.spotify.com/show/0BDGvnUCfxMA1hKb1Y0cOV?si=a5292b9144344b50"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition shadow-lg"
              >
                Listen on Spotify
              </a>

              <a
                href="https://www.youtube.com/@BrosWithaBible"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition backdrop-blur"
              >
                YouTube
              </a>

              <a
                href="https://www.instagram.com/bros_with_a_bible"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition backdrop-blur"
              >
                Instagram
              </a>

              <a
                href="https://www.tiktok.com/@broswithabible"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition backdrop-blur"
              >
                TikTok
              </a>
            </div>

            <p className="mt-6 text-sm text-slate-300/70">
              Luke 1:37 — “For with God nothing shall be impossible.”
            </p>
          </div>
        </Reveal>
      </section>

      {/* LATEST EPISODE */}
      {showLatest && (
        <section className="max-w-5xl mx-auto px-6 pb-10">
          <Reveal delay={0.05}>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end justify-between mb-4">
                <h2 className="text-2xl font-semibold">Latest Episode</h2>
                <span className="text-xs text-slate-300/60">Freshly published</span>
              </div>

              {!latest ? (
                <p className="text-slate-200/70">No episodes found yet.</p>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-300/70">
                        Episode {latest.episodeNumber}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-semibold mt-2">
                        {latest.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <ShareEpisodeButton episodeNumber={latest.episodeNumber} />
                      {latest.publishedAt && (
                        <p className="text-sm text-slate-300/70 whitespace-nowrap">
                          {new Date(latest.publishedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {latest.description && (
                    <p className="text-slate-200/75 mt-4 whitespace-pre-line leading-relaxed">
                      {latest.description}
                    </p>
                  )}

                  <div className="mt-5">
                    <LazyMedia
                      facebookUrl={latest.facebookUrl}
                      audioUrl={latest.audioUrl}
                      title={`Episode ${latest.episodeNumber}: ${latest.title}`}
                    />
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </section>
      )}

      {/* SEARCH + LIST */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <Reveal delay={0.08}>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">
                    {q ? 'Search Results' : 'All Episodes'}
                  </h2>
                  <p className="text-sm text-slate-300/70">
                    {total} episode{total === 1 ? '' : 's'}
                  </p>
                </div>

                <form action="/" method="GET" className="flex gap-2">
                  <input
                    name="q"
                    defaultValue={q}
                    placeholder="Search title or description…"
                    className="w-full sm:w-72 rounded-xl border border-white/10 bg-black/30 px-4 py-2
                               text-slate-100 placeholder:text-slate-400/70
                               outline-none focus:ring-2 focus:ring-indigo-400/30"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-white text-black px-4 py-2 font-medium hover:opacity-90 transition"
                  >
                    Search
                  </button>
                </form>
              </div>

              {q && (
                <div className="mt-3 text-sm text-slate-300/70">
                  Showing results for <span className="text-slate-100">“{q}”</span> —{' '}
                  <a className="underline underline-offset-4" href="/">
                    clear
                  </a>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-6">
                <PaginationControls page={page} totalPages={totalPages} q={q} />
              </div>
            )}

            {!episodes || episodes.length === 0 ? (
              <p className="text-slate-200/70 mt-8">No episodes found.</p>
            ) : (
              <div className="mt-10 space-y-8">
                {rest.map((ep: any, idx: number) => (
                  <Reveal key={ep._id} delay={Math.min(0.18, idx * 0.03)}>
                    <div
                      id={`ep-${ep.episodeNumber}`}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur scroll-mt-24"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-slate-300/70">
                            Episode {ep.episodeNumber}
                          </p>
                          <h3 className="text-xl font-semibold mt-2">{ep.title}</h3>
                        </div>
                        <ShareEpisodeButton episodeNumber={ep.episodeNumber} />
                      </div>

                      {ep.description && (
                        <p className="text-slate-200/75 mt-4 whitespace-pre-line leading-relaxed">
                          {ep.description}
                        </p>
                      )}

                      <div className="mt-5">
                        <LazyMedia
                          facebookUrl={ep.facebookUrl}
                          audioUrl={ep.audioUrl}
                          title={`Episode ${ep.episodeNumber}: ${ep.title}`}
                        />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-10">
                <PaginationControls page={page} totalPages={totalPages} q={q} />
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <footer className="text-center py-10 text-slate-300/60 text-sm">
        <p>
          For support, email{' '}
          <a className="underline underline-offset-4" href="mailto:support@broswabible.qzz.io">
            support@broswabible.qzz.io
          </a>
        </p>
        <p className="mt-2">© {new Date().getFullYear()} Bros With a Bible</p>
      </footer>
    </main>
  )
}
