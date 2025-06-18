import { useState, useEffect } from 'react';
import { obterCarrinho, removerDoCarrinho, limparCarrinho } from '../services/cart';
import { criarPedido } from '../services/orderApi';
import '../styles/Cart.css';
import api from '../services/api';


export default function Cart() {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    setCarrinho(obterCarrinho());
  }, []);

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.produto.preco * item.quantidade, 0).toFixed(2);
  };

  const handleFinalizarCompra = async () => {
    try {
      const pedido = { produtos: carrinho, total: calcularTotal() };
      //const resposta = await api.post('/api/payment/checkout', pedido);
      const resposta = await api.post('/payment/checkout', pedido);
      
      alert(`Pagamento processado com sucesso! Código: ${resposta.data.pagamento.id}`);
      limparCarrinho();
      setCarrinho([]); // Garante que a tela do carrinho seja atualizada
    } catch (err) {
      console.error("Erro ao finalizar pagamento:", err);
      alert('Erro ao finalizar pagamento.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Carrinho de Compras</h2>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="cart-list">
            {carrinho.map(item => (
              <li key={item.produto._id} className="cart-item">
                <img 
                  className="cart-img"
                  src={item.produto.imagem || 'https://via.placeholder.com/100'}
                  alt={item.produto.titulo}
                />
                <div className="cart-info">
                  <p>{item.produto.titulo} - {item.quantidade}x</p>
                  <p className="cart-price">R$ {item.produto.preco.toFixed(2)}</p>
                  <button className="remove-btn" onClick={() => removerDoCarrinho(item.produto._id)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-footer">
            <p className="total-price">Total: R$ {calcularTotal()}</p>
            <button className="checkout-btn" onClick={handleFinalizarCompra}>Finalizar Compra</button>
          </div>
        </>
      )}
    </div>
  );
}
