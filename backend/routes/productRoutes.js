const express = require('express');
const router = express.Router();
const { criarProduto, listarProdutos } = require('../controllers/productController');
const { proteger } = require('../middleware/authMiddleware');

router.post('/', proteger, criarProduto);
router.get('/', listarProdutos);

module.exports = router;