const express = require('express');
const { registrarUsuario, loginUsuario } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registrarUsuario); // Rota de registro
router.post('/login', loginUsuario); // Rota de login

module.exports = router;
