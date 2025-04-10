"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      // Payment belongs to a User (optional, but common)
      Payment.belongsTo(models.User, { foreignKey: "userId" });

      // Payment can have many CartItems
      Payment.hasMany(models.CartItem, { foreignKey: "paymentId" });
    }
  }

  Payment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // case-sensitive!
          key: "id",
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending", // could be: pending, completed, failed
      },
      paymentMethod: {
        type: DataTypes.STRING, // e.g., 'card', 'paypal', 'cash'
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
