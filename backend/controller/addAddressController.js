const { Model } = require("sequelize");
const { Address } = require("../models");

const createAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, phone, address, city, zip, paymentMethod } = req.body;

    const newAddress = await Address.create({
      userId,
      name,
      email,
      phone,
      address,
      city,
      zip,
      paymentMethod,
    });

    res.status(201).json(newAddress);
  } catch (error) {
    console.error("Error creating address:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserAddresses = async (req, res) => {
  try {
    const userId = req.userId;

    const addresses = await Address.findAll({ where: { userId } });

    res.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createAddress, getUserAddresses };
