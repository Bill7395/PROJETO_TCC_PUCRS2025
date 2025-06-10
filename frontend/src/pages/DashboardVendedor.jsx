import { useEffect, useState } from 'react';
import api from '../services/api';

export default function DashboardVendedor() {
  const [pedidos, setPedidos] = useState([]);
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    api.get('/pedidos')
      .then(res => setPedidos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Pedidos Recebidos</h1>
      {usuario?.tipo !== 'vendedor' ? (
        <p>Acesso restrito.</p>
      ) : pedidos.length > 0 ? (
        <ul>
          {pedidos.map(pedido => (
            <li key={pedido._id}>
              <strong>{pedido.clienteNome}</strong> - {pedido.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum pedido recebido.</p>
      )}
    </div>
  );
}
