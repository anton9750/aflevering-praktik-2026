import { useEffect, useState } from 'react'
import { fetchWikiSummary } from '../services/wikipedia'

export function useWikiThumbnail(title: string | null) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(Boolean(title))

  useEffect(() => {
    if (!title) {
      setThumbnailUrl(undefined)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    fetchWikiSummary(title, 'en')
      .then((summary) => {
        if (!cancelled) {
          setThumbnailUrl(summary.thumbnailUrl)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setThumbnailUrl(undefined)
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

  return { thumbnailUrl, loading }
}
