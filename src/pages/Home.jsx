
import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="container">
      <header>
        <h1>Student Internship Portal</h1>
        <p>
          Discover internship opportunities and start building
          your professional skills.
        </p>
      </header>

      <section className="details">
        <h2>Welcome, Student!</h2>
        <p>
          Explore available internships, view their details,
          and submit your application through this portal.
        </p>

        <nav>
          <Link to="/internships">
            <button type="button">Explore Internships</button>
          </Link>

          {' '}

          <Link to="/apply">
            <button type="button">Apply Now</button>
          </Link>
        </nav>
      </section>
    </main>
  )
}

export default Home
