const { Measurement } = require("../models");

// Create new measurement
const createMeasurement = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, length, breadth, waist, arms, legs } = req.body;
    const measurement = await Measurement.create({
      userId,
      productId,
      length,
      breadth,
      waist,
      arms,
      legs,
    });

    return res.status(201).json(measurement);
  } catch (error) {
    console.error("Error creating measurement:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all measurements
const getMeasurements = async (req, res) => {
  try {
    const measurements = await Measurement.findAll();
    return res.json(measurements);
  } catch (error) {
    console.error("Error fetching measurements:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createMeasurement,
  getMeasurements,
};
