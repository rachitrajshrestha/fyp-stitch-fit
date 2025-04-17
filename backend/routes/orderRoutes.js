const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController"); // ✅ Import the whole controller
const verifyToken = require("../middleware/verifyToken");

router.post("/create", verifyToken, orderController.createOrderAfterPayment);

module.exports = router;
