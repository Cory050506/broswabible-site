import { sanity } from './sanity'

export async function getEpisodeBySeasonAndNumber(
  seasonNumber: number,
  episodeNumber: number
) {
  const query = `*[
    _type == "episode" &&
    seasonNumber == $season &&
    episodeNumber == $episode
  ][0]{
    _id,
    title,
    seasonNumber,
    episodeNumber,
    description,
    audioUrl,
    facebookUrl,
    publishedAt
  }`

  return sanity.fetch(
    query,
    { season: seasonNumber, episode: episodeNumber },
    { next: { revalidate: 30 } }
  )
}