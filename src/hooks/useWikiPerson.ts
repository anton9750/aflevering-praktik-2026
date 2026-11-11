import { useEffect, useState } from 'react'
import { fetchWikiSummary, type WikiSummary } from '../services/wikipedia'

interface UseWikiPersonResult {
  person: WikiSummary | null
  loading: boolean
  error: boolean
}

export function useWikiPerson(title: string): UseWikiPersonResult {
  const [person, setPerson] = useState<WikiSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!title) {
      return
    }

    let cancelled = false
    setLoading(true)
    setError(false)

    fetchWikiSummary(title)
      .then((summary) => {
        if (!cancelled) {
          setPerson(summary)
        }
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
  }, [title])

  return { person, loading, error }
}
