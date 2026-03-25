import { getEpisodeBySeasonAndNumber } from '@/lib/getEpisodeBySeasonAndNumber'
import LazyMedia from '@/components/LazyMedia'

export const dynamic = 'force-dynamic'

export default async function EpisodePage(props: {
  params: Promise<{ season: string; number: string }>
}) {
  const params = await props.params

  const season = parseInt(params.season, 10)
  const number = parseInt(params.number, 10)

  if (
    !Number.isFinite(season) ||
    season <= 0 ||
    !Number.isFinite(number) ||
    number <= 0
  ) {
    return (
      <main className="min-h-screen text-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="text-3xl font-bold">Invalid episode</h1>
          <a
            className="underline text-indigo-200 hover:text-indigo-100"
            href="/"
          >
            Back to home
          </a>
        </div>
      </main>
    )
  }

  const ep = await getEpisodeBySeasonAndNumber(season, number)

  if (!ep) {
    return (
      <main className="min-h-screen text-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="text-3xl font-bold">Episode not found</h1>
          <p className="text-slate-300/70 mt-2">
            We couldn’t find Season {season} • Episode {number}.
          </p>
          <a
            className="inline-block mt-6 underline text-indigo-200 hover:text-indigo-100"
            href="/"
          >
            Back to home
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen text-slate-100">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05060a] via-[#070a14] to-[#06030a]" />
        <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-[30vh] left-[-120px] h-[360px] w-[360px] rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-140px] h-[420px] w-[420px] rounded-full bg-emerald-400/15 blur-3xl" />
      </div>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <a
          className="text-indigo-200 hover:text-indigo-100 underline underline-offset-4"
          href="/"
        >
          ← Back to all episodes
        </a>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
          <p className="text-xs uppercase tracking-wider text-slate-300/70">
            Season {ep.seasonNumber} • Episode {ep.episodeNumber}
          </p>
          <h1 className="text-2xl font-bold mt-2">{ep.title}</h1>

          {ep.description && (
            <p className="text-slate-200/75 mt-4 whitespace-pre-line leading-relaxed">
              {ep.description}
            </p>
          )}

          <div className="mt-5">
            <LazyMedia
              facebookUrl={ep.facebookUrl}
              audioUrl={ep.audioUrl}
              title={`Season ${ep.seasonNumber} • Episode ${ep.episodeNumber}: ${ep.title}`}
            />
          </div>
        </div>
      </section>
    </main>
  )
}