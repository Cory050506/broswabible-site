import { getEpisodes } from '@/lib/getEpisodes'

export default async function Home() {
  const episodes = await getEpisodes()
  const latest = episodes?.[0]
  const rest = episodes?.slice(1) ?? []

  return (
    <main className="min-h-screen bg-stone-50 text-slate-800">
      {/* HERO */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <img src="/logo.jpg" alt="Bros With a Bible Logo" className="mx-auto mb-5 w-56 sm:w-64 md:w-72 rounded-xl border border-slate-200 p-3" />
        <h1 className="text-4xl font-bold mb-4">Bros With a Bible</h1>

        <p className="text-lg text-slate-600 whitespace-pre-line">
{`Weekly Christian podcast by two brothers in Christ, Rocco and Kayne.

Follow us on Instagram: @bros_with_a_bible
Follow us on TikTok: @broswithabible
Watch on YouTube: @broswithabible

Luke 1:37
"For with God nothing shall be impossible."`}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a
            href="https://open.spotify.com/show/0BDGvnUCfxMA1hKb1Y0cOV?si=a5292b9144344b50"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded bg-black text-white"
          >
            Listen on Spotify
          </a>

          <a
            href="https://facebook.com/kayne.couch"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded border"
          >
            Watch on Kayne&apos;s Facebook
          </a>

          <a
            href="https://facebook.com/rocco.willis.31"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded border"
          >
            Watch on Rocco&apos;s Facebook
          </a>
        </div>
      </section>

       {/* LATEST EPISODE */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold mb-4">Latest Episode</h2>

        {!latest ? (
          <p className="text-slate-600">No episodes found yet.</p>
        ) : (
          <div className="rounded-lg border p-6 shadow-sm bg-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">
                  Episode {latest.episodeNumber}
                </p>
                <h3 className="text-xl font-semibold mt-1">
                  {latest.title}
                </h3>
              </div>
              {latest.publishedAt && (
                <p className="text-sm text-slate-500 whitespace-nowrap">
                  {new Date(latest.publishedAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {latest.description && (
              <p className="text-slate-600 mt-3 whitespace-pre-line">
                {latest.description}
              </p>
            )}

            {latest.audioUrl && (
              <audio controls preload="none" className="mt-4 w-full">
                <source src={latest.audioUrl} />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        )}
      </section>


      {/* EPISODES */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-semibold mb-8">All Episodes</h2>

        {(!episodes || episodes.length === 0) ? (
          <p className="text-slate-600">No episodes found yet.</p>
        ) : (
          <div className="space-y-12">
            {episodes.map((ep: any) => (
              <div key={ep._id} className="border-t pt-8">
                <h3 className="text-xl font-semibold">
                  Episode {ep.episodeNumber}: {ep.title}
                </h3>

                {ep.description && (
                  <p className="text-slate-600 mt-2 whitespace-pre-line">
                    {ep.description}
                  </p>
                )}

                {/* Audio (RSS enclosure) */}
                {ep.audioUrl && (
                  <audio controls preload="none" className="mt-4 w-full">
                    <source src={ep.audioUrl} />
                    Your browser does not support the audio element.
                  </audio>
                )}

                {/* Optional links */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {ep.sourceUrl && (
                    <a
                      href={ep.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View episode source
                    </a>
                  )}

                  {ep.facebookUrl && (
                    <a
                      href={ep.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Watch video on Facebook
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-slate-500 text-sm">
        © {new Date().getFullYear()} Bros With a Bible
      </footer>
    </main>
  )
}
