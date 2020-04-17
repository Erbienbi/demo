const roomController = require('../controllers/roomController.js')
const { authentication } = require('../middlewares/auth.js')

const express = require('express')
const router = express.Router()

router.get('/', authentication, roomController.getAllRoom)
router.get('/:RoomId', authentication, roomController.getOneRoom)
router.post('/:BuildingId', authentication, roomController.addRoom)
router.put(':BuildingId/:RoomId', authentication, roomController.updateRoom)
router.delete('/:BuildingId/:RoomId', authentication, roomController.deleteRoom)
module.exports = router
