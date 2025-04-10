const express = require("express");
const router = express.Router();
const measurementController = require("../controller/measurementController");

router.post("/", measurementController.createMeasurement);
router.get("/", measurementController.getMeasurements);

module.exports = router;
