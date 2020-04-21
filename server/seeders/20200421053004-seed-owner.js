'use strict';

const { hashPassword } = require('../helpers/bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Owners', [
        {
          name: 'John Travolta',
          email: 'john@travolta.com',
          phone: '021-21238493',
          ktp: '0826482-12320-1231123',
          password: hashPassword('1234567'),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Michael Douglase',
          email: 'michael@douglas.com',
          phone: '021-21238493',
          ktp: '0826482-12320-1231123',
          password: hashPassword('1234567'),
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
     return queryInterface.bulkDelete('Owners', null, {});
  }
};
