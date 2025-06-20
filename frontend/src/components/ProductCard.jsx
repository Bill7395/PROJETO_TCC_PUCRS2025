import { useState } from 'react';
import { criarPedido } from '../services/orderApi';
import { adicionarAoCarrinho } from '../services/cart';
import '../styles/ProductCard.css'; // Importando o novo CSS

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
    adicionarAoCarrinho(produto); // Utilizando a função do serviço corretamente
    alert('Produto adicionado ao carrinho!');
  };

  return (
    <div className="product-card">
      <img src={produto.imagem || 'https://via.placeholder.com/200'} alt={produto.titulo} />
      <h3>{produto.titulo}</h3>
      <p>{produto.descricao}</p>
      <strong>R$ {produto.preco.toFixed(2)}</strong>

      <div className="button-container"> {/* Contêiner para centralizar botões */}
        <button onClick={handleComprar}>Comprar</button>
        <button onClick={handleAdicionarCarrinho}>Adicionar ao Carrinho</button>
      </div>
    </div>
  );
}
