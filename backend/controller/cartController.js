const { Cart, Product } = require("../models");

exports.getCartItems = async (req, res) => {
  const cartItems = await Cart.findAll({
    where: { userId: req.params.userId },
    include: [Product],
  });
};

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ error: "userId and productId are required" });
    }

    let cartItem = await Cart.findOne({ where: { userId, productId } });

    if (cartItem) {
      cartItem.quantity += 1; // Increase quantity if item already exists
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity: 1 });
    }

    res.json(cartItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Error adding item to cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Cart.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Error removing item from cart" });
  }
};
