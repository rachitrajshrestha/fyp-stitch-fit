const { Cart, Product, CartItem } = require("../models");

const getCartItems = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const cart = await Cart.findOne({
      where: { userId },
      include: [
        {
          model: CartItem,
          attributes: ["id", "quantity"],
          include: [
            {
              model: Product,
              attributes: ["id", "name", "price", "imageUrl"],
            },
          ],
        },
      ],
    });

    if (!cart) {
      return res.status(200).json([]); // No cart yet
    }

    res.json(cart); // send the whole cart with CartItems and Products
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

    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      cart = await Cart.create({ userId });
    }

    let cartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
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
    const { id } = req.params; // or req.body.id
    if (!id) {
      return res.status(400).json({ error: "Cart item ID is required" });
    }

    await CartItem.destroy({ where: { id } });
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Failed to remove item" });
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
