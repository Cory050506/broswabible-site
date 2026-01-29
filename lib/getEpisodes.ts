import { sanity } from './sanity'

export async function getEpisodes(page = 1, pageSize = 10, q = '') {
  const start = (page - 1) * pageSize
  const end = start + pageSize

  const hasQ = q && q.trim().length > 0

  // Search in title + description
  const filter = hasQ
    ? `*[_type == "episode" && (title match $q || description match $q)]`
    : `*[_type == "episode"]`

  const query = `{
    "items": ${filter} | order(episodeNumber desc) [${start}...${end}] {
      _id,
      title,
      episodeNumber,
      description,
      audioUrl,
      facebookUrl,
      publishedAt
    },
    "total": count(${filter})
  }`

  // Sanity "match" works best with wildcards
  const params = hasQ ? { q: `*${q.trim()}*` } : {}

  return sanity.fetch(query, params, { next: { revalidate: 30 } })
}
