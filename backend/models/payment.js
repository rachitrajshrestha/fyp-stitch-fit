"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Payment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      transaction_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_amount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      transaction_uuid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      product_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      signed_field_names: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      signature: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );

  return Payment;
};
