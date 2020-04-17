'use strict';
module.exports = (sequelize, DataTypes) => {
  const Building = sequelize.define('Building', {
    OwnerId: DataTypes.INTEGER,
    area: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please insert area'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please insert address'
        }
      }
    },
    coordinate: {
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
    Building.hasMany(models.Room, { foreignKey: 'BuildingId' })
  };
  return Building;
};