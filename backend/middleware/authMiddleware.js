const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.proteger = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extraindo token corretamente

  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Validando assinatura do token
    req.user = await User.findById(decoded.id).select('-senha');
    next();
  } catch (err) {
    res.status(401).json({ mensagem: 'Token inválido' });
  }
};
