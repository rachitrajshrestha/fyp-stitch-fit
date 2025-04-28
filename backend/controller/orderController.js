const {
  Payment,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Product,
  Address,
  Measurement,
  User,
} = require("../models");

const createOrderAfterPayment = async (req, res) => {
  try {
    const userId = req.userId;
    const { paymentId } = req.body;

    console.log("Creating order for paymentId:", paymentId);

    if (!paymentId)
      return res.status(400).json({ message: "No payment ID provided" });

    const payment = await Payment.findByPk(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    const existingOrder = await Order.findOne({
      where: { paymentId },
    });

    if (existingOrder) {
      console.log("Order already exists for paymentId:", paymentId);
      return res.status(200).json({
        message: "Order already created",
        orderId: existingOrder.id,
      });
    }

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return res.status(400).json({ message: "No cart found" });

    const cartItems = await CartItem.findAll({
      where: { cartId: cart.id },
      include: [{ model: Product }],
    });
    if (!cartItems.length)
      return res.status(400).json({ message: "Cart is empty" });

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.Product.price,
      0
    );

    const order = await Order.create({
      userId,
      totalAmount: totalAmount,
      paymentId: payment.id,
    });

    console.log(cartItems);

    const orderItemPromises = cartItems.map((item) =>
      OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        price: item.Product.price,
        quantity: item.quantity,
      })
    );

    await Promise.all(orderItemPromises);

    await CartItem.destroy({ where: { cartId: cart.id } });

    res.status(200).json({
      message: "Order created successfully",
      orderId: order.id,
    });
  } catch (err) {
    console.error("Error in createOrderAfterPayment:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          include: [
            {
              model: Address,
              limit: 1,
              order: [["createdAt", "DESC"]],
            },
            {
              model: Measurement,
              limit: 1,
              order: [["createdAt", "DESC"]],
            },
          ],
        },
        {
          model: Payment,
        },
        {
          model: OrderItem,
          include: [{ model: Product }],
          required: false,
        },
      ],
    });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          include: [{ model: Product }],
        },
        { model: Payment },
        // { model: Measurement },
        // { model: Address },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId } = req.params;

    const order = await Order.findOne({
      where: { id: orderId, userId }, // ensure it's this user's order
      include: [
        {
          model: OrderItem,
          include: [{ model: Product }],
        },
        { model: Payment },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["pending", "ongoing", "delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createOrderAfterPayment,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  getOrderById,
};
