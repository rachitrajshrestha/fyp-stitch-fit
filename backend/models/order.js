"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "userId" });
      Order.belongsTo(models.Payment, { foreignKey: "paymentId" });
      // Order.belongsTo(models.Address, { foreignKey: "addressId" });
      // Order.belongsTo(models.Measurement, { foreignKey: "measurementId" });
      Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
    }
  }

  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      paymentId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      // addressId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "Addresses",
      //     key: "id",
      //   },
      // },
      // measurementId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "Measurements",
      //     key: "id",
      //   },
      // },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
      timestamps: true,
    }
  );

  return Order;
};
