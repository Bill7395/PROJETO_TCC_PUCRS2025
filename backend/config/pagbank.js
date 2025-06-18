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

const criarPagamento = async (dados) => {
  const { produtos, total, cliente } = dados;

  const itensFormatados = produtos.map(item => ({
    name: item.produto.titulo,
    quantity: item.quantidade,
    unit_amount: Math.round(item.produto.preco * 100) // converte para centavos
  }));

  const pedido = {
    reference_id: `pedido-${Date.now()}`,
    customer: {
      name: cliente.nome,
      email: cliente.email,
      tax_id: cliente.cpf
    },
    items: itensFormatados,
    charges: [
      {
        reference_id: `charge-${Date.now()}`,
        amount: {
          value: Math.round(total * 100),
          currency: 'BRL'
        },
        payment_method: {
          type: 'CREDIT_CARD',
          installments: 1,
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

  const response = await axios.post(PAGBANK_API_URL, pedido, {
    headers: {
      Authorization: `Bearer ${process.env.PAGBANK_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data;
};

module.exports = { criarPagamento };
