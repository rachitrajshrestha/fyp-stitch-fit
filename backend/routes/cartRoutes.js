const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

router.get("/:userId", cartController.getCartItems);
router.post("/", cartController.addToCart);
router.delete("/:id", cartController.removeFromCart);

module.exports = router;
