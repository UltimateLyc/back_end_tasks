const express = require('express')
const router = express.Router()
const {getTask, setTask, updateTask, deleteTask} = require('../controllers/taskController')

// ********************************************************** 

// Peticion GET
/* router.get('/', getTask
/* (req, res) => {
    res.status(200).json({message: 'Get Tasks'}) // Mandamos el status y el mensaje en formato JSON
} )
/* 
    Creacion de un end-poitn
        * Le decimos que es un metodo get 
        * Indicamos el end-point
        * Es una funcion que recibe request y response
        * Manda un response "Get Tasks"
*/


// ********************************************************** 

// Peticion GET
// router.get('/', getTask)

// Peticion POST
// router.post('/', setTask )

// Peticion PUT
// router.put('/:id', updateTask )

// Peticion DELETE
// router.delete('/:id', deleteTask)

// ********************************************************** 

// Para simplificar lo anterior se puede hacer lo siguiente

router.route('/').get(getTask).post(setTask)

router.route('/:id').delete(deleteTask).put(updateTask)

module.exports = router
