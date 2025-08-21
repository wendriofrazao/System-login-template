const userModel = require('../model/user.js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// dotenv confing
dotenv.config();

const register = async (req, res) => {
    const { name, email, password, confirmpassword } = req.body

    // validação
    if (!name || !email || !password) return res.status(400).json({message: "Os campos não podem ficar vazios. Preencha para prosseguir."}); 

    if(password !== confirmpassword) return res.status(400).json({message: "Senhas não coincidem."});

    // verificar se o usuario ja existe
    const userExist = await userModel.findOne({email});

    if (userExist) return res.status(409).json({message: "Email já existente, coloque outro"});

    try {
        
        const hashPassword = await bcrypt.hash(password, 10);

        const registerUser = new userModel({
            name,
            email,
            password: hashPassword
        })

        await registerUser.save()

        const token = jwt.sign({id: registerUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        console.log("Usuário cadastrado com sucesso!");
        
        return res.status(201).json({success: true, message: "Usuário registrado com sucesso!",})

    } catch (error) {
        res.json({sucess: false, message: error.message})
    }

}

const login = async (req, res) => {
    const {email, password} = req.body;

    // validação
    if (!email || !password) return res.status(400).json({message: "Os campos não podem ficar vazios. Preencha para prosseguir."});

    const userExist = await userModel.findOne({email});

    if (!userExist) return res.status(404).json({message: "Email ou senha inválidos"});

    try {
        
        const isCoincide = await bcrypt.compare(password, userExist.password)

        if (!isCoincide) return res.status(412).json({message: "Senha inválida"})

        // jwt token 
        const token = jwt.sign({id: userExist._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success: true});

    } catch (error) {
        res.json({sucess: false, message: error.message})
    }
}

module.exports = { register, login };