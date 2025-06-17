import { useState, useEffect } from 'react';
import { obterCarrinho, removerDoCarrinho, limparCarrinho } from '../services/cart';
import { criarPedido } from '../services/orderApi';

export default function Cart() {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    setCarrinho(obterCarrinho());
  }, []);

  const handleFinalizarCompra = async () => {
    try {
      await criarPedido(carrinho);
      limparCarrinho();
      setCarrinho([]);
      alert('Pedido finalizado com sucesso!');
    } catch (err) {
      alert('Erro ao processar compra.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Carrinho de Compras</h2>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul>
            {carrinho.map(item => (
              <li key={item.produto._id}>
                {item.produto.titulo} - {item.quantidade}x
                <button onClick={() => removerDoCarrinho(item.produto._id)}>Remover</button>
              </li>
            ))}
          </ul>
          <button onClick={handleFinalizarCompra}>Finalizar Compra</button>
        </>
      )}
    </div>
  );
}
