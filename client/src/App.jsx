import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import InternshipList from "./pages/InternshipList.jsx";
import InternshipDetails from "./pages/InternshipDetails.jsx";
import Apply from "./pages/Apply.jsx";
import "./App.css";
export default function App(){return <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/,"")}><div className="app-shell"><header className="site-header"><Link className="brand" to="/">Student Internship Portal</Link><nav className="site-nav" aria-label="Main navigation"><Link to="/">Home</Link><Link className="nav-apply" to="/apply">Apply</Link></nav></header><main className="page-content"><Routes><Route path="/" element={<InternshipList/>}/><Route path="/internships/:id" element={<InternshipDetails/>}/><Route path="/apply" element={<Apply/>}/><Route path="/apply/:id" element={<Apply/>}/></Routes></main><footer className="site-footer"><span>Student Internship Portal</span><span>Find your next opportunity.</span></footer></div></BrowserRouter>}
