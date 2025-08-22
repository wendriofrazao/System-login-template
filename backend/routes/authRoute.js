const express = require('express');
const authRouter = express.Router();
const { register, login, logout } = require('../controllers/authControllers.js');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);