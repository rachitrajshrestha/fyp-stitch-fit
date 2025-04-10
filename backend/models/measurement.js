"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Measurement extends Model {
    static associate(models) {
      Measurement.belongsTo(models.User, { foreignKey: "userId" });
      Measurement.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }

  Measurement.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Products", key: "id" },
      },
      length: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      breadth: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      waist: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      arms: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      legs: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Measurement",
    }
  );

  return Measurement;
};
