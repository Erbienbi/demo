"use strict"

const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET)
}

function verifyToken(token) {
    console.log(process.env.JWT_SECRET)
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {generateToken, verifyToken}