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
