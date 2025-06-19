import './PagamentoForm.css';

export default function PagamentoForm({ cliente, setCliente }) {
  const handleChange = (campo, valor) => {
    const novo = { ...cliente };
    if (campo.includes('cartao.')) {
      const subcampo = campo.split('.')[1];
      novo.cartao[subcampo] = valor;
    } else {
      novo[campo] = valor;
    }
    setCliente(novo);
  };

  return (
    <div className="form-pagamento">
      <h3>Dados do Cliente</h3>
      <input type="text" placeholder="Nome completo" value={cliente.nome} onChange={e => handleChange('nome', e.target.value)} />
      <input type="email" placeholder="E-mail" value={cliente.email} onChange={e => handleChange('email', e.target.value)} />
      <input type="text" placeholder="CPF (somente números)" value={cliente.cpf} onChange={e => handleChange('cpf', e.target.value)} />

      <h3>Pagamento</h3>
      <select value={cliente.tipoPagamento} onChange={e => handleChange('tipoPagamento', e.target.value)}>
        <option value="CREDIT_CARD">Cartão de Crédito</option>
        <option value="DEBIT_CARD">Cartão de Débito</option>
      </select>

      {cliente.tipoPagamento === 'CREDIT_CARD' && (
        <select value={cliente.parcelas} onChange={e => handleChange('parcelas', parseInt(e.target.value))}>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{`${i + 1}x`}</option>
          ))}
        </select>
      )}

      <h3>Dados do Cartão</h3>
      <input type="text" placeholder="Número do Cartão" value={cliente.cartao.numero} onChange={e => handleChange('cartao.numero', e.target.value)} />
      <div className="linha">
        <input type="text" placeholder="Mês" value={cliente.cartao.mes} onChange={e => handleChange('cartao.mes', e.target.value)} />
        <input type="text" placeholder="Ano" value={cliente.cartao.ano} onChange={e => handleChange('cartao.ano', e.target.value)} />
        <input type="text" placeholder="CVV" value={cliente.cartao.cvv} onChange={e => handleChange('cartao.cvv', e.target.value)} />
      </div>
    </div>
  );
}
