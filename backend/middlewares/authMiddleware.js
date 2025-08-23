const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

module.exports = authMiddleware;