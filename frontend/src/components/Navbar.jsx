import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Marketplace</Link>
      </div>
      <div className="nav-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Registrar</Link>
      </div>
    </nav>
  );
}