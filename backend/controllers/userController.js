const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registrarUsuario = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  try {
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) return res.status(400).json({ mensagem: 'Usuário já existe' });

    const novoUsuario = await User.create({ nome, email, senha, tipo });

    const token = jwt.sign({ id: novoUsuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, usuario: { id: novoUsuario._id, nome, email, tipo } });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao registrar', erro: err.message });
  }
};

exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ mensagem: 'Senha incorreta' });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, usuario: { id: usuario._id, nome: usuario.nome, email, tipo: usuario.tipo } });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao fazer login', erro: err.message });
  }
};
