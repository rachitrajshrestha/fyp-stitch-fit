// migration: alter-payments-table.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove columns not in new schema
    await queryInterface.removeColumn("Payments", "provider");
    await queryInterface.removeColumn("Payments", "amount");
    await queryInterface.removeColumn("Payments", "userId");
    await queryInterface.removeColumn("Payments", "orderId");

    // Add new columns
    await queryInterface.addColumn("Payments", "totalAmount", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Payments", "transactionUUID", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Payments", "productCode", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Payments", "signature", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Add back removed columns
    await queryInterface.addColumn("Payments", "provider", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Payments", "amount", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Payments", "userId", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("Payments", "orderId", {
      type: Sequelize.INTEGER,
    });

    // Remove newly added columns
    await queryInterface.removeColumn("Payments", "totalAmount");
    await queryInterface.removeColumn("Payments", "transactionUUID");
    await queryInterface.removeColumn("Payments", "productCode");
    await queryInterface.removeColumn("Payments", "signature");
  },
};
