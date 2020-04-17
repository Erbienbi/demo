'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Please insert price'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    BuildingId: DataTypes.INTEGER,
    ac: DataTypes.BOOLEAN,
    bathroom: DataTypes.BOOLEAN,
    carPort: DataTypes.BOOLEAN,
    laundry: DataTypes.BOOLEAN,
    gender: DataTypes.STRING
  }, {});
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};