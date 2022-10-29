"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tours", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      imgTourHTML: {
        type: Sequelize.TEXT("long"),
      },
      imgTourMark: {
        type: Sequelize.TEXT("long"),
      },
      name: {
        type: Sequelize.STRING,
      },
      startAddress: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      timeId: {
        type: Sequelize.STRING,
      },
      addressId: {
        type: Sequelize.STRING,
      },
      placeId: {
        type: Sequelize.STRING,
      },
      domainId: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tours");
  },
};
