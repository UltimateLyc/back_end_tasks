const getTask = (req, res) => {
    res.status(200).json({message: 'Get Tasks'})
}

const setTask = (req, res) => {
    // console.log(req.body)
    if(!req.body.texto){
        // res.status(400).json({message: 'Por favor ingrese una descripcion de la tarea'})
        
        // Otra manera de mostrar un error mandando una paguina HTML seria 
        res.status(400)
        throw new Error ('Por favor ingrese una descripcion de la tarea')
    }
    res.status(201).json({message: 'Crated Tasks'}) 
}
 
const updateTask = (req, res) => {
    res.status(200).json({message: `Updated Task ${req.params.id}`})
}

const deleteTask = (req, res) => {
    res.status(200).json({message: `Deleted Task ${req.params.id}`})
}

module.exports = {
    getTask,
    setTask,
    updateTask,
    deleteTask
}
