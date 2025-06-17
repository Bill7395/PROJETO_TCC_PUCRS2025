import { useEffect, useState } from 'react';
import { listarProdutos } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    listarProdutos()
      .then(res => setProdutos(res.data))
      .catch(err => console.error('Erro ao buscar produtos:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Produtos Disponíveis</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {produtos.length > 0 ? (
          produtos.map(produto => (
            <ProductCard key={produto._id} produto={produto} />
          ))
        ) : (
          <p>Nenhum produto disponível no momento.</p>
        )}
      </div>
    </div>
  );
}
