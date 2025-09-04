const userModel = require('../model/user.js');
const transporter = require('../configs/nodemailer.js')
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

        // enviar email
        const emailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Seja bem vindo',
            text: `Olá, seja bem-vindo(a)!

                Estamos muito felizes em ter você conosco 🎉

                Agora você já pode acessar sua conta e aproveitar todos os nossos recursos.

                Qualquer dúvida, estamos à disposição!

                Sua conta foi criada com o email id: ${email}

                Equipe System Login`,
            html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #4CAF50;">🎉 Seja bem-vindo(a)!</h2>
                        <p>Olá, estamos muito felizes em ter você conosco.</p>
                        <p>Agora você já pode acessar sua conta e aproveitar todos os nossos recursos.</p>
                        <p style="margin-top: 20px;">Qualquer dúvida, estamos à disposição!</p>
                        <hr style="margin: 30px 0;">
                        <p style="font-size: 12px; color: #888;">
                           Este é um e-mail automático. Por favor, não responda diretamente a esta mensagem.
                        </p>
                    </div>
                   `
        }

     transporter.sendMail(emailOption, (err, info) => {
        err ? console.error("Erro ao enviar email:", err) : console.log("Email enviado:", info.response)
     });

        console.log("Usuário cadastrado com sucesso!");
        
        return res.status(201).json({success: true, message: "Usuário registrado com sucesso!",})

    } catch (error) {
        res.status(500).json({sucess: false, message: error.message})
    }

}

const login = async (req, res) => {
    const {email, password} = req.body;

    // validação
    if (!email || !password) return res.status(400).json({message: "Os campos não podem ficar vazios. Preencha para prosseguir."});

    const userExist = await userModel.findOne({email});

    if (!userExist) return res.status(401).json({message: "Email ou senha inválidos"});

    try {
        
        const isCoincide = await bcrypt.compare(password, userExist.password)

        if (!isCoincide) return res.status(401).json({message: "Senha inválida"})

        // json web token 
        const token = jwt.sign({id: userExist._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.json({ success: true, user: { id: userExist._id, name: userExist.name, email: userExist.email } });

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const logout = async (req, res) => {
    try {
        
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict' 
        })

        return res.json({success: true, message: "Logged Out"})

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const sendVerifyOtp = async (req, res) => {
    try {
          
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if (user.isAccountVerified) {
           return res.status(202).json({success: false, message: "conta já verificada"});
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Verificação de conta OTP',
            text: `Seu OTP é ${otp}. verifique se sua conta está usando esse OTP`,
        }
 
        await transporter.sendMail(mailOption);

        res.status(200).json({success: true, message: 'Verificação do OTP enviada por email'})

    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body;

    if (!userId || !otp) {
        return res.status(400).json({success: false, message: 'Falta de detalhes'})
    }

    try {
        
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({success: false, message: 'Usuário não encontrados'})
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.status(401).json({success: false, message: 'OTP inválido'});
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(401).json({success: false, message: 'OTP expirou'})
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.status(200).json({success: true, message: 'Email verificado com sucesso!'})


    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

module.exports = { register, login, logout, sendVerifyOtp, verifyEmail };