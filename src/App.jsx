import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { BookOpen, Users, GraduationCap } from 'lucide-react';
import Cursos from './pages/Cursos';
import Docentes from './pages/Docentes';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <GraduationCap size={28} />
            <span>CesdeAdmin</span>
          </div>
          
          <nav className="nav-links">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <BookOpen size={20} />
              <span>Cursos</span>
            </NavLink>
            <NavLink 
              to="/docentes" 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Users size={20} />
              <span>Docentes</span>
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Cursos />} />
            <Route path="/docentes" element={<Docentes />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
