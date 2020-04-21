'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Rooms', [
        {
          price: 1000000,
          BuildingId: 1,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'male',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1000000,
          BuildingId: 1,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'male',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1000000,
          BuildingId: 1,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'male',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1000000,
          BuildingId: 2,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'female',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1000000,
          BuildingId: 2,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'female',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1000000,
          BuildingId: 2,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'female',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 2000000,
          BuildingId: 3,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'female',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 2000000,
          BuildingId: 3,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'female',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 2000000,
          BuildingId: 3,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'female',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 2000000,
          BuildingId: 4,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 2000000,
          BuildingId: 4,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 2000000,
          BuildingId: 4,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 2000000,
          BuildingId: 5,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 2000000,
          BuildingId: 5,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 2000000,
          BuildingId: 5,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 2500000,
          BuildingId: 6,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 2500000,
          BuildingId: 6,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 2500000,
          BuildingId: 6,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1500000,
          BuildingId: 7,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1500000,
          BuildingId: 7,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1500000,
          BuildingId: 7,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1500000,
          BuildingId: 8,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1500000,
          BuildingId: 8,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1500000,
          BuildingId: 8,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'Mix',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1500000,
          BuildingId: 9,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'male',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1500000,
          BuildingId: 9,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'male',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1500000,
          BuildingId: 9,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'male',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1700000,
          BuildingId: 10,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'male',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1700000,
          BuildingId: 10,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'male',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          price: 1700000,
          BuildingId: 10,
          ac: true,
          bathroom: true,
          carPort: true,
          laundry: true,
          gender: 'male',
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Rooms', null, {});
  }
};
