"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Address.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      zip: DataTypes.STRING,
      paymentMethod: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );

  return Address;
};
