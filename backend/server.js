const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

app.use('/api/payment', paymentRoutes);

console.log('Variáveis de ambiente:', process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY);