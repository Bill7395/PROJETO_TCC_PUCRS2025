// === BACKEND ===
// Estrutura do backend com Node.js + Express + MongoDB
// Estrutura de pastas:
// backend/
// ├── controllers/
// │   ├── userController.js
// │   └── productController.js
// ├── models/
// │   ├── User.js
// │   └── Product.js
// ├── routes/
// │   ├── userRoutes.js
// │   └── productRoutes.js
// ├── middleware/
// │   └── authMiddleware.js
// ├── .env
// ├── server.js
// └── config/
//     └── db.js

// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ['cliente', 'vendedor'], required: true }
});

module.exports = mongoose.model('User', userSchema);

// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  categoria: { type: String, required: true },
  imagem: { type: String },
  estoque: { type: Number, required: true },
  vendedor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);

// backend/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registrarUsuario = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  try {
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) return res.status(400).json({ mensagem: 'Usuário já existe' });

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await User.create({ nome, email, senha: senhaHash, tipo });

    const token = jwt.sign({ id: novoUsuario._id }, process.env.JWT_SECRET);
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

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, usuario: { id: usuario._id, nome: usuario.nome, email, tipo: usuario.tipo } });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao fazer login', erro: err.message });
  }
};

// backend/controllers/productController.js
const Product = require('../models/Product');

exports.criarProduto = async (req, res) => {
  const { titulo, descricao, preco, categoria, imagem, estoque } = req.body;
  const vendedorId = req.user.id;
  try {
    const novoProduto = new Product({
      titulo,
      descricao,
      preco,
      categoria,
      imagem,
      estoque,
      vendedor: vendedorId
    });
    const produtoSalvo = await novoProduto.save();
    res.status(201).json(produtoSalvo);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao criar produto', erro: err.message });
  }
};

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Product.find().populate('vendedor', 'nome');
    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar produtos', erro: err.message });
  }
};

// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/userController');

router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

module.exports = router;

// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { criarProduto, listarProdutos } = require('../controllers/productController');
const { proteger } = require('../middleware/authMiddleware');

router.post('/', proteger, criarProduto);
router.get('/', listarProdutos);

module.exports = router;

// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.proteger = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-senha');
    next();
  } catch (err) {
    res.status(401).json({ mensagem: 'Token inválido' });
  }
};

// backend/.env (exemplo - criar no root do backend)
// MONGO_URI=mongodb://localhost:27017/marketplace
// JWT_SECRET=sua_chave_secreta


// implementação porterior

// backend/models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  comprador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  produtos: [
    {
      produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantidade: { type: Number, required: true },
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pendente', 'concluído', 'cancelado'], default: 'pendente' },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

// backend/controllers/orderController.js

const Order = require('../models/Order');
const Product = require('../models/Product');

exports.criarPedido = async (req, res) => {
  const { produtos } = req.body;
  const compradorId = req.user.id;

  try {
    let total = 0;
    for (const item of produtos) {
      const produto = await Product.findById(item.produto);
      if (!produto || produto.estoque < item.quantidade) {
        return res.status(400).json({ mensagem: 'Produto indisponível' });
      }
      total += produto.preco * item.quantidade;
      produto.estoque -= item.quantidade;
      await produto.save();
    }

    const pedido = await Order.create({ comprador: compradorId, produtos, total });
    res.status(201).json(pedido);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao criar pedido', erro: err.message });
  }
};

exports.listarPedidosUsuario = async (req, res) => {
  try {
    const pedidos = await Order.find({ comprador: req.user.id }).populate('produtos.produto', 'titulo preco');
    res.status(200).json(pedidos);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar pedidos', erro: err.message });
  }
};

// backend/routes/orderRoutes.js

const express = require('express');
const { criarPedido, listarPedidosUsuario } = require('../controllers/orderController');
const { proteger } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', proteger, criarPedido);
router.get('/', proteger, listarPedidosUsuario);

module.exports = router;

// Adicionar rota ao arquivo  backend/server.js

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);



