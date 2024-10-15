const Product = require("../Models/Product");

// Helper function to capitalize the first letter
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    let { name, categoryId, subcategoryId } = req.body;

    if (!categoryId || !subcategoryId) {
      return res.status(400).json({ message: "Category ID and Subcategory ID are required." });
    }

    // Check if an image file has been uploaded
    if (!req.file) {
      return res.status(400).json({ message: "File upload failed. Please provide an image." });
    }

    // Capitalize the first letter of the name
    name = capitalizeFirstLetter(name);

    // Check if the product name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product name already exists." });
    }

    // Create a new product instance with image path
    const newProduct = new Product({
      name,
      categoryId,
      subcategoryId,
      image: `http://localhost:5000/uploads/${req.file.filename}`, // Set the image URL
    });

    // Save the product
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product.", error: error.message });
  }
};

// Get product by ID
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

// Update product
const updateProduct = async (req, res) => {
  try {
    let { name, subcategoryId, categoryId, status } = req.body;
    const updateData = { subcategoryId, categoryId, status };

    // Capitalize the first letter of the name if it's being updated
    if (name) {
      name = capitalizeFirstLetter(name);
      // Check if the product name already exists (excluding the current product)
      const existingProduct = await Product.findOne({ name, _id: { $ne: req.params.id } });
      if (existingProduct) {
        return res.status(400).json({ message: "Product name already exists." });
      }
      updateData.name = name;
    }

    // Check if an image file is being uploaded
    if (req.file) {
      // Set the image path if a new file is uploaded
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate('categoryId subcategoryId');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product); // Return the updated product with populated fields
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
