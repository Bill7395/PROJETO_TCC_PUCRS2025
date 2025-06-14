import { useState } from 'react';
import { criarPedido } from '../services/orderApi';

export default function ProductCard({ produto }) {
  const [mensagem, setMensagem] = useState('');

  const handleComprar = async () => {
    try {
      await criarPedido([{ produto: produto._id, quantidade: 1 }]);
      setMensagem('Compra realizada com sucesso!');
    } catch (err) {
      setMensagem('Erro ao realizar a compra.');
    }
  };

  const handleAdicionarCarrinho = () => {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push({ produto: produto._id, titulo: produto.titulo, quantidade: 1 });
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert('Produto adicionado ao carrinho!');
};

<button onClick={handleAdicionarCarrinho}>Adicionar ao Carrinho</button>

  return (
    <div className="product-card">
      <img src={produto.imagem || 'https://via.placeholder.com/150'} alt={produto.titulo} />
      <h3>{produto.titulo}</h3>
      <p>{produto.descricao}</p>
      <strong>R$ {produto.preco.toFixed(2)}</strong>
      <button onClick={handleComprar}>Comprar</button>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

