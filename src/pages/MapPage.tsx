import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Globe, { type GlobeMethods } from 'react-globe.gl'
import { useCountryHistory } from '../hooks/useCountryHistory'

const GlobeWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const InfoPanel = styled.div`
  margin: ${({ theme }) => theme.spacing(6)} auto 0;
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  max-width: 70ch;

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.6;
  }
`

const ReadMoreLink = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing(3)};
  font-weight: 600;
`

const Hint = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Coords = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

interface MarkerPoint {
  lat: number
  lng: number
}

function useViewportSize() {
  const [size, setSize] = useState({ width: 800, height: 520 })

  useEffect(() => {
    function updateSize() {
      const width = Math.min(900, window.innerWidth - 64)
      setSize({ width, height: Math.round(width * 0.62) })
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}

export function MapPage() {
  const { width, height } = useViewportSize()
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const [marker, setMarker] = useState<MarkerPoint | null>(null)
  const { country, summary, loading, error } = useCountryHistory(marker)

  return (
    <section>
      <h1>Kort</h1>
      <p>Rotér jordkloden, og klik et sted for at se historien bag landet.</p>
      <Hint>
        Tip: rotér, så stedet vender direkte mod dig og ligger midt i billedet, før du klikker -
        klik nær kanten af kuglen er mindre præcist.
      </Hint>

      <GlobeWrapper>
        <Globe
          ref={globeRef}
          width={width}
          height={height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          pointsData={marker ? [marker] : []}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => '#c0392b'}
          pointAltitude={0.02}
          pointRadius={0.6}
          onGlobeReady={() => globeRef.current?.pointOfView({ altitude: 2 }, 0)}
          onGlobeClick={({ lat, lng }) => setMarker({ lat, lng })}
        />
      </GlobeWrapper>

      {marker && (
        <InfoPanel>
          {loading && <p>Henter historie...</p>}
          {error && <p>Kunne ikke finde historiske data for dette sted.</p>}
          {!loading && !error && country && (
            <>
              <h2>{country}</h2>
              <Coords>
                Klikket punkt: {marker.lat.toFixed(2)}, {marker.lng.toFixed(2)}
              </Coords>
              <p>{summary}</p>
              <ReadMoreLink to={`/land/${encodeURIComponent(country)}`}>Læs mere →</ReadMoreLink>
            </>
          )}
        </InfoPanel>
      )}
    </section>
  )
}
