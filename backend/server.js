const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// config dotenv
dotenv.config();

const app = express();

// confings
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}))

app.get('/', (req, res) => {
    res.send('test');
})


app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na url: http://localhost:${process.env.PORT}`);
})