"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Travelnew extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Travelnew.init(
    {
      name: DataTypes.STRING,
      motaHTML: DataTypes.TEXT("long"),
      motaMark: DataTypes.TEXT("long"),
      anhHTML: DataTypes.TEXT("long"),
      anhMark: DataTypes.TEXT("long"),
      thongtinHTML: DataTypes.TEXT("long"),
      thongtinMark: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "Travelnew",
    }
  );
  return Travelnew;
};
