import { sanity } from './sanity'

export async function getEpisodes(
  page = 1,
  pageSize = 10,
  q = '',
  season?: number
) {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const hasQ = q.trim().length > 0
  const hasSeason = Number.isFinite(season)

  const filters = [`_type == "episode"`]

  if (hasQ) {
    filters.push(`(title match $q || description match $q)`)
  }

  if (hasSeason) {
    filters.push(`seasonNumber == $season`)
  }

  const filter = `*[${filters.join(' && ')}]`

  const query = `{
    "items": ${filter} | order(publishedAt desc) [${start}...${end}]{
      _id,
      title,
      seasonNumber,
      episodeNumber,
      description,
      audioUrl,
      facebookUrl,
      publishedAt
    },
    "total": count(${filter}),
    "seasons": array::unique(*[_type == "episode" && defined(seasonNumber)] | order(seasonNumber desc).seasonNumber)
  }`

  const params: Record<string, any> = {}
  if (hasQ) params.q = `*${q.trim()}*`
  if (hasSeason) params.season = season

  return sanity.fetch(query, params, { next: { revalidate: 30 } })
}