const { Building, Room } = require('../models')

class BuldingController {

    static async getAllBuilding (req, res, next) {
        try {
            const allBuildings = await Building.findAll()
            res.status(200).json(allBuildings)
        } catch (err) {
            next(err)
        }
    }

    static async postBuilding (req, res, next) {
        if (req.userData.role) {
            next({status: 404, message:'You are not authorized'})
        }
        console.log(req.userData)
        try {
            const { area, address, coordinate } = req.body
            const addNewBuilding = await Building.create({
                area,
                address,
                coordinate,
                OwnerId: req.userData.id
            })
            res.status(201).json('Added new building')
        } catch (err) {
            next(err)
        }
    }

    static async getOneBuilding (req, res, next) {
        const { id } = req.params
        console.log('masuk')
        try {
            const building = await Building.findAll({where:{ id }, include:[Room]})
            res.status(200).json(building)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

}

module.exports = BuldingController