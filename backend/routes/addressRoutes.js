const express = require("express");
const router = express.Router();
const {
  createAddress,
  getUserAddresses,
} = require("../controller/addAddressController");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, createAddress); // Save address
router.get("/", verifyToken, getUserAddresses); // Get address for user

module.exports = router;
