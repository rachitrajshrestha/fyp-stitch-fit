const express = require("express");
const {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
  searchProducts,
} = require("../controller/productController");

const router = express.Router();
const upload = require("../middleware/upload");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", upload.single("image"), addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
