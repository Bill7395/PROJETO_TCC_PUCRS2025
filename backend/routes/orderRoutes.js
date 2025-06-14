const express = require('express');
const { criarPedido, listarPedidosUsuario } = require('../controllers/orderController');
const { proteger } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', proteger, criarPedido);
router.get('/', proteger, listarPedidosUsuario);

module.exports = router;
