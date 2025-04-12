const { Cart, Product, CartItem } = require("../models");

const getCartItems = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "imageUrl"],
        },
      ],
    });

    // console.log("User ID:", userId);
    res.json(cartItems);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error fetching cart items", details: error.message });
  }
};

// const testApi = async (req, res) => {
//   try {
//     const cartItems = "rachit raj";
//     // res.json(cartItems);
//     return cartItems;
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching cart items" });
//   }
// };
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    // 1. Find or create a cart for the user
    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      cart = await Cart.create({ userId });
    }

    // 2. Check if the product is already in the cart
    let cartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (cartItem) {
      // 3. If it exists, increase quantity
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      // 4. If not, create new CartItem
      cartItem = await CartItem.create({
        cartId: cart.id,
        productId,
        quantity: 1,
      });
    }

    res.json(cartItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res
      .status(500)
      .json({ error: "Error adding item to cart", details: error.message });
  }
};

const removeFromCart = async (req, res) => {
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

// class CartController{
//   static async getCartItems(req, res) {
//     try {

//     } catch (error) {

//     }
//   }
// }

module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
};
