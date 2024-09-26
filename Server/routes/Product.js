const express = require("express");
const router = express.Router();
const { createProduct , getProducts , deleteproduct} = require("../Controllers/Product");

// POST /api/products - Create a new product
router.post("/", createProduct);
router.get("/" , getProducts)
router.delete("/:id" , deleteproduct)

module.exports = router;
