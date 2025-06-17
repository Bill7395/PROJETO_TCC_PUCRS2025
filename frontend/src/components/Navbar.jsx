import { Link } from 'react-router-dom';
import { getUser, logout } from '../services/auth';
import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [usuario, setUsuario] = useState(getUser());

  useEffect(() => {
    const atualizarUsuario = () => {
      setUsuario(getUser());
    };
    window.addEventListener('storage', atualizarUsuario);
    return () => window.removeEventListener('storage', atualizarUsuario);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Marketplace TCC</Link>
      </div>
      <div className="nav-links">
        {!usuario ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrar</Link>
          </>
        ) : usuario.tipo === 'vendedor' ? (
          <>
            <Link to="/orders">Pedidos Recebidos</Link>
            <Link to="/publish">Publicar Produto</Link>
            <Link to="/cart">Carrinho</Link>
            <button onClick={() => { logout(); setUsuario(null); }}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/orders">Meus Pedidos</Link>
            <Link to="/cart">Carrinho</Link>
            <button onClick={() => { logout(); setUsuario(null); }}>Sair</button>
          </>
        )}
      </div>
    </nav>
  );
}
