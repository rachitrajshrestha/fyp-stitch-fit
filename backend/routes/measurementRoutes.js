const express = require("express");
const router = express.Router();
const measurementController = require("../controller/measurementController");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, measurementController.createMeasurement);
router.get("/", measurementController.getMeasurements);

module.exports = router;
