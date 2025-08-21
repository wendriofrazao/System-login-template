const userModel = require('../model/user.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export const register = async (req, res) => {
    const { name, email, password, confirmpassword } = req.body

    // validação

    if (!name && !email && ! confirmpassword) res.status(412).json({message: "Os campos não podem ficar vazios. Preencha para prosseguir."}); 

    if(password !== confirmpassword) return res.status(412).json({message: "Senhas não coincidem."});

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