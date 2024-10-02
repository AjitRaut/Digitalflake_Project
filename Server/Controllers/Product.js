const Product = require("../Models/Product");
const multer = require("multer");
const path = require("path");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, categoryId, subcategoryId } = req.body;

    // Ensure categoryId and subcategoryId are provided
    if (!categoryId || !subcategoryId) {
      return res
        .status(400)
        .json({ message: "Category ID and Subcategory ID are required." });
    }

    const newProduct = new Product({
      name,
      categoryId,
      subcategoryId,
    });

    // Save the product
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ message: "Error adding product.", error: error.message });
  }
};

// Get products with optional filters for category and subcategory
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categoryId subcategoryId');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId subcategoryId');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, subcategoryId, categoryId, status } = req.body;
    const updateData = { name, subcategoryId, categoryId, status };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete({ _id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
