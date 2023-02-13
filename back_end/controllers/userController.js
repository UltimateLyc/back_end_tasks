const asyncHandler = require('express-async-handler')
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel') // Importamos el modelo de usuario 

const registrarUser = asyncHandler(async(req, res) => {

    const {name, email, password} = req.body // Desestructuracion para no usar (req.body.name || req.body.email || req.body.password)

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Faltan daros, favor de validar')
    }

    /* Verificamos que no exista otro usuario */
    const userExiste = await User.findOne({email})

    if(userExiste) {
        res.status(400)
        throw new Error('Ya existe el correo')
    }

    /* Hash password */
    const salt = await bcrypt.genSalt(10) // El parametro 10 es el numero de rondas que se va a ejecutar
    const hashedPassword = await bcrypt.hash(password, salt) // Password ya hasheado

    // Creacion de usuario
    const user =  await User.create({
        name,
        email,
        password: hashedPassword  // Le decimos que el password sera el password haseado
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('No se pudo agregar el usuario')
    }
})

const loginrUser = asyncHandler(async(req, res) => {

    const {email, password} = req.body

    // Verificacion que el email y el password esten bien ingresados
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))) { // bcrypt compara el pasword enviado con el guardado
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: genereteToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales Incorrectas')
    }

    res.json({
        message: 'Login Usuario'
    })
})

// Generacion de toket
const genereteToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const dataUser = asyncHandler(async(req, res) => {
    const{_id, name, email} = req.user

    res.status(200).json({
        id: _id,
        name,
        email

    })

    
})


module.exports = {
    registrarUser,
    loginrUser,
    dataUser
}