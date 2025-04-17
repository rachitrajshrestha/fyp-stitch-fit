"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Payments");

    const addIfNotExists = async (column, definition) => {
      if (!table[column]) {
        await queryInterface.addColumn("Payments", column, definition);
      }
    };

    // Add missing fields
    await addIfNotExists("transactionCode", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await addIfNotExists("status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "pending",
    });

    await addIfNotExists("amount", {
      type: Sequelize.FLOAT,
      allowNull: false,
    });

    await addIfNotExists("orderId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Orders",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Payments", "transactionCode");
    await queryInterface.removeColumn("Payments", "status");
    await queryInterface.removeColumn("Payments", "amount");
    await queryInterface.removeColumn("Payments", "orderId");
  },
};
