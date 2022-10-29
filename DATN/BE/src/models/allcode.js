"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, {
        foreignKey: "roleId",
        as: "roleData",
      });
      Allcode.hasMany(models.BookTour, {
        foreignKey: "statusId",
        as: "statusData",
      });
      Allcode.hasMany(models.BookTour, {
        foreignKey: "pay",
        as: "payData",
      });
      Allcode.hasMany(models.User, {
        foreignKey: "gender",
        as: "genderData",
      });
      Allcode.hasMany(models.Tour, {
        foreignKey: "addressId",
        as: "addressData",
      });
      Allcode.hasMany(models.Place, {
        foreignKey: "domainId",
        as: "domainData",
      });
      Allcode.hasMany(models.Tour, {
        foreignKey: "domainId",
        as: "domainM",
      });
      Allcode.hasMany(models.Tour, {
        foreignKey: "timeId",
        as: "timeData",
      });
    }
  }
  Allcode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
