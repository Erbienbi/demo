'use strict';
module.exports = (sequelize, DataTypes) => {
  const Building = sequelize.define('Building', {
    OwnerId: DataTypes.INTEGER,
    Area: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please insert area'
        }
      }
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please insert address'
        }
      }
    },
    Coordinate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please insert coordinate'
        }
      }
    }
  }, {});
  Building.associate = function(models) {
    // associations can be defined here
  };
  return Building;
};