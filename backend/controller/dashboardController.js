const {
  User,
  Product,
  Feedback,
  Order,
  OrderItem,
  Sequelize,
} = require("../models");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalProducts = await Product.count();
    const totalFeedbacks = await Feedback.count();
    const totalOrders = await Order.count();

    // Top sellers by total quantity sold
    const topSellers = await OrderItem.findAll({
      attributes: [
        "productId",
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalSold"],
      ],
      include: [{ model: Product, attributes: ["name", "price", "imageUrl"] }],
      group: ["productId", "Product.id"],
      order: [[Sequelize.literal("totalSold"), "DESC"]],
      limit: 5,
    });

    // Most bought products by total quantity sold (all products)
    const mostBoughtProducts = await OrderItem.findAll({
      attributes: [
        "productId",
        [Sequelize.fn("SUM", Sequelize.col("quantity")), "totalSold"],
      ],
      include: [{ model: Product, attributes: ["name"] }],
      group: ["productId", "Product.id"],
      order: [[Sequelize.literal("totalSold"), "DESC"]],
      limit: 10, // Adjust the limit based on your requirement
    });

    res.status(200).json({
      totalUsers,
      totalProducts,
      totalFeedbacks,
      totalOrders,
      topSellers,
      mostBoughtProducts: mostBoughtProducts.map((item) => ({
        name: item.Product.name,
        totalSold: item.getDataValue("totalSold"),
      })),
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getDashboardStats };
