const userModel = require('../model/user.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export const register = async (req, res) => {
    const { name, email, password, confirmpassword } = req.body

    // validações
    if (!name) return res.status(412).json({message: "Coloque o nome para registrar"});
    if (!email) return res.status(412).json({message: "Coloque o email para registrar"});
    if (!password) return res.status(412).json({message: "Coloque a senha para registrar"}); 
    if(!confirmpassword) return res.status(412).json({message: "Confirme a senha para registrar"});
    if(password !== confirmpassword) return res.status(412).json({message: "As senha não coincidem"});

    // verificar se o usuario ja existe
    const userExist = await userModel.findOne({email});

    if (userExist) return res.status(412).json({message: "Email já existente, coloque outro"});

    try {
        
        const hashPassword = await bcrypt.hash(password, 10);

        const registerUser = new userModel({
            name,
            email,
            password: hashPassword
        })

        await registerUser.save()

        console.log("Usuário cadastrado com sucesso!");
        
        return res.status(201).json({message: "Usuário registrado com sucesso!",})

    } catch (error) {
        res.json({sucess: false, message: error.messages})
    }

}

export const login = async (req, res) => {

}