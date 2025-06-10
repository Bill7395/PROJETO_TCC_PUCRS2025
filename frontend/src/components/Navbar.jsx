import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));
    setUsuario(usuarioSalvo);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Marketplace</Link>
      </div>
      <div className="nav-links">
        {!usuario ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrar</Link>
          </>
        ) : usuario.tipo === 'vendedor' ? (
          <>
            <Link to="/pedidos">Pedidos Recebidos</Link>
            <Link to="/carrinho">Carrinho</Link>
            <button onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/meus-pedidos">Meus Pedidos</Link>
            <Link to="/carrinho">Carrinho</Link>
            <button onClick={handleLogout}>Sair</button>
          </>
        )}
      </div>
    </nav>
  );
}
