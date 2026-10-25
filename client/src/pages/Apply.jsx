
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import internships from "../data/internships";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://student-internship-portal-3rfi.onrender.com/api"
).replace(/\/+$/, "");

function Apply() {
  const { id } = useParams();
  const selected = internships.find((item) => item.id === id);

  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [internshipId, setInternshipId] = useState(id || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    const chosen = internships.find(
      (item) => item.id === internshipId
    );

    if (
      !studentName.trim() ||
      !email.trim() ||
      !rollNumber.trim() ||
      !chosen
    ) {
      setError("Please fill in all fields and select an internship.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: studentName.trim(),
          email: email.trim(),
          rollNumber: rollNumber.trim(),
          internshipId: chosen.id,
          internshipTitle: chosen.title,
        }),
      });

      const responseText = await response.text();
      let result = {};

      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch {
        throw new Error(
          `Backend returned an invalid response (HTTP ${response.status}). Check the backend API.`
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message || `Submission failed (HTTP ${response.status}).`
        );
      }

      setMessage(
        `Application submitted successfully! ID: ${
          result.application?._id || "received"
        }`
      );

      setStudentName("");
      setEmail("");
      setRollNumber("");
    } catch (err) {
      if (err.message === "Failed to fetch") {
        setError(
          "Cannot reach the backend. Check the backend URL and server."
        );
      } else {
        setError(err.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (!selected) {
    return (
      <section>
        <h2>Choose an internship</h2>
        <Link to="/">Browse internships</Link>
      </section>
    );
  }

  return (
    <section className="form-card">
      <h2>Apply for {selected.title}</h2>

      {message && (
        <p className="success-message" role="status">
          {message}
        </p>
      )}

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="studentName">Student Name</label>
        <input
          id="studentName"
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
          maxLength={100}
        />

        <label htmlFor="email">Email ID</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="rollNumber">Roll Number</label>
        <input
          id="rollNumber"
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
          maxLength={30}
        />

        <label htmlFor="internship">Selected Internship</label>
        <select
          id="internship"
          value={internshipId}
          onChange={(e) => setInternshipId(e.target.value)}
          required
        >
          <option value="">Select internship</option>
          {internships.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </section>
  );
}

export default Apply;
