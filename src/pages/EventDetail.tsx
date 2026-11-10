import { useParams } from 'react-router-dom'

export function EventDetail() {
  const { id } = useParams()

  return (
    <section>
      <h1>Begivenhed: {id}</h1>
      <p>Tekst, billedgalleri, museumsgenstande og bøger.</p>
    </section>
  )
}
