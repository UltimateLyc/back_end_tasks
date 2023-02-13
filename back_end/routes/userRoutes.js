const express = require ('express')
const router = express.Router()

const { registrarUser, loginrUser, dataUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registrarUser)
router.post('/login', loginrUser)
router.post('/data', protect, dataUser) //Protegemos el endpoint



module.exports = router
