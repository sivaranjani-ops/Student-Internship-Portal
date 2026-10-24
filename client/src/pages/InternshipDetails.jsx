import { Link, useParams } from "react-router-dom";
import internships from "../data/internships";

function InternshipDetails() {
  const { id } = useParams();
  const item = internships.find((internship) => internship.id === id);

  if (!item) {
    return <h2>Internship not found</h2>;
  }

  return (
    <section className="details-card">
      <h2>{item.title}</h2>
      <p>Company: {item.company}</p>
      <p>Location: {item.location}</p>
      <p>Duration: {item.duration}</p>
      <p>Stipend: {item.stipend}</p>
      <p>{item.description}</p>

      <h3>Required Skills</h3>
      <ul>
        {item.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <Link className="button-link" to={`/apply/${item.id}`}>
        Apply Now
      </Link>
    </section>
  );
}

export default InternshipDetails;