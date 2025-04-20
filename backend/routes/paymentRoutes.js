const express = require("express");
const router = express.Router();
const paymentController = require("../controller/paymentController");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, paymentController.savePayment);

module.exports = router;
