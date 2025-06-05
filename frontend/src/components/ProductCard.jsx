export default function ProductCard({ produto }) {
  return (
    <div className="product-card">
      <img src={produto.imagem || 'https://via.placeholder.com/150'} alt={produto.titulo} />
      <h3>{produto.titulo}</h3>
      <p>{produto.descricao}</p>
      <strong>R$ {produto.preco.toFixed(2)}</strong>
    </div>
  );
}