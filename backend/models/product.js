"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Cart, {
        through: models.CartItem,
        foreignKey: "productId",
        otherKey: "cartId",
      });

      Product.hasMany(models.CartItem, { foreignKey: "productId" });
      Product.hasMany(models.OrderItem, { foreignKey: "orderId" });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING, // Store image URL
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};
