"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Measurement extends Model {
    static associate(models) {
      Measurement.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Measurement.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chest: DataTypes.FLOAT,
      waist: DataTypes.FLOAT,
      hips: DataTypes.FLOAT,
      shoulderWidth: DataTypes.FLOAT,
      sleeveLength: DataTypes.FLOAT,
      inseam: DataTypes.FLOAT,
      neck: DataTypes.FLOAT,
      height: DataTypes.FLOAT,
      legLength: DataTypes.FLOAT,
      thighWidth: DataTypes.FLOAT,
      calvesWidth: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Measurement",
    }
  );

  return Measurement;
};
