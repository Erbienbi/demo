const router = require('express').Router()
const { authentication } = require('../middlewares/auth')
const BuildingController = require('../controllers/buildingController')
const upload = require("../helpers/googleStorage");

router.get('/', BuildingController.getAllBuilding) // list semua kos
router.post('/', authentication, upload.single("image"), BuildingController.postBuilding) // add new kosan
router.get('/:id', BuildingController.getOneBuilding) // list semua room di kosan tersebut
router.delete('/:id', authentication, BuildingController.deleteBuilding)





module.exports = router