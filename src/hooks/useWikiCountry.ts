import { useEffect, useState } from 'react'
import { fetchWikiSummary, type WikiSummary } from '../services/wikipedia'

interface UseWikiCountryResult {
  country: WikiSummary | null
  history: WikiSummary | null
  loading: boolean
  error: boolean
}

export function useWikiCountry(name: string): UseWikiCountryResult {
  const [country, setCountry] = useState<WikiSummary | null>(null)
  const [history, setHistory] = useState<WikiSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!name) {
      return
    }

    let cancelled = false
    setLoading(true)
    setError(false)

    Promise.all([
      fetchWikiSummary(name, 'en'),
      fetchWikiSummary(`History of ${name}`, 'en').catch(() => null),
    ])
      .then(([countrySummary, historySummary]) => {
        if (cancelled) return
        setCountry(countrySummary)
        setHistory(historySummary)
      })
      .catch(() => {
        if (!cancelled) {
          setError(true)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [name])

  return { country, history, loading, error }
}
