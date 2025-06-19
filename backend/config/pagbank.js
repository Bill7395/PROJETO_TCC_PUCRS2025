require('dotenv').config();
const axios = require('axios');

const PAGBANK_API_URL = 'https://sandbox.api.pagseguro.com/orders';

const criarPagamento = async ({ produtos, total, cliente, reference_id }) => {
  const itens = produtos.map(item => ({
    name: item.produto.titulo,
    quantity: item.quantidade,
    unit_amount: Math.round(item.produto.preco * 100)
  }));

  const body = {
    reference_id,
    customer: {
      name: cliente.nome,
      email: cliente.email,
      tax_id: cliente.cpf
    },
    items: itens,
    charges: [
      {
        reference_id: `charge-${Date.now()}`,
        description: 'Compra realizada via marketplace',
        amount: {
          value: Math.round(total * 100),
          currency: 'BRL'
        },
        payment_method: {
          type: cliente.tipoPagamento,
          installments: cliente.tipoPagamento === 'CREDIT_CARD' ? cliente.parcelas : 1,
          capture: true,
          card: {
            number: cliente.cartao.numero,
            exp_month: cliente.cartao.mes,
            exp_year: cliente.cartao.ano,
            security_code: cliente.cartao.cvv,
            holder: {
              name: cliente.nome
            }
          }
        }
      }
    ]
  };

  try {
    const resposta = await axios.post(PAGBANK_API_URL, body, {
      headers: {
        Authorization: `Bearer ${process.env.PAGBANK_TOKEN}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    return resposta.data;
  } catch (error) {
    console.error('[Erro ao comunicar com PagBank]', error.response?.data || error.message);
    throw new Error('Não foi possível concluir o pagamento.');
  }
};

module.exports = { criarPagamento };
