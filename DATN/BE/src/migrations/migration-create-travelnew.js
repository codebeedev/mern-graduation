"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Travelnews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      motaHTML: {
        type: Sequelize.TEXT("long"),
      },
      motaMark: {
        type: Sequelize.TEXT("long"),
      },
      anhHTML: {
        type: Sequelize.TEXT("long"),
      },
      anhMark: {
        type: Sequelize.TEXT("long"),
      },
      thongtinHTML: {
        type: Sequelize.TEXT("long"),
      },
      thongtinMark: {
        type: Sequelize.TEXT("long"),
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
    await queryInterface.dropTable("Travelnews");
  },
};
