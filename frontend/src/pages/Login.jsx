import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', { email, senha });
      
      // Armazena usuário e token no localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('usuario', JSON.stringify(res.data.usuario));

      alert('Login realizado!');

      // Redireciona com base no tipo de usuário
      if (res.data.usuario.tipo === 'vendedor') {
        navigate('/pedidos');
      } else {
        navigate('/meus-pedidos');
      }
    } catch (err) {
      alert('Erro ao fazer login');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <input 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        placeholder="Senha" 
        type="password" 
        value={senha} 
        onChange={(e) => setSenha(e.target.value)} 
      />
      <button style={{ backgroundColor: '#FF3877', color: 'white' }}>
        Entrar
      </button>
    </form>
  );
}
