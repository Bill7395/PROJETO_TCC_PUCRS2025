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