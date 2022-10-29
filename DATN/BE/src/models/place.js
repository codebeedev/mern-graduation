"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Place.belongsTo(models.Allcode, {
        foreignKey: "domainId",
        targetKey: "keyMap",
        as: "domainData",
      });
      Place.hasMany(models.Tour, {
        foreignKey: "placeId",
        as: "placeData",
      });
    }
  }
  Place.init(
    {
      name: DataTypes.STRING,
      domainId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Place",
    }
  );
  return Place;
};
