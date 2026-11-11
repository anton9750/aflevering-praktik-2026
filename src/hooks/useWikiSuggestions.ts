import { useEffect, useState } from 'react'
import { fetchWikiSuggestions } from '../services/wikipedia'

const DEBOUNCE_MS = 250

export function useWikiSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed) {
      setSuggestions([])
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    const timeout = setTimeout(() => {
      fetchWikiSuggestions(trimmed)
        .then((titles) => {
          if (!cancelled) {
            setSuggestions(titles)
          }
        })
        .catch(() => {
          if (!cancelled) {
            setSuggestions([])
          }
        })
        .finally(() => {
          if (!cancelled) {
            setLoading(false)
          }
        })
    }, DEBOUNCE_MS)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [query])

  return { suggestions, loading }
}
