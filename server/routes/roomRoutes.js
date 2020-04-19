const roomController = require('../controllers/roomController.js')
const { authentication } = require('../middlewares/auth.js')
const upload = require("../helpers/googleStorage")

const express = require('express')
const router = express.Router()

router.get('/', roomController.getAllRoom)
router.get('/:RoomId', roomController.getOneRoom)
router.post('/:BuildingId', authentication, roomController.addRoom)
router.put(':BuildingId/:RoomId', authentication, roomController.updateRoom)
router.delete('/:BuildingId/:RoomId', authentication, roomController.deleteRoom)
module.exports = router
