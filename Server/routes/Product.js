const express = require("express");
const router = express.Router();
const { createProduct , getProducts } = require("../Controllers/Product");

// POST /api/products - Create a new product
router.post("/", createProduct);
router.post("/" , getProducts)

module.exports = router;
