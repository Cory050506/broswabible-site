import { sanity } from '@/lib/sanity'

export async function getEpisodes() {
  return sanity.fetch(`
    *[_type == "episode"] | order(publishedAt desc) {
      _id,
      title,
      episodeNumber,
      description,
      spotifyEmbed,
      facebookUrl
    }
  `)
}