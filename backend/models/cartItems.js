"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define("CartItem", {
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Carts",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
    },
    measurementId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Measurements",
        key: "id",
      },
    },
    paymentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Payments",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, { foreignKey: "cartId" });
    CartItem.belongsTo(models.Product, { foreignKey: "productId" });
    CartItem.belongsTo(models.Measurement, { foreignKey: "measurementId" });
    CartItem.belongsTo(models.Payment, { foreignKey: "paymentId" });
  };

  return CartItem;
};
