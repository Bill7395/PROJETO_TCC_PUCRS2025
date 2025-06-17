import { useState } from 'react';
import api from '../services/api';

export default function PublishProduct() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagem, setImagem] = useState('');
  const [estoque, setEstoque] = useState('');
  const [mensagem, setMensagem] = useState('');

const handleUpload = async (event) => {
  const formData = new FormData();
  formData.append('imagem', event.target.files[0]);

  try {
    const res = await api.post('/products/upload', formData);
    setImagem(res.data.imagem); // URL da imagem no Cloudinary
  } catch (err) {
    setMensagem('Erro ao enviar imagem.');
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      <form onSubmit={handleSubmit}>
        <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} required />
        <input placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
        <input type="file" onChange={handleUpload} required /> {/* Upload de imagem */}
        <input type="number" placeholder="Estoque" value={estoque} onChange={(e) => setEstoque(e.target.value)} required />
        <button type="submit">Publicar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
