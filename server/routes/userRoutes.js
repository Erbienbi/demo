const UserController = require('../controllers/userController.js')
const { authentication, adminAuth } = require('../middlewares/auth.js')

const express = require('express')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/', authentication, UserController.getProfile)
router.put('/', authentication, UserController.updateProfile)
// router.delete('/', authentication, UserController.deleteMyAccount)
// router.put('/new-password', authentication, UserController.updatePassword)

// router.put('/give-role', authentication, adminAuth, UserController.updateRole)
// router.delete('/delete-user', authentication, adminAuth, UserController.deleteUserAccount)

module.exports = router