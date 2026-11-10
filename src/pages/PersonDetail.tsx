import { useParams } from 'react-router-dom'

export function PersonDetail() {
  const { id } = useParams()

  return (
    <section>
      <h1>Person: {id}</h1>
      <p>Tekst, billedgalleri, museumsgenstande og bøger.</p>
    </section>
  )
}
