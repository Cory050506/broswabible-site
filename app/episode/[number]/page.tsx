import { getEpisodeByNumber } from '@/lib/getEpisodeByNumber'
import LazyMedia from '@/components/LazyMedia'

export default async function EpisodePage({
  params,
}: {
  params: { number: string }
}) {
  const num = parseInt(params.number, 10)

  if (!Number.isFinite(num) || num <= 0) {
    return (
      <main className="min-h-screen bg-stone-50 text-slate-800">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="text-3xl font-bold">Invalid episode</h1>
          <a className="underline text-blue-600" href="/">
            Back to home
          </a>
        </div>
      </main>
    )
  }

  const ep = await getEpisodeByNumber(num)

  if (!ep) {
    return (
      <main className="min-h-screen bg-stone-50 text-slate-800">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="text-3xl font-bold">Episode not found</h1>
          <p className="text-slate-600 mt-2">We couldn’t find Episode {num}.</p>
          <a className="inline-block mt-6 underline text-blue-600" href="/">
            Back to home
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-50 text-slate-800">
      <section className="max-w-3xl mx-auto px-6 py-16">
        <a className="text-blue-600 underline" href="/">
          ← Back to all episodes
        </a>

        <div className="mt-8 rounded-lg border p-6 shadow-sm bg-white">
          <p className="text-sm text-slate-500">Episode {ep.episodeNumber}</p>
          <h1 className="text-2xl font-bold mt-1">{ep.title}</h1>

          {ep.description && (
            <p className="text-slate-600 mt-4 whitespace-pre-line">
              {ep.description}
            </p>
          )}

          <LazyMedia
            facebookUrl={ep.facebookUrl}
            audioUrl={ep.audioUrl}
            title={`Episode ${ep.episodeNumber}: ${ep.title}`}
          />
        </div>
      </section>
    </main>
  )
}
