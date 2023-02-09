const mongoose = require('mongoose')

/* Creamos el esquema */
const userSchema =  mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Por favor ingrese el nombre del usuario']
    },
    email:{
        type: String,
        required: [true, 'Por favor ingrese el email del usuario'],
        unique: true // Esto nos indica que solo puede existir un unico correo
    },
    password:{
        type: String,
        required: [true, 'Por favor ingrese el password del usuario']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
