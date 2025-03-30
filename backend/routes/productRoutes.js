const express = require("express");
const {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/productController");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
