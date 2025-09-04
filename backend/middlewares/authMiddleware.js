const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
const token = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false , message: "Token não fornecido" });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id) {
      req.body.userId = decoded.id 
    } else {
    return res.status(401).json({ success: false, message: "Não autorizado. Faça o Login novamente" });
    } 

    next();

  } catch (err) {

    return res.status(401).json({ success: false, message: "Token inválido ou expirado" });

  }
}

module.exports = authMiddleware;