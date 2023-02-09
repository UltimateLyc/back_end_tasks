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
    res.json({
        message: 'Login Usuario'
    })
})

const dataUser = asyncHandler(async(req, res) => {
    res.json({
        message: 'data Usuario'
    })
})


module.exports = {
    registrarUser,
    loginrUser,
    dataUser
}