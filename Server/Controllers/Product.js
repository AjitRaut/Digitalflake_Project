const Product = require("../Models/Product");

// Helper function to capitalize the first letter
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    let { productName, categoryName, subcategoryName } = req.body;

    if (!categoryName || !subcategoryName) {
      return res.status(400).json({ message: "Category Name and Subcategory Name are required." });
    }

    // Check if an image file has been uploaded
    if (!req.file) {
      return res.status(400).json({ message: "File upload failed. Please provide an image." });
    }

    // Capitalize the first letter of the product name
    productName = capitalizeFirstLetter(productName);

    // Check if the product name already exists
    const existingProduct = await Product.findOne({ productName });
    if (existingProduct) {
      return res.status(400).json({ message: "Product name already exists." });
    }

    // Create a new product instance with image path
    const newProduct = new Product({
      productName,
      categoryName,
      subcategoryName,
      image: `http://localhost:5000/uploads/${req.file.filename}`,
    });

    // Save the product
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product.", error: error.message });
  }
};

// Get product by ID
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
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
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    let { productName, subcategoryName, categoryName, status } = req.body;
    const updateData = { subcategoryName, categoryName, status };

    // Capitalize the first letter of the product name if it's being updated
    if (productName) {
      productName = capitalizeFirstLetter(productName);
      const existingProduct = await Product.findOne({ productName, _id: { $ne: req.params.id } });
      if (existingProduct) {
        return res.status(400).json({ message: "Product name already exists." });
      }
      updateData.productName = productName;
    }

    if (req.file) {
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete({ _id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
