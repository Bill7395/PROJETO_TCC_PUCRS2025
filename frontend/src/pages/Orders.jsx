import { useEffect, useState } from 'react';
import { listarPedidos } from '../services/orderApi';

export default function Orders() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    listarPedidos()
      .then(res => setPedidos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Meus Pedidos</h2>
      {pedidos.length === 0 ? <p>Nenhum pedido encontrado.</p> : (
        pedidos.map(pedido => (
          <div key={pedido._id} style={{ border: '1px solid #ddd', padding: '1rem', marginBottom: '1rem' }}>
            <p><strong>Status:</strong> {pedido.status}</p>
            <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>
            <ul>
              {pedido.produtos.map(item => (
                <li key={item.produto._id}>{item.produto.titulo} - {item.quantidade}x</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
