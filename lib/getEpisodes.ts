import { sanity } from './sanity'

export async function getEpisodes() {
  return sanity.fetch(`
    *[_type == "episode"] | order(episodeNumber desc) {
      _id,
      title,
      episodeNumber,
      description,
      audioUrl,
      sourceUrl,
      publishedAt
    }
      { cache: 'no-store' }
  `)
}
