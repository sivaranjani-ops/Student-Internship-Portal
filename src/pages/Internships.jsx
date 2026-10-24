
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Internships() {
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchInternships() {
      try {
        const response = await fetch(`${API_URL}/api/internships`)

        if (!response.ok) {
          throw new Error('Unable to fetch internships.')
        }

        const data = await response.json()
        setInternships(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInternships()
  }, [])

  return (
    <main className="container">
      <header>
        <h1>Available Internships</h1>
        <p>Explore opportunities and choose your preferred internship.</p>
      </header>

      <p><Link to="/">Home</Link></p>

      {loading && <p>Loading internships...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && internships.length === 0 && (
        <p>No internships are currently available.</p>
      )}

      <section className="internship-list">
        {internships.map((internship) => (
          <article className="internship-card" key={internship.id}>
            <h2>{internship.title}</h2>
            <p>Company: {internship.company}</p>
            <p>Duration: {internship.duration}</p>
            <p>{internship.description}</p>

            <Link to={`/apply?internshipId=${internship.id}`}>
              <button type="button">Apply for this Internship</button>
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Internships
