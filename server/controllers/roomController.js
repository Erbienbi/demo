const { Room } = require('../models')

class RoomController {
    static async getAllRoom (req,res,next) {
        try {
            const rooms = await Room.findAll()
            res.status(200).json(rooms)
        } catch (err) {  
            next(err)
        }
    }

    static async getOneRoom (req,res,next) {
        try {
            let id = Number(req.params.RoomId)
            const rooms = await Room.findOne({where: {id}})
            res.status(200).json(rooms)
        } catch (err) {
            next(err)
        }
    }
    static async addRoom (req,res,next) {
        if (req.userData.role) {
            next({status:400, message:'You are not authorized'})
        }
        const { BuildingId } = req.params
        try {
            let {
                price,
                ac,
                bathroom,
                carPort,
                laundry,
                gender,
                date_occupied
            } = req.body
            let newRoom = await Room.create({
                price,
                BuildingId,
                ac,
                bathroom,
                carPort,
                laundry,
                gender,
                date_occupied
            })
            res.status(201).json({message:'successfully create new room', room:newRoom })
        } catch (err) {
            next(err)
        }
    }
    static async deleteRoom(req,res,next){
        if (req.userData.role) {
            next({status:400, message:'You are not authorized'})
        }
        try {
            const {RoomId} = req.params
            const success = await Room.destroy({where: {id:RoomId}})
            if (success == 1) {
                res.status(200).json({message: 'room has been deleted succesfully'})
            }
            next({status:404, message:'Something wrong!'})
        } catch (err) {
            next(err)
        }
    }

    static async updateRoom (req,res,next){
        const {RoomId, BuildingId} = req.params
        let {
            price,
            ac,
            bathroom,
            carPort,
            laundry,
            gender } = req.body
            let obj = {
                UserId:req.userData.id,
                price,
                BuildingId,
                ac,
                bathroom,
                carPort,
                laundry,
                gender
            }
        await Room.update({where:{id:RoomId}}, obj)
        res.status(200).json({message: 'successfully updated rooms'})
    }
}

module.exports = RoomController
