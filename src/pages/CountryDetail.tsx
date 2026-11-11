import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWikiCountry } from '../hooks/useWikiCountry'

const PortraitImage = styled.img`
  display: block;
  max-width: 400px;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing(6)} 0;
`

const Extract = styled.p`
  max-width: 70ch;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`

export function CountryDetail() {
  const { id } = useParams()
  const name = id ?? ''
  const { country, history, loading, error } = useWikiCountry(name)

  if (loading) {
    return (
      <section>
        <p>Indlæser...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h1>{name}</h1>
        <p>Kunne ikke hente information fra Wikipedia lige nu.</p>
      </section>
    )
  }

  return (
    <section>
      <h1>{country?.displayTitle ?? name}</h1>

      {country?.thumbnailUrl && (
        <PortraitImage src={country.thumbnailUrl} alt={country.displayTitle} />
      )}

      <h2>Historie</h2>
      <Extract>{history?.extract || country?.extract || 'Ingen beskrivelse fundet.'}</Extract>
    </section>
  )
}
