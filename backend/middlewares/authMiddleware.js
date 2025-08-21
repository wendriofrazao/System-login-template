const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.cookie.token;

    if (!token) return res.status(401).json({ success: false, message: "Acesso negado. Faça login primeiro." });

    try {   

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;

        next();
    } catch (error) {
         return res.status(401).json({ success: false, message: "Token inválido ou expirado." });
    }
}

module.exports = authMiddleware;