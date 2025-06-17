const express = require('express');
const { criarProduto, listarProdutos } = require('../controllers/productController');
const { proteger } = require('../middleware/authMiddleware');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// Cadastro de produtos
router.post('/', proteger, criarProduto);
router.get('/', listarProdutos);

// Função para enviar imagem ao Cloudinary corretamente
const uploadImagem = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'marketplace' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Upload de imagens para Cloudinary
router.post('/upload', proteger, upload.single('imagem'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ mensagem: 'Nenhuma imagem enviada' });
    }

    console.log('Arquivo recebido:', req.file.originalname); // Debug para validação

    // Agora chamamos a função `uploadImagem()` corretamente
    const resultado = await uploadImagem(req.file.buffer);
    res.status(200).json({ imagem: resultado.secure_url });

  } catch (err) {
    console.error('Erro ao processar upload:', err);
    res.status(500).json({ mensagem: 'Erro ao processar upload', erro: err.message });
  }
});

module.exports = router;
