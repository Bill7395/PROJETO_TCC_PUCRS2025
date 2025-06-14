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
