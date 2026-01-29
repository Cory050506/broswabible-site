import { getEpisodeByNumber } from '@/lib/getEpisodeByNumber'
import { getDailyVerse } from '@/lib/getDailyVerse'
import LazyMedia from '@/components/LazyMedia'

export default async function EpisodePage({
  params,
}: {
  params: { number: string }
}) {
  const num = Number(params.number)
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
  const verse = await getDailyVerse()

  if (!ep) {
    return (
      <main className="min-h-screen bg-stone-50 text-slate-800">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="text-3xl font-bold">Episode not found</h1>
          <p className="text-slate-600 mt-2">
            We couldn’t find Episode {num}.
          </p>
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

        {/* Daily Verse (small, optional) */}
        {verse && (
          <div className="mt-6 rounded-lg border bg-white px-6 py-4 shadow-sm">
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

        <div className="mt-8 rounded-lg border p-6 shadow-sm bg-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Episode {ep.episodeNumber}</p>
              <h1 className="text-2xl font-bold mt-1">{ep.title}</h1>
            </div>
            {ep.publishedAt && (
              <p className="text-sm text-slate-500 whitespace-nowrap">
                {new Date(ep.publishedAt).toLocaleDateString()}
              </p>
            )}
          </div>

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

        <footer className="text-center py-10 text-slate-500 text-sm">
          <p>
            For support, email{' '}
            <a className="underline" href="mailto:support@broswabible.qzz.io">
              support@broswabible.qzz.io
            </a>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Bros With a Bible</p>
        </footer>
      </section>
    </main>
  )
}
