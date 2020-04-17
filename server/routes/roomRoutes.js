const roomController = require('../controllers/roomController.js')
const { authentication } = require('../middlewares/auth.js')

const express = require('express')
const router = express.Router()

router.get('/', authentication, roomController.getAllRoom)
router.get('/:RoomId', authentication, roomController.getOneRoom)
router.post('/:BuildingId', authentication, roomController.addRoom)

module.exports = router
