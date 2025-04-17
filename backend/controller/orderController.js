const { Order, OrderItem, CartItem, Product } = require("../models");

const createOrderAfterPayment = async (req, res) => {
  try {
    const userId = req.userId;
    const { paymentId } = req.body;

    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [Product],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.Product.price;
    }, 0);

    const order = await Order.create({
      userId,
      paymentId,
      totalAmount,
      status: "processing",
    });

    for (const item of cartItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        measurementId: item.measurementId || null,
        quantity: item.quantity,
        price: item.Product.price,
      });
    }

    // 5. Optional: Clear cart after order
    await CartItem.destroy({ where: { userId } });

    return res
      .status(201)
      .json({ message: "Order created successfully", orderId: order.id });
  } catch (err) {
    console.error("Order creation failed", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createOrderAfterPayment };
