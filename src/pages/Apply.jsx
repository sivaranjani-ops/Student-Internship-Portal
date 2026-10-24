
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Apply() {
  const [searchParams] = useSearchParams()
  const internshipId = searchParams.get('internshipId')

  const [form, setForm] = useState({
    name: '',
    email: '',
    rollNumber: ''
  })

  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      // Get the latest internship list from the backend
      const internshipResponse = await fetch(
        `${API_URL}/api/internships`
      )

      if (!internshipResponse.ok) {
        throw new Error('Unable to load internship details.')
      }

      const internships = await internshipResponse.json()
      const selected = internships.find(
        item => String(item.id) === String(internshipId)
      )

      if (!selected) {
        throw new Error('Please select a valid internship first.')
      }

      const response = await fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          internshipId: selected.id,
          internshipTitle: selected.title
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.message || result.error || 'Application submission failed.'
        )
      }

      setMessage('Application submitted successfully!')
      setForm({ name: '', email: '', rollNumber: '' })
    } catch (error) {
      setMessage(error.message || 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="container">
      <header>
        <h1>Apply for an Internship</h1>
        <p>Complete the form to submit your application.</p>
      </header>

      <p><Link to="/internships">Back to Internships</Link></p>

      {!internshipId && (
        <p role="alert">
          Please select an internship from the Internships page first.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Student Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          minLength={2}
          required
        />

        <label htmlFor="email">Email ID</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="rollNumber">Roll Number</label>
        <input
          id="rollNumber"
          name="rollNumber"
          value={form.rollNumber}
          onChange={handleChange}
          minLength={2}
          required
        />

        <button
          type="submit"
          disabled={submitting || !internshipId}
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>

      {message && <p role="status">{message}</p>}
    </main>
  )
}

export default Apply
