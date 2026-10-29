import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import InternshipList from './pages/InternshipList.jsx';
import InternshipDetails from './pages/InternshipDetails.jsx';
import Apply from './pages/Apply.jsx';
import './App.css';

export default function App() {
  return <BrowserRouter><div className="app-shell"><header className="site-header"><Link className="brand" to="/">Student Internship Portal</Link><nav className="site-nav"><Link to="/">Home</Link><Link className="nav-apply" to="/apply">Apply</Link></nav></header><main className="page-content"><Routes><Route path="/" element={<InternshipList />} /><Route path="/internships/:id" element={<InternshipDetails />} /><Route path="/apply" element={<Apply />} /><Route path="/apply/:id" element={<Apply />} /></Routes></main><footer className="site-footer">Student Internship Portal · Find your next opportunity.</footer></div></BrowserRouter>;
}
