const express = require("express");
const multer = require("multer");
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../Controllers/Product");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./uploads";
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), createProduct); // Keep createProduct unchanged
router.get("/", getProducts); // Route to get all products
router.get("/:id", getProduct); // Route to get product by ID
router.put("/:id", upload.single("image"), updateProduct); // Route to update product
router.delete("/:id", deleteProduct); // Keep deleteProduct unchanged

module.exports = router;
