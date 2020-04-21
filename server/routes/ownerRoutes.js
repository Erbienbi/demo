const ownerController = require('../controllers/ownerController.js')
const { authentication } = require('../middlewares/auth.js')
const upload = require("../helpers/googleStorage");

const express = require('express')
const router = express.Router()

router.get('/', authentication, ownerController.getProfile)
router.put('/', authentication, ownerController.updateProfile)
router.post('/register', ownerController.register)
// router.post("/register", upload.single("ktp"), ownerController.register);
router.post('/login', ownerController.login)

module.exports = router
