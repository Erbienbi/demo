const {User} = require('../models')
const {checkPassword, hashPassword} = require('../helpers/bcryptjs.js')
const {generateToken} = require('../helpers/jsonwebtoken.js')

class Controller {

    static register(req, res, next) {
        const { name, email, password} = req.body
        User.create({ name, email, password})
        .then(() => {
            res.status(201).json({ name, email, message: 'Successfully registered new user' })
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
        User.findOne(option)
        .then(user => {
            if (!user) throw {status: 400, message: 'Wrong email/password'}

            let inputPass = obj.password
            let userPass = user.password
            let compare = checkPassword(inputPass, userPass)

            if (!compare) throw {status: 400, message: 'Wrong email/password'}

            let userProfile = {
                id: user.id,
                name: user.name,
                email: user.email,
            }
            let token = generateToken(userProfile)
            res.status(200).json({ token, user: {id: user.id, name: user.name, email: user.email}, message: 'Log in successful' })
        })
        .catch(next)
    }

    static getProfile(req, res, next) {
        User.findOne({ where: { id: req.userData.id }})
        .then(data => {
            if (data) {
                // Does not include password and ID //
                res.status(200).json({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    KTP: data.KTP,
                    role: data.role,
                    RoomId: data.RoomId,
                })
            } else {
                throw {status: 404, message: 'Data not found'}
            }
        })
        .catch(next)
    }

    static updateProfile(req, res, next) {
        const obj = {
            name: req.body.name,
            KTP: req.body.KTP,
            phone: req.body.phone,
            RoomId: req.body.RoomId,
        }
        const option = {
            where: { id: req.userData.id }
        }
        User.findOne(option)
        .then(user => {
            if (!user) throw {status: 404, message: 'User data not found!'}
            // Name validation //
            if (!obj.name) throw {status: 400, message: 'Name cannot be empty!'}

            return User.update(obj, option)
        })
        .then((data) => {
            res.status(200).json({ data, message: 'Successfully updated user profile' })
        })
        .catch(next)
    }

    // All of the commented codes below are working but not yet necessary //

    // static updatePassword(req, res, next) {
    //     const obj = {
    //         password: hashPassword(req.body.newPassword)
    //     }
    //     const option = {
    //         where: { id: req.userData.id }
    //     }
    //     User.findOne(option)
    //     .then(user => {
    //         if (!user) throw {status: 404, message: 'User data not found!'}

    //         let oldPassword = req.body.oldPassword
    //         let userPass = user.password
    //         let compare = checkPassword(oldPassword, userPass)

    //         if (!compare) throw {status: 400, message: 'Wrong former password, update password failed'}

    //         // Update password validation //
    //         const regex =  RegExp('(?=.{7,})')
    //         if (!obj.password) throw {status: 400, message: 'Please insert a password'}
    //         if (!regex.test(obj.password)) {
    //             throw ({status: 400, message: "Password needs to have at least 7 characters!"})
    //         }

    //         return User.update(obj, option)
    //     })
    //     .then((data) => {
    //         console.log(data)
    //         res.status(200).json({ message: 'Successfully updated user password' })
    //     })
    //     .catch(next)
    // }

    // static updateRole(req, res, next) {
    //     const obj = {
    //         id: req.body.id,
    //         role: req.body.role
    //     }
    //     const option = {
    //         where: { id: obj.id }
    //     }
    //     User.update(obj, option)
    //     .then(() => {
    //         res.status(200).json({message: `Successfully updated user role to ${obj.role}`})
    //     })
    //     .catch(next)
    // }

    // static deleteMyAccount(req, res, next) {
    //     const option = {
    //         where: { id: req.userData.id }
    //     }
    //     User.destroy(option)
    //     .then(() => res.status(200).json({message: 'You have deleted your account' }))
    //     .catch(next)
    // }

    // static deleteUserAccount(req, res, next) {
    //     const option = {
    //         where: { id: req.body.id }
    //     }
    //     User.destroy(option)
    //     .then(() => res.status(200).json({message: 'This account has been deleted' }))
    //     .catch(next)
    // }
}

module.exports = Controller