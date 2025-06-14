import { useState } from 'react';
import api from '../services/api';
import { getUser } from '../services/auth';

export default function PublishProduct() {
  const usuario = getUser();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagem, setImagem] = useState('');
  const [estoque, setEstoque] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      setMensagem('Você precisa estar logado para publicar um produto.');
      return;
    }

    try {
      await api.post('/products', { titulo, descricao, preco, categoria, imagem, estoque });
      setMensagem('Produto publicado com sucesso!');
    } catch (err) {
      setMensagem('Erro ao publicar produto.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Publicar Produto</h2>
      {!usuario ? <p>Faça login para publicar produtos.</p> : (
        <form onSubmit={handleSubmit}>
          <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
          <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
          <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} required />
          <input placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
          <input placeholder="URL da Imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} />
          <input type="number" placeholder="Estoque" value={estoque} onChange={(e) => setEstoque(e.target.value)} required />
          <button type="submit">Publicar</button>
        </form>
      )}
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
