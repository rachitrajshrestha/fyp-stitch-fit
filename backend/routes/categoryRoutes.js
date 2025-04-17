// const express = require("express");
// const router = express.Router();
// const { Product } = require("../models");

// router.get("/category/:slug", async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const products = await Product.findAll({ where: { category: slug } });
//     res.json(products);
//   } catch (err) {
//     console.error("Error fetching category products:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
