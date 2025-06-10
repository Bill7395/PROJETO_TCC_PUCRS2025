const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido'); // Criar model Pedido, se ainda não existir
const { proteger } = require('../middleware/authMiddleware');

router.get('/', proteger, async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('cliente', 'nome');
    res.status(200).json(pedidos);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar pedidos', erro: err.message });
  }
});

module.exports = router;
