import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWikiPerson } from '../hooks/useWikiPerson'

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

export function PersonDetail() {
  const { id } = useParams()
  const title = id ?? ''
  const { person, loading, error } = useWikiPerson(title)

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
        <h1>{title}</h1>
        <p>Kunne ikke hente information fra Wikipedia lige nu.</p>
      </section>
    )
  }

  return (
    <section>
      <h1>{person?.displayTitle ?? title}</h1>

      {person?.thumbnailUrl && (
        <PortraitImage src={person.thumbnailUrl} alt={person.displayTitle} />
      )}

      <Extract>{person?.extract || 'Ingen beskrivelse fundet.'}</Extract>
    </section>
  )
}
