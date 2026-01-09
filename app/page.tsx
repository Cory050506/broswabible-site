import { getEpisodes } from '@/lib/getEpisodes'

export default async function Home() {
  const episodes = await getEpisodes()

  return (
    <main className="min-h-screen bg-white text-slate-800">
      
      {/* HERO */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Bros With a Bible
        </h1>

        <p className="text-lg text-slate-600">
          Two bros reading Scripture, talking honestly about what it means,
          and sharing lessons from God’s Word.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a
            href="https://open.spotify.com"
            target="_blank"
            className="px-6 py-3 rounded bg-black text-white"
          >
            Listen on Spotify
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            className="px-6 py-3 rounded border"
          >
            Watch on Facebook
          </a>
        </div>
      </section>

      {/* EPISODES */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-semibold mb-8">
          Episodes
        </h2>

        <div className="space-y-12">
          {episodes.map((ep: any) => (
            <div key={ep._id} className="border-t pt-8">
              <h3 className="text-xl font-semibold">
                Episode {ep.episodeNumber}: {ep.title}
              </h3>

              <p className="text-slate-600 mt-2">
                {ep.description}
              </p>

              {/* Spotify */}
              {ep.spotifyEmbed && (
                <iframe
                  src={ep.spotifyEmbed}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media"
                  className="mt-4 rounded"
                />
              )}

              {/* Facebook */}
              {ep.facebookUrl && (
                <a
                  href={ep.facebookUrl}
                  target="_blank"
                  className="inline-block mt-4 text-blue-600 underline"
                >
                  Watch video on Facebook
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-slate-500 text-sm">
        © {new Date().getFullYear()} Bros With a Bible
      </footer>

    </main>
  )
}