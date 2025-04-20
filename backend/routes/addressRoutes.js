const express = require("express");
const router = express.Router();
const {
  createAddress,
  getUserAddresses,
} = require("../controller/addAddressController");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, createAddress);
router.get("/", verifyToken, getUserAddresses);

module.exports = router;
