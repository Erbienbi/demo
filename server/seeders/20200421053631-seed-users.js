'use strict';

const { hashPassword } = require('../helpers/bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Users', [
        {
          name: 'Agus',
          email: 'agus@mail.com',
          password: hashPassword('1234567'),
          phone: '08475938123',
          KTP: '1231549223-123123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Arif',
          email: 'arif@mail.com',
          password: hashPassword('1234567'),
          phone: '08475938123',
          KTP: '1231549223-123123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Bram',
          email: 'bram@mail.com',
          password: hashPassword('1234567'),
          phone: '08475938123',
          KTP: '1231549223-123123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Steven',
          email: 'steven@mail.com',
          password: hashPassword('1234567'),
          phone: '08475938123',
          KTP: '1231549223-123123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Malik',
          email: 'malik@mail.com',
          password: hashPassword('1234567'),
          phone: '08475938123',
          KTP: '1231549223-123123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Gusti',
          email: 'gusti@mail.com',
          password: hashPassword('1234567'),
          phone: '08475938123',
          KTP: '1231549223-123123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Erlang',
          email: 'erlang@mail.com',
          password: hashPassword('1234567'),
          phone: '08475938123',
          KTP: '1231549223-123123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Ivan',
          email: 'ivan@mail.com',
          password: hashPassword('1234567'),
          phone: '08475938123',
          KTP: '1231549223-123123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Limbad',
          email: 'limbad@mail.com',
          password: hashPassword('1234567'),
          phone: '08475938123',
          KTP: '1231549223-123123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Seven',
          email: 'seven@mail.com',
          password: hashPassword('1234567'),
          phone: '08475938123',
          KTP: '1231549223-123123',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Users', null, {});
  }
};
