import { useState, useEffect } from 'react';
import { criarPedido } from '../services/orderApi';

export default function Cart() {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const itens = JSON.parse(localStorage.getItem('carrinho')) || [];
    setCarrinho(itens);
  }, []);

  const handleComprar = async () => {
    try {
      await criarPedido(carrinho);
      localStorage.removeItem('carrinho');
      setCarrinho([]);
      alert('Pedido realizado com sucesso!');
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
            {carrinho.map((item, index) => (
              <li key={index}>{item.titulo} - {item.quantidade}x</li>
            ))}
          </ul>
          <button onClick={handleComprar}>Finalizar Compra</button>
        </>
      )}
    </div>
  );
}
