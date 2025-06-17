import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Função para registar usuarios
export const registrarUsuario = async (dados) => {
  return await api.post('/users/register', dados);
};

//função para buscar os produtos
export const listarProdutos = async () => {
  return await api.get('/products');
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
