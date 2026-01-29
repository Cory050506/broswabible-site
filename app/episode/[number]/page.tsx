import { getEpisodeByNumber } from '@/lib/getEpisodeByNumber'
import LazyMedia from '@/components/LazyMedia'

export default async function EpisodePage(props: {
  params: Promise<{ number: string }>
}) {
  const params = await props.params
  const num = parseInt(params.number, 10)

  if (!Number.isFinite(num) || num <= 0) {
    return (
      <main className="min-h-screen text-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="text-3xl font-bold">Invalid episode</h1>
          <a className="underline text-indigo-200 hover:text-indigo-100" href="/">
            Back to home
          </a>
        </div>
      </main>
    )
  }

  const ep = await getEpisodeByNumber(num)

  if (!ep) {
    return (
      <main className="min-h-screen text-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="text-3xl font-bold">Episode not found</h1>
          <p className="text-slate-300/70 mt-2">We couldn’t find Episode {num}.</p>
          <a className="inline-block mt-6 underline text-indigo-200 hover:text-indigo-100" href="/">
            Back to home
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen text-slate-100">
      <section className="max-w-3xl mx-auto px-6 py-16">
        <a className="text-indigo-200 hover:text-indigo-100 underline underline-offset-4" href="/">
          ← Back to all episodes
        </a>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
          <p className="text-xs uppercase tracking-wider text-slate-300/70">
            Episode {ep.episodeNumber}
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
              title={`Episode ${ep.episodeNumber}: ${ep.title}`}
            />
          </div>
        </div>
      </section>
    </main>
  )
}