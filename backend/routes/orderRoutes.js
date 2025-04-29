const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const verifyToken = require("../middleware/verifyToken");

router.post(
  "/create-order-after-payment",
  verifyToken,
  orderController.createOrderAfterPayment
);
router.post(
  "/create-cod-order",
  verifyToken,
  orderController.createOrderForCOD
);
router.get("/admin", verifyToken, orderController.getAllOrders);
router.get("/user", verifyToken, orderController.getUserOrders);
router.get("/user/:orderId", verifyToken, orderController.getOrderById);
router.put("/:orderId", verifyToken, orderController.updateOrderStatus);

module.exports = router;
