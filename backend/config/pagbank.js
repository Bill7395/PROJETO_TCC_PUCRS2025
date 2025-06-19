require('dotenv').config();
const axios = require('axios');

/*const PAGBANK_API_URL = 'https://sandbox.api.pagseguro.com/checkout/v2/transactions'; // URL correta
const PAGBANK_EMAIL = process.env.PAGBANK_EMAIL;
const PAGBANK_TOKEN = process.env.PAGBANK_TOKEN;

const criarPagamento = async (pedido) => {
  try {
    const resposta = await axios.post(PAGBANK_API_URL, pedido, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PAGBANK_TOKEN}` // Certifique-se que está correto
      }
    });
    return resposta.data;
  } catch (error) {
    console.error('Erro ao processar pagamento:', error.response?.data || error.message);
    throw new Error('Pagamento não autorizado.');
  }
};

console.log('Credenciais carregadas:', process.env.PAGBANK_EMAIL, process.env.PAGBANK_TOKEN);

module.exports = { criarPagamento }; */

const PAGBANK_API_URL = 'https://sandbox.api.pagseguro.com/orders';

const criarPagamento = async ({ produtos, total, cliente }) => {
  const itens = produtos.map(item => ({
    name: item.produto.titulo,
    quantity: item.quantidade,
    unit_amount: Math.round(item.produto.preco * 100)
  }));

  const body = {
    reference_id: `pedido-${Date.now()}`,
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

const resposta = await axios.post('https://sandbox.api.pagseguro.com/orders', body, {
  headers: {
    Authorization: `Bearer ${process.env.PAGBANK_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

  return resposta.data;
};


module.exports = { criarPagamento };
