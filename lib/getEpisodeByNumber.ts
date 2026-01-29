import { sanity } from './sanity'

export async function getEpisodeByNumber(num: number) {
  const query = `*[_type == "episode" && episodeNumber == $num][0]{
    _id,
    title,
    episodeNumber,
    description,
    audioUrl,
    facebookUrl,
    publishedAt
  }`

  return sanity.fetch(query, { num }, { next: { revalidate: 30 } })
}
