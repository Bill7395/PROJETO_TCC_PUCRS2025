import { useEffect, useState } from 'react';
import api from '../services/api';

export default function DashboardCliente() {
  const [pedidos, setPedidos] = useState([]);
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    api.get(`/pedidos/${usuario?.id}`)
      .then(res => setPedidos(res.data))
      .catch(err => console.error(err));
  }, [usuario?.id]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Meus Pedidos</h1>
      {usuario?.tipo !== 'cliente' ? (
        <p>Acesso restrito.</p>
      ) : pedidos.length > 0 ? (
        <ul>
          {pedidos.map(pedido => (
            <li key={pedido._id}>
              <strong>{pedido.produtoNome}</strong> - {pedido.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>Você ainda não fez nenhum pedido.</p>
      )}
    </div>
  );
}
