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
