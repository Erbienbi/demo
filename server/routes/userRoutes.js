const UserController = require('../controllers/userController.js')
const { authentication } = require('../middlewares/auth.js')

const express = require('express')
const router = express.Router()

router.get('/', authentication, UserController.getProfile)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router