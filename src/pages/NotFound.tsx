import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <section>
      <h1>Siden findes ikke</h1>
      <p>
        Gå tilbage til <Link to="/">forsiden</Link>.
      </p>
    </section>
  )
}
