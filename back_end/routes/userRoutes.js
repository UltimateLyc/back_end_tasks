const express = require ('express')
const router = express.Router()

const { registrarUser, loginrUser, dataUser } = require('../controllers/userController')

router.post('/', registrarUser)
router.post('/login', loginrUser)
router.post('/data', dataUser)


module.exports = router
