import './Comprovante.css';

export default function Comprovante({ dados, onFechar }) {
  if (!dados) return null;

  const { id, reference_id, status, amount } = dados;

  return (
    <div className="comprovante-container">
      <h2>✅ Pagamento Aprovado</h2>
      <p><strong>ID da Transação:</strong> {id}</p>
      <p><strong>Referência:</strong> {reference_id}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Valor:</strong> R$ {(amount?.value / 100).toFixed(2)}</p>
      <button onClick={onFechar}>Fechar Comprovante</button>
    </div>
  );
}
