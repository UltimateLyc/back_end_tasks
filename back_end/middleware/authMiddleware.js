const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next)=>{
    let token

    // ver si nos lo mandaron
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Obtenemos el token
            token = req.headers.authorization.split(' ')[1]
            console.log(req.headers.authorization.split(' '))

            //Verificamos el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)

            //Obtenemos los datos del usuario del mismo token
            req.user = await User.findById(decoded.id).select('-password')
            console.log(await User.findById(decoded.id))

            next()
            
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('token Incorrecto')
        }
    }
    if (!token){
        res.status(401)
        throw new Error('Sin token')
    }
})

module.exports = {
    protect
}