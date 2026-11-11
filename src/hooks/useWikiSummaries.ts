import { useEffect, useState } from 'react'
import { fetchWikiSummary, type WikiSummary } from '../services/wikipedia'

interface UseWikiSummariesResult {
  items: WikiSummary[]
  loading: boolean
}

export function useWikiSummaries(titles: string[]): UseWikiSummariesResult {
  const [items, setItems] = useState<WikiSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    Promise.all(
      titles.map((title) =>
        fetchWikiSummary(title).catch(
          (): WikiSummary => ({ title, displayTitle: title, extract: '' }),
        ),
      ),
    ).then((results) => {
      if (!cancelled) {
        setItems(results)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [titles])

  return { items, loading }
}
