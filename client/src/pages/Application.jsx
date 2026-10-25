import { useEffect, useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL || "https://student-internship-portal-3rfi.onrender.com/api"
).replace(/\/+$/, "");

function Applications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApplications() {
      try {
        const response = await fetch(`${API_URL}/applications`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load applications.");
        }

        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <section>
      <h2>Submitted Applications</h2>

      {applications.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <div className="internship-grid">
          {applications.map((item) => (
            <article className="internship-card" key={item._id}>
              <h3>{item.studentName}</h3>
              <p>Email: {item.email}</p>
              <p>Roll Number: {item.rollNumber}</p>
              <p>Internship: {item.internshipTitle}</p>
              <p>Application ID: {item._id}</p>
              <p>
                Submitted: {new Date(item.createdAt).toLocaleString()}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Applications;