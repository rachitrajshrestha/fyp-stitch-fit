const { where } = require("sequelize");
const { Measurement } = require("../models");

const createMeasurement = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      chest,
      waist,
      hips,
      shoulderWidth,
      sleeveLength,
      inseam,
      neck,
      height,
      legLength,
      thighWidth,
      calvesWidth,
    } = req.body;

    const measurement = await Measurement.create({
      userId,
      chest,
      waist,
      hips,
      shoulderWidth,
      sleeveLength,
      inseam,
      neck,
      height,
      legLength,
      thighWidth,
      calvesWidth,
    });

    return res.status(201).json(measurement);
  } catch (error) {
    console.error("Error creating measurement:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMeasurements = async (req, res) => {
  try {
    const measurements = await Measurement.findAll();
    return res.json(measurements);
  } catch (error) {
    console.error("Error fetching measurements:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const hasMeasurement = async (req, res) => {
  try {
    const userId = req.userId;
    const measurement = await Measurement.findOne({ where: { userId } });
    console.log("user ho", userId);
    console.log("measurement", measurement);
    console.log();
    if (measurement) {
      return res.json({ hasMeasurement: true });
    } else {
      return res.json({ hasMeasurement: false });
    }
  } catch (error) {
    console.error("Error checking measurement:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  createMeasurement,
  getMeasurements,
  hasMeasurement,
};
