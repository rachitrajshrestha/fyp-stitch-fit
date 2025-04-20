const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController"); // ✅ Import the whole controller
const verifyToken = require("../middleware/verifyToken");

router.post(
  "/create-order-after-payment",
  verifyToken,
  orderController.createOrderAfterPayment
);
router.get("/admin", verifyToken, orderController.getAllOrders);
router.get("/user", verifyToken, orderController.getUserOrders);
router.put("/:orderId", verifyToken, orderController.updateOrderStatus);

module.exports = router;
