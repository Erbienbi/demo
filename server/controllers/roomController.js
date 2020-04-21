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
        console.log(BuildingId)
        try {
            let {
                price,
                ac,
                bathroom,
                carPort,
                laundry,
                gender,
                date_occupied,
                image
            } = req.body
            let newRoom = await Room.create({
                price,
                BuildingId,
                ac,
                bathroom,
                carPort,
                laundry,
                gender,
                date_occupied,
                image
            })
            res.status(201).json('successfully create new room')
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
                res.status(200).json('room has been deleted succesfully')
            }
            next({status:404, message:'Something wrong!'})
        } catch (err) {
            next(err)
        }
    }

    static async updateRoom (req,res,next){
        const { BuildingId, RoomId } = req.params
        const userId = req.userData.id
        const { date_occupied } = req.body
        const updateData = {
            UserId: userId,
            date_occupied
        }
        try {
            const updateRoom = await Room.update(updateData,{where:{id:RoomId}})
            if (updateRoom[0] === 1) {
                res.status(200).json('Room sucessfully booked')
            } else {
                next({status:400, message:'Something is wrong'})
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = RoomController
