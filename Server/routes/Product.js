const express = require("express");
const upload = require("../Middleware/multer");
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../Controllers/ProductController");

const router = express.Router();


router.post("/", upload.single("image"), createProduct); // Keep createProduct unchanged
router.get("/", getProducts); // Route to get all products
router.get("/:id", getProduct); // Route to get product by ID
router.put("/:id", upload.single("image"), updateProduct); // Route to update product
router.delete("/:id", deleteProduct); // Keep deleteProduct unchanged

module.exports = router;
