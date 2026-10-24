
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Internships from './pages/Internships'
import Apply from './pages/Apply'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/internships">Internships</Link>
        <Link to="/apply">Apply</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/apply" element={<Apply />} />
        <Route
          path="*"
          element={
            <main className="container">
              <h1>404 - Page Not Found</h1>
              <Link to="/">Return Home</Link>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
