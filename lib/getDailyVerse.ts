export type DailyVerse = {
  reference: string
  text: string
  link?: string
}

function decodeHtmlEntities(text: string) {
  const map: Record<string, string> = {
    '&ldquo;': '“',
    '&rdquo;': '”',
    '&#8220;': '“',
    '&#8221;': '”',
    '&#8216;': '‘',
    '&#8217;': '’',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
  }

  return text.replace(
    /(&ldquo;|&rdquo;|&#8220;|&#8221;|&#8216;|&#8217;|&quot;|&#39;|&apos;|&amp;|&lt;|&gt;)/g,
    (m) => map[m] || m
  )
}

function stripHtml(input: string) {
  return decodeHtmlEntities(
    input
      .replace(/<!\[CDATA\[/g, '')
      .replace(/\]\]>/g, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .trim()
  )
}


export async function getDailyVerse(): Promise<DailyVerse | null> {
  // BibleGateway Verse of the Day Atom feed (free)
  const url = 'https://www.biblegateway.com/votd/get/?format=atom'

  const res = await fetch(url, {
    // refresh once per day
    next: { revalidate: 60 * 60 * 24 },
  })

  if (!res.ok) return null

  const xml = await res.text()

  // Grab the first entry
  const entryMatch = xml.match(/<entry\b[\s\S]*?<\/entry>/i)
  if (!entryMatch) return null

  const entry = entryMatch[0]

  const title = entry.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ''
  const content = entry.match(/<content[^>]*>([\s\S]*?)<\/content>/i)?.[1] ?? ''
  const link = entry.match(/<link[^>]*href="([^"]+)"/i)?.[1]

  const reference = stripHtml(title)
  const text = stripHtml(content)

  if (!reference && !text) return null

  return { reference, text, link }
}
