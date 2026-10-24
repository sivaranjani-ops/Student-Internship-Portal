import { Link } from "react-router-dom";
import internships from "../data/internships";

function InternshipList() {
  return (
    <section>
      <h2>Available Internships</h2>
      <div className="internship-grid">
        {internships.map((item) => (
          <article className="internship-card" key={item.id}>
            <h3>{item.title}</h3>
            <p>Company: {item.company}</p>
            <p>Location: {item.location}</p>
            <p>Duration: {item.duration}</p>
            <p>Stipend: {item.stipend}</p>
            <Link className="button-link" to={`/internships/${item.id}`}>
              View Details
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export default InternshipList;