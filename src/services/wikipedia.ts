export interface WikiSummary {
  title: string
  displayTitle: string
  extract: string
  thumbnailUrl?: string
}

type WikiLang = 'da' | 'en'

function apiBase(lang: WikiLang) {
  return `https://${lang}.wikipedia.org/api/rest_v1/page`
}

export async function fetchWikiSummary(title: string, lang: WikiLang = 'da'): Promise<WikiSummary> {
  const response = await fetch(`${apiBase(lang)}/summary/${encodeURIComponent(title)}`)
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

export async function fetchWikiSuggestions(query: string, lang: WikiLang = 'da'): Promise<string[]> {
  const params = new URLSearchParams({
    action: 'opensearch',
    search: query,
    limit: '8',
    namespace: '0',
    format: 'json',
    origin: '*',
  })

  const response = await fetch(`https://${lang}.wikipedia.org/w/api.php?${params.toString()}`)
  if (!response.ok) {
    return []
  }
  const data = await response.json()
  const titles: string[] = data[1] ?? []
  return titles
}
