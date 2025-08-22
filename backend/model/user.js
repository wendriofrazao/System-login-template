const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
     name: {
        type: String,
        required: [true, 'O nome é obrigatório'],
        trim: true,
        minlength: 4,
        maxlength: 15
    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório'],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Informe um email válido'],
    },
    password: {
        type: String,
        required: [true, 'A senha é obrigatória'],
        minlength: 6
    },
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0
    } 
}, {
    timestamps: true 
});

const userModel = mongoose.models.user || mongoose.model('user', userShema); 

module.exports = userModel;