// === FRONTEND ===
// Estrutura base do frontend com React (Vite ou Create React App)
// Estrutura de pastas:
// frontend/
// ├── src/
// │   ├── components/
// │   │   ├── Navbar.jsx
// │   │   └── ProductCard.jsx
// │   ├── pages/
// │   │   ├── Home.jsx
// │   │   ├── Login.jsx
// │   │   └── Register.jsx
// │   ├── App.jsx
// │   ├── main.jsx
// │   └── services/api.js
// ├── package.json

// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default api;

// frontend/src/components/Navbar.jsx
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

// frontend/src/components/Navbar.css
.navbar {
  background-color: #13293D;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
.nav-links a {
  color: white;
  margin-left: 1rem;
  text-decoration: none;
}
.logo a {
  color: white;
  font-weight: bold;
  text-decoration: none;
}

// frontend/src/components/ProductCard.jsx
export default function ProductCard({ produto }) {
  return (
    <div className="product-card">
      <img src={produto.imagem || 'https://via.placeholder.com/150'} alt={produto.titulo} />
      <h3>{produto.titulo}</h3>
      <p>{produto.descricao}</p>
      <strong>R$ {produto.preco.toFixed(2)}</strong>
    </div>
  );
}

// frontend/src/pages/Home.jsx
import { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(res => setProdutos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Produtos</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {produtos.map(produto => (
          <ProductCard key={produto._id} produto={produto} />
        ))}
      </div>
    </div>
  );
}

// frontend/src/pages/Login.jsx
import { useState } from 'react';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', { email, senha });
      localStorage.setItem('token', res.data.token);
      alert('Login realizado!');
    } catch (err) {
      alert('Erro ao fazer login');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
      <button style={{ backgroundColor: '#FF3877', color: 'white' }}>Entrar</button>
    </form>
  );
}

// frontend/src/pages/Register.jsx
import { useState } from 'react';
import api from '../services/api';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('cliente');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/register', { nome, email, senha, tipo });
      localStorage.setItem('token', res.data.token);
      alert('Registrado com sucesso!');
    } catch (err) {
      alert('Erro ao registrar');
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ padding: '2rem' }}>
      <h2>Registrar</h2>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
      <select value={tipo} onChange={e => setTipo(e.target.value)}>
        <option value="cliente">Cliente</option>
        <option value="vendedor">Vendedor</option>
      </select>
      <button style={{ backgroundColor: '#FF3877', color: 'white' }}>Registrar</button>
    </form>
  );
}

// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// frontend/src/index.css
body {
  margin: 0;
  font-family: sans-serif;
  background-color: white;
}
input, select, button {
  display: block;
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 100%;
  max-width: 400px;
}
