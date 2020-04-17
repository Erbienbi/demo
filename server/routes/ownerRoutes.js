const ownerController = require('../controllers/ownerController.js')
const { authentication } = require('../middlewares/auth.js')

const express = require('express')
const router = express.Router()

router.get('/', authentication, ownerController.getProfile)
router.put('/', authentication, ownerController.updateProfile)
router.post('/register', ownerController.register)
router.post('/login', ownerController.login)

module.exports = router
