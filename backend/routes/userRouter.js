const express = require('express');
const userRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const getUserData = require('../controllers/userController.js');


userRouter.get('data', authMiddleware ,getUserData);

module.exports = userRouter;