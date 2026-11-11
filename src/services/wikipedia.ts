export interface WikiSummary {
  title: string
  displayTitle: string
  extract: string
  thumbnailUrl?: string
}

const WIKI_API_BASE = 'https://da.wikipedia.org/api/rest_v1/page'

export async function fetchWikiSummary(title: string): Promise<WikiSummary> {
  const response = await fetch(`${WIKI_API_BASE}/summary/${encodeURIComponent(title)}`)
  if (!response.ok) {
    throw new Error(`Kunne ikke hente "${title}" fra Wikipedia`)
  }
  const data = await response.json()
  return {
    title,
    displayTitle: data.title ?? title,
    extract: data.extract ?? '',
    thumbnailUrl: data.thumbnail?.source,
  }
}
