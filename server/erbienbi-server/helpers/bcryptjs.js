"use strict"

const bcrypt = require('bcryptjs')

function hashPassword(inputPass) {
    let count = 10
    let salt = bcrypt.genSaltSync(count);
    return bcrypt.hashSync(inputPass, salt)
}

function checkPassword(inputPass, hashedPass) {
    return bcrypt.compareSync(inputPass, hashedPass); // returns true or false
}

module.exports = {hashPassword, checkPassword}