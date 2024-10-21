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


router.post("/", upload.single("image"), createProduct); 
router.get("/", getProducts); 
router.get("/:id", getProduct); 
router.put("/:id", upload.single("image"), updateProduct); 
router.delete("/:id", deleteProduct); 

module.exports = router;
