const {Owner} = require('../models')
const {checkPassword} = require('../helpers/bcryptjs.js')
const {generateToken} = require('../helpers/jsonwebtoken.js')

class OwnerController {
    static register(req, res, next) {
        const { name, email, password, ktp, phone} = req.body
        Owner.create({ name, email, password, ktp, phone})
        .then(data => {
            res.status(201).json({ data, message: 'Successfully registered new Owner' })
        })
        .catch(next)
    }

    static login(req, res, next) {
        let obj = {
            email: req.body.email,
            password: req.body.password,
        }
        if (!obj.email) throw { status: 400, message: 'Please insert a valid email' }
        if (!obj.password) throw { status: 400, message: 'Please insert a password' }
        let option = {
            where: { email: obj.email }
        }
        Owner.findOne(option)
        .then(owner => {
            if (!owner) throw {status: 400, message: 'Wrong email/password'}

            let inputPass = obj.password
            let ownerPass = owner.password
            let compare = checkPassword(inputPass, ownerPass)

            if (!compare) throw {status: 400, message: 'Wrong email/password'}

            let ownerProfile = {
                id: owner.id,
                name: owner.name,
                email: owner.email,
                role: owner.role,
            }
            let token = generateToken(ownerProfile)
            res.status(200).json({ token, owner: {id: owner.id, name: owner.name, role:owner.role}, message: 'Log in successful' })
        })
        .catch(next)
    }

    static getProfile(req, res, next) {
        Owner.findOne({ where: { id: req.userData.id }})
        .then((data) => {
            if (data) {
                res.status(200).json(data)
            } else {
                throw {status: 404, message: 'Data not found'}
            }
        })
        .catch(next)
    }

    static updateProfile(req, res, next) {
        let obj = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        }
        Owner.update({ where: { id: req.userData.id }}, obj)
        .then((data) => {
            if (data) {
                res.status(200).json(data)
            } else {
                throw {status: 400, message: `something's wrong`}
            }
        })
        .catch(next)
    }
}

module.exports = OwnerController