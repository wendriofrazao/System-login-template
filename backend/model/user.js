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
        minlength: 6,
        maxlength: 15
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('user', userShema);