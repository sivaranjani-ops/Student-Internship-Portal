import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import InternshipList from "./pages/InternshipList";
import InternshipDetails from "./pages/InternshipDetails";
import Apply from "./pages/Apply";
import Applications from "./pages/Application";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <header className="site-header">
        <Link className="brand" to="/">Student Internship Portal</Link>
        <nav>
          <Link to="/">Internships</Link>
          <Link to="/applications">Applications</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<InternshipList />} />
          <Route path="/internships/:id" element={<InternshipDetails />} />
          <Route path="/apply/:id" element={<Apply />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </main>

      <footer className="site-footer">
        © 2026 Student Internship Portal
      </footer>
    </BrowserRouter>
  );
}

export default App;
