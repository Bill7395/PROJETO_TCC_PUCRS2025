export const getUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  return usuario;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = '/login';
};
