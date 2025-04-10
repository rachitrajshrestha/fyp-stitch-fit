const { Measurement } = require("../models");

// Create new measurement
exports.createMeasurement = async (req, res) => {
  try {
    const { userId, productId, length, breadth, waist, arms, legs } = req.body;
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
exports.getMeasurements = async (req, res) => {
  try {
    const measurements = await Measurement.findAll();
    return res.json(measurements);
  } catch (error) {
    console.error("Error fetching measurements:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
