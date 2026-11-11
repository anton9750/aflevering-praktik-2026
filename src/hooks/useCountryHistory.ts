import { useEffect, useState } from 'react'
import { reverseGeocodeCountry } from '../services/geocoding'
import { fetchWikiSummary } from '../services/wikipedia'

interface CountryHistoryPoint {
  lat: number
  lng: number
}

interface UseCountryHistoryResult {
  country: string | null
  summary: string | null
  loading: boolean
  error: boolean
}

export function useCountryHistory(point: CountryHistoryPoint | null): UseCountryHistoryResult {
  const [country, setCountry] = useState<string | null>(null)
  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!point) {
      setCountry(null)
      setSummary(null)
      setError(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(false)
    setCountry(null)
    setSummary(null)

    reverseGeocodeCountry(point.lat, point.lng)
      .then((countryName) => {
        if (cancelled) return null
        if (!countryName) {
          throw new Error('Intet land fundet for dette punkt')
        }
        setCountry(countryName)
        return fetchWikiSummary(`History of ${countryName}`, 'en').catch(() =>
          fetchWikiSummary(countryName, 'en'),
        )
      })
      .then((wikiSummary) => {
        if (!cancelled && wikiSummary) {
          setSummary(wikiSummary.extract)
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
  }, [point?.lat, point?.lng])

  return { country, summary, loading, error }
}
