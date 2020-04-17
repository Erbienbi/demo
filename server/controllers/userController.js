const {User} = require('../models')
const {checkPassword} = require('../helpers/bcryptjs.js')
const {generateToken} = require('../helpers/jsonwebtoken.js')

class Controller {

    static register(req, res, next) {
        const { name, email, password} = req.body
        User.create({ name, email, password})
        .then(data => {
            res.status(201).json({ data, message: 'Successfully registered new user' })
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
                role: user.role,
            }
            let token = generateToken(userProfile)
            res.status(200).json({ token, user: {id: user.id, name: user.name, email: user.email}, message: 'Log in successful' })
        })
        .catch(next)
    }

    static getProfile(req, res, next) {
        User.findOne({ where: { id: req.userData.id }})
        .then((data) => {
            if (data) {
                res.status(200).json(data)
            } else {
                throw {status: 404, message: 'Data not found'}
            }
        })
        .catch(next)
    }
}

module.exports = Controller