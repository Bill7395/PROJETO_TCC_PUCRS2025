import api from './api';

export const criarPedido = async (produtos) => {
  return await api.post('/orders', { produtos });
};

export const listarPedidos = async () => {
  return await api.get('/orders');
};
