const express = require('express');
const { proteger } = require('../middleware/authMiddleware');
const { criarPagamento } = require('../config/pagbank');

const router = express.Router();

router.post('/checkout', proteger, async (req, res) => {
  try {
    const dados = req.body;

    const pagamento = await criarPagamento(dados); // Envia os dados do carrinho
    res.status(200).json({ pagamento });
  } catch (err) {
    console.error('Erro ao processar pagamento:', err.message);
    res.status(500).json({ mensagem: 'Erro ao processar pagamento', erro: err.message });
  }
});

module.exports = router;
