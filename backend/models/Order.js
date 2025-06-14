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
