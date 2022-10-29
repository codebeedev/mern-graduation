"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookTour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BookTour.belongsTo(models.Allcode, {
        foreignKey: "statusId",
        targetKey: "keyMap",
        as: "statusData",
      });
      BookTour.belongsTo(models.Allcode, {
        foreignKey: "pay",
        targetKey: "keyMap",
        as: "payData",
      });
      BookTour.belongsTo(models.User, {
        foreignKey: "customerId",
        targetKey: "id",
        as: "customerData",
      });
      BookTour.belongsTo(models.Tour, {
        foreignKey: "tourId",
        targetKey: "id",
        as: "tourData",
      });
    }
  }
  BookTour.init(
    {
      tourId: DataTypes.STRING,
      customerId: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      statusId: DataTypes.STRING,
      startdate: DataTypes.STRING,
      pay: DataTypes.STRING,
      price: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BookTour",
    }
  );
  return BookTour;
};
