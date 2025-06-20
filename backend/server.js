const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/paymentRoutes');
const app = express();
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
connectDB();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

console.log('Variáveis de ambiente:', process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY);