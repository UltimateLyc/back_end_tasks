const express = require('express')  // Indicamos que usaremos express
const dotenv = require('dotenv').config() // indicamos que usaremos dotenv para variables de entorno y sus configuraciones
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT // 5000 // Definimos un puerto 

const app = express() // Creamos la aplicacion e indicamos que es de express

/*
// Lo sishiente se pasa a rutas ya que podemos tenener varios end-point y por un codigo limpio se crean rutas 
app.get('/api/tasks', (req, res) => {
    res.status(200).json({message: 'Get Tasks'}) // Mandamos el status y el mensaje en formato JSON
})
/* 
    Creacion de un end-poitn
        * Le decimos que es un metodo get 
        * Indicamos el end-point
        * Es una funcion que recibe request y response
        * Manda un response "Get Tasks"
*/

app.use(express.json()) // Indica a la aplicacion que usaremos JSON
app.use(express.urlencoded({extended: false})) // Sirve para que pueda recibir datos y su forma de encriptacion

app.use('/api/tasks', require('./routes/tasksRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started on port ${port}`)) // Decimos que escucha el puerto indicado
