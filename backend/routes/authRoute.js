const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js')
const authRouter = express.Router();
const { register, login, logout, sendVerifyOtp, verifyEmail } = require('../controllers/authControllers.js');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/verify-Otp', authMiddleware, sendVerifyOtp);
authRouter.post('/verify-Account', authMiddleware, verifyEmail);

module.exports = authRouter;