import React, { createContext, useState, useEffect } from 'react';

// Cria o contexto de autenticação
export const AuthContext = createContext();

// Provedor que envolve a aplicação para disponibilizar estado auth globalmente
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Ao carregar o app, verifica se existe token e usuario no localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('usuario');
    if (token && user) {
      setUsuario(JSON.parse(user));
    }
  }, []);

  // Função para login: salva token e usuário no localStorage e atualiza estado
  const login = (token, usuario) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    setUsuario(usuario);
  };

  // Função para logout: limpa localStorage e estado
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
