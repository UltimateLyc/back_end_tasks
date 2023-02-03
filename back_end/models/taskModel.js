const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    text:{
        type: String, // Tipo de dato
        required: [true, 'Porfavor teclee un valor'] // Validacion de la base de datos 
    }
}, {
    timestamps: true // Nos crea la fecha y hora de cuando fue creado y otra de cada que se modifique
})

module.exports = mongoose.model('Tareas', taskSchema) // Exportamos el modelo e importarlo en controller
