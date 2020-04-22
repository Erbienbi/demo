const { Building, Room } = require('../models')

class BuldingController {

    static async getAllBuilding (req, res, next) {
        try {
            const allBuildings = await Building.findAll({include:[Room]})
            res.status(200).json(allBuildings)
        } catch (err) {
            next(err)
        }
    }

    static async postBuilding (req, res, next) {
        // console.log(req.body)
        if (req.userData.role) {
            next({status: 404, message:'You are not authorized'})
        }
        try {
            const { name, area, address, coordinate, image } = req.body
            const addNewBuilding = await Building.create({
                name,
                area,
                address,
                coordinate,
                OwnerId: req.userData.id,
                image
            })
            res.status(201).json('Added new building')
        } catch (err) {
            next(err)
        }
    }

    static async getOneBuilding (req, res, next) {
        const { id } = req.params
        try {
            const building = await Building.findOne({where:{ id }, include:[Room]})
            res.status(200).json(building)
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async deleteBuilding (req, res, next) {
        const { id } = req.params
        try {
            const deleting = await Building.destroy({where: { id }})
            if (deleting == 1) {
                res.status(200).json('delete successfull')
            }
            next({status:400, message:'Something wrong!'})
        } catch (err) {
            next(err)
        }
    }

}

module.exports = BuldingController