'use strict';
const {hashPassword} = require('../helpers/bcryptjs.js')

module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model
  class User extends Model {}

  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert a name!'
        },
        validUsername(value) {
          let regex =  RegExp('(?=.{3,})')
          if (!regex.test(value)) {
            throw new Error("Username needs to have at least 3 characters long!");
          }
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert an email address!'
        },
        isEmail: {
          msg: 'The email is not in the right format!'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert a password'
        },
        validPassword(value) {
          let regex =  RegExp('(?=.{7,})')
          if (!regex.test(value)) {
            throw new Error("Password needs to have at least 7 characters!");
          }
        },
      }
    },
    role: {
      type: DataTypes.STRING,
    },
    RoomId: {
      type: DataTypes.INTEGER
    },
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        let inputPass = instance.password
        instance.password = hashPassword(inputPass)
      }
    },
    sequelize,
    timestamps: false,
  })

  User.associate = function (models) {
    // associations can be defined here
    // User.hasOne(models.Room)
  };
  return User;
};