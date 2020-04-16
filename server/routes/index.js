const express = require('express')
const router  = express.Router()

const { authentication } = require('../middlewares/auth.js')

const userRoutes = require('./userRoutes.js')
// const roomRoutes = require('./roomRoutes.js')
// const buildingRoutes = require('./buildingRoutes.js')

router.get('/', function(req,res,next) {
    res.status(200).json({
        message: 'You are connected to the server, refer to API documentation for further information'
    })
})

router.use('/user', userRoutes)
// router.use('/items', itemRoutes)

router.use(authentication)
// Anything that uses authentication goes here
// router.use('/building', buildingRoutes)

module.exports = router
