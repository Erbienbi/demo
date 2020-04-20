const router = require('express').Router()
const { authentication, ownerAuthorization } = require('../middlewares/auth')
const BuildingController = require('../controllers/buildingController')

router.get('/', BuildingController.getAllBuilding) // list semua kos
router.post('/', authentication, BuildingController.postBuilding) // add new kosan
router.get('/:id', BuildingController.getOneBuilding) // list semua room di kosan tersebut
router.delete('/:id', authentication, ownerAuthorization, BuildingController.deleteBuilding)





module.exports = router