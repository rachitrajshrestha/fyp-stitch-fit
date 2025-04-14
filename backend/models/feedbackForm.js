"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      // You can associate with User if needed
      Feedback.belongsTo(models.User, {
        foreignKey: "userId",
        allowNull: true,
      });
    }
  }

  Feedback.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Feedback",
    }
  );

  return Feedback;
};
