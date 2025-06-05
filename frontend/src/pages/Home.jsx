import { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(res => setProdutos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Produtos</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {produtos.map(produto => (
          <ProductCard key={produto._id} produto={produto} />
        ))}
      </div>
    </div>
  );
}