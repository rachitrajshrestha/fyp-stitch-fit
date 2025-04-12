"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Measurements", "productId");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Measurements", "productId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Products", key: "id" },
      onDelete: "CASCADE",
    });
  },
};
