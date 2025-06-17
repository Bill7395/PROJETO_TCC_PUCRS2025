const express = require('express');
const { criarProduto } = require('../controllers/productController');
const { proteger } = require('../middleware/authMiddleware');
const { listarProdutos } = require('../controllers/productController')

const router = express.Router();

router.post('/', proteger, criarProduto); // Apenas usuários autenticados podem cadastrar produtos
router.get('/', listarProdutos); // Endpoint para listar produtos

module.exports = router;
