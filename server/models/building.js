'use strict';
module.exports = (sequelize, DataTypes) => {
  const Building = sequelize.define('Building', {
    OwnerId: DataTypes.INTEGER,
    Area: DataTypes.STRING,
    Address: DataTypes.STRING,
    Coordinate: DataTypes.STRING
  }, {});
  Building.associate = function(models) {
    // associations can be defined here
  };
  return Building;
};