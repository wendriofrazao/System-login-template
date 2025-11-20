const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectionDB = require('./configs/db.js')
const dotenv = require('dotenv');
const authRouter = require('./routes/authRoute.js');

// config dotenv
dotenv.config();

// connection database
connectionDB()

const app = express();

// confings
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));

// routes
app.use('/api/auth', authRouter);


app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na url: http://localhost:${process.env.PORT}`);
})