const { Room, Building } = require('../models')
const {verifyToken} = require('../helpers/jsonwebtoken.js')

function authentication(req, res, next) {
    try {
        let decoded = verifyToken(req.headers.token)
        req.userData = decoded
        next()
    } catch(err) {
        next(err)
    }
}

const ownerAuthorization = async (req, res, next) => {
    if (req.userData.role){
        next({status:400, message:'You are not authorized'})
    }
    try {
        const findBuilding = await Building.findOne({where:{id:req.params.id}})
        if (findBuilding.OwnerId === req.userData.id){
            next()
        } else {
            next({status:400, message:'You are not authorized'})
        }
    } catch (err) {
        next(err)
    }
}


module.exports = {authentication, ownerAuthorization}