import { sanity } from './sanity'

export async function getEpisodes(page = 1, pageSize = 10, q = '') {
  const start = (page - 1) * pageSize
  const end = start + pageSize

  const hasQ = q.trim().length > 0

  const baseFilter = hasQ
    ? `*[_type == "episode" && (title match $q || description match $q)]`
    : `*[_type == "episode"]`

  const query = `{
    "items": ${baseFilter} | order(episodeNumber desc) [${start}...${end}]{
      _id,
      title,
      episodeNumber,
      description,
      audioUrl,
      facebookUrl,
      publishedAt
    },
    "total": count(${baseFilter})
  }`

  const params = hasQ ? { q: `*${q.trim()}*` } : {}

  return sanity.fetch(query, params, { next: { revalidate: 30 } })
}
