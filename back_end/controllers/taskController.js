const asyncHandler = require('express-async-handler') // Funcion instalada con npm i express-async-handler

const task = require('../models/taskModel') // Importamos el modelo

const getTask = asyncHandler (async (req, res) => {
    const tarea = await task.find({user: req.user.id}) //me regresa solamente las tareas con {user: req.user.id}
    res.status(200).json(tarea)
})

const setTask = asyncHandler(async (req, res) => {
    // console.log(req.body)
    if(!req.body.text){
        // res.status(400).json({message: 'Por favor ingrese una descripcion de la tarea'})
        
        // Otra manera de mostrar un error mandando una paguina HTML seria 
        res.status(400)
        throw new Error ('Por favor ingrese una descripcion de la tarea')
    }

    const tarea = await task.create({
        text: req.body.text,
        user: req.user.id // Se agrega el id del usuario como una FK
    })

    res.status(201).json(tarea) 
} )
 
const updateTask = asyncHandler (async (req, res) => {
    
    const tarea = await task.findById(req.params.id)

    if(!tarea){
        res.status(400)
        throw new Error('Task not found')
    }

    // Verificamos que el user de la tarea sea igual al user del token
    if(tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error ('Acceso no autorizado')
    }

    const updatedTarea = await task.findByIdAndUpdate(req.params.id, req.body, {new: true})
    
    res.status(200).json(updatedTarea)
} )

const deleteTask = asyncHandler(async (req, res) => {

    const tarea = await task.findById(req.params.id)

    if(!tarea){
        res.status(400)
        throw new Error('Task not found')
    }

    // Verificamos que el user de la tarea sea igual al user del token
    if(tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error ('Acceso no autorizado')
    }

    // const deleteTarea = await task.findByIdAndRemove(req.params.id) // Forma uan de borrar la tarea
    await tarea.remove() // segunda forma de borrar

    res.status(200).json('Tarea Borrada'/* deleteTarea */)
})

module.exports = {
    getTask,
    setTask,
    updateTask,
    deleteTask
}
