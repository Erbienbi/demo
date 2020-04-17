const {Room} = require('../models')

class RoomController {
    static async getAllRoom (req,res,next) {
        rooms = await Room.findAll()
        res.status(200).json(rooms)
    }

    static async getOneRoom (req,res,next) {
        try {
            let id = Number(req.params.RoomId)
            rooms = await Room.findAll({where: {id}})
            res.status(200).json(rooms)
        } catch (err) {
            next(err)
        }
    }
    static async addRoom (req,res,next) {
        try {
            let {
                price,
                BuildingId,
                ac,
                bathroom,
                carPort,
                laundry,
                gender
            } = req.body
            let newRoom = await Room.create({
                price,
                BuildingId,
                ac,
                bathroom,
                carPort,
                laundry,
                gender})
            res.status(201).json({message:'successfully create new room', room:newRoom })
        } catch (err) {
            next(err)
        }
    }
    static async deleteRoom(req,res,next){
        try {
            const {RoomId} = req.params
            await Room.destory({where: {id:RoomId}})
            res.status(200).json({message: 'room has been deleted succesfully'})
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
