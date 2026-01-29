import { sanity } from './sanity'

export async function getEpisodes(page = 1, pageSize = 10, q = '') {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const hasQ = q.trim().length > 0

  const filter = hasQ
    ? `*[_type == "episode" && (title match $q || description match $q)]`
    : `*[_type == "episode"]`

  const query = `{
    "items": ${filter} | order(episodeNumber desc) [${start}...${end}]{
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

  const params = hasQ ? { q: `*${q.trim()}*` } : {}

  // IMPORTANT: options go here, NOT inside the GROQ string
  return sanity.fetch(query, params, { next: { revalidate: 30 } })
}
