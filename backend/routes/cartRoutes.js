const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const verifyToken = require("../middleware/verifyToken");

router.get("", verifyToken, cartController.getCartItems);
router.post("/", verifyToken, cartController.addToCart);
router.delete("/:id", cartController.removeFromCart);
module.exports = router;
