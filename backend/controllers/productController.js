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