"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Measurements", "length");
    await queryInterface.removeColumn("Measurements", "breadth");
    await queryInterface.removeColumn("Measurements", "waist");
    await queryInterface.removeColumn("Measurements", "arms");
    await queryInterface.removeColumn("Measurements", "legs");

    await queryInterface.addColumn("Measurements", "chest", Sequelize.FLOAT);
    await queryInterface.addColumn("Measurements", "waist", Sequelize.FLOAT); // same name, re-added differently
    await queryInterface.addColumn("Measurements", "hips", Sequelize.FLOAT);
    await queryInterface.addColumn(
      "Measurements",
      "shoulderWidth",
      Sequelize.FLOAT
    );
    await queryInterface.addColumn(
      "Measurements",
      "sleeveLength",
      Sequelize.FLOAT
    );
    await queryInterface.addColumn("Measurements", "inseam", Sequelize.FLOAT);
    await queryInterface.addColumn("Measurements", "neck", Sequelize.FLOAT);
    await queryInterface.addColumn("Measurements", "height", Sequelize.FLOAT);
    await queryInterface.addColumn(
      "Measurements",
      "legLength",
      Sequelize.FLOAT
    );
    await queryInterface.addColumn(
      "Measurements",
      "thighWidth",
      Sequelize.FLOAT
    );
    await queryInterface.addColumn(
      "Measurements",
      "calvesWidth",
      Sequelize.FLOAT
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Measurements", "chest");
    await queryInterface.removeColumn("Measurements", "waist");
    await queryInterface.removeColumn("Measurements", "hips");
    await queryInterface.removeColumn("Measurements", "shoulderWidth");
    await queryInterface.removeColumn("Measurements", "sleeveLength");
    await queryInterface.removeColumn("Measurements", "inseam");
    await queryInterface.removeColumn("Measurements", "neck");
    await queryInterface.removeColumn("Measurements", "height");
    await queryInterface.removeColumn("Measurements", "legLength");
    await queryInterface.removeColumn("Measurements", "thighWidth");
    await queryInterface.removeColumn("Measurements", "calvesWidth");

    await queryInterface.addColumn("Measurements", "length", Sequelize.FLOAT);
    await queryInterface.addColumn("Measurements", "breadth", Sequelize.FLOAT);
    await queryInterface.addColumn("Measurements", "waist", Sequelize.FLOAT);
    await queryInterface.addColumn("Measurements", "arms", Sequelize.FLOAT);
    await queryInterface.addColumn("Measurements", "legs", Sequelize.FLOAT);
  },
};
