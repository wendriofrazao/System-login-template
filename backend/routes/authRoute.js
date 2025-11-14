const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js')
const authRouter = express.Router();
const { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOTP ,resetPassword } = require('../controllers/authControllers.js');


authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/verify-otp', sendVerifyOtp);
authRouter.post('/verify-Account', authMiddleware, verifyEmail);
authRouter.post('/is-auth', authMiddleware, isAuthenticated);
authRouter.post('/reset-otp', sendResetOTP);
authRouter.post('/reset-password', resetPassword);

module.exports = authRouter;