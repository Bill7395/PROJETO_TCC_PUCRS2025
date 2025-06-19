import { useState, useEffect } from 'react';
import { obterCarrinho, removerDoCarrinho, limparCarrinho } from '../services/cart';
import '../styles/Cart.css';
import api from '../services/api';
import PagamentoForm from '../components/PagamentoForm';
import '../components/PagamentoForm.css';
import './Modal.css';
import Comprovante from '../components/Comprovante';
import '../components/Comprovante.css';

export default function Cart() {
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [comprovante, setComprovante] = useState(null);

  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    cpf: '',
    tipoPagamento: 'CREDIT_CARD',
    parcelas: 1,
    cartao: {
      numero: '',
      mes: '',
      ano: '',
      cvv: ''
    }
  });

  useEffect(() => {
    setCarrinho(obterCarrinho());
  }, []);

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + item.produto.preco * item.quantidade, 0).toFixed(2);
  };

  const abrirModalPagamento = () => {
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
  };

  const handleSubmitPagamento = async () => {
    const camposObrigatorios = [
      cliente.nome,
      cliente.email,
      cliente.cpf,
      cliente.cartao.numero,
      cliente.cartao.mes,
      cliente.cartao.ano,
      cliente.cartao.cvv
    ];

    if (camposObrigatorios.some(campo => !campo)) {
      alert('Por favor, preencha todos os campos obrigatórios do pagamento.');
      return;
    }

    if (
      cliente.tipoPagamento === 'CREDIT_CARD' &&
      (!cliente.parcelas || cliente.parcelas < 1 || cliente.parcelas > 12)
    ) {
      alert('Escolha uma quantidade válida de parcelas (1 a 12).');
      return;
    }

    try {
      const pedido = {
        produtos: carrinho,
        total: calcularTotal(),
        cliente
      };

      const resposta = await api.post('/payment/checkout', pedido);
      limparCarrinho();
      setCarrinho([]);
      setComprovante(resposta.data.pagamento);
      setMostrarModal(false);
    } catch (err) {
      console.error("Erro ao finalizar pagamento:", err.response?.data || err.message);
      alert('Erro ao finalizar pagamento.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Carrinho de Compras</h2>

      {comprovante && (
        <Comprovante dados={comprovante} onFechar={() => setComprovante(null)} />
      )}

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
            <button className="checkout-btn" onClick={abrirModalPagamento}>Finalizar Compra</button>
          </div>
        </>
      )}

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="fechar-modal" onClick={fecharModal}>✕</button>
            <PagamentoForm cliente={cliente} setCliente={setCliente} />
            <button className="confirmar-btn" onClick={handleSubmitPagamento}>Confirmar Pagamento</button>
          </div>
        </div>
      )}
    </div>
  );
}
