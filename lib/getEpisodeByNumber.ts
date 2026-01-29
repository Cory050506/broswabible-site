import { sanity } from './sanity'

export async function getEpisodeByNumber(episodeNumber: number) {
  const query = `*[_type == "episode" && episodeNumber == $num][0]{
    _id,
    title,
    episodeNumber,
    description,
    audioUrl,
    facebookUrl,
    publishedAt
  }`

  return sanity.fetch(query, { num: episodeNumber }, { next: { revalidate: 30 } })
}
