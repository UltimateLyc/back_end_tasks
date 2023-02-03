const asyncHandler = require('express-async-handler') // Funcion instalada con npm i express-async-handler

const task = require('../models/taskModel') // Importamos el modelo

const getTask = asyncHandler (async (req, res) => {
    const tarea = await task.find()
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
        text: req.body.text
    })

    res.status(201).json(tarea) 
} )
 
const updateTask = asyncHandler (async (req, res) => {
    
    const tarea = await task.findById(req.params.id)

    if(!tarea){
        res.status(400)
        throw new Error('Task not found')
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

    // const deleteTarea = await task.findByIdAndRemove(req.params.id) // Forma uan de borrar la tarea
    await tarea.remove() // segunda forma de borrar

    res.status(200).json(deleteTarea)
})

module.exports = {
    getTask,
    setTask,
    updateTask,
    deleteTask
}
