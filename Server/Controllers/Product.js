const Product = require("../Models/Product");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, categoryId, subcategoryId } = req.body;

    const newProduct = new Product({
      name,
      categoryId,
      subcategoryId,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product.", error: error.message });
  }
};

// Get products with optional filters for category and subcategory
const getProducts = async (req, res) => {
  try {
    const { categoryId, subcategoryId } = req.query; // Get query parameters

    // Build the filter object
    const filter = {};
    if (categoryId) filter.categoryId = categoryId;
    if (subcategoryId) filter.subcategoryId = subcategoryId;

    // Fetch products based on filter
    const products = await Product.find(filter)
      .populate('categoryId')  // Populate category details if needed
      .populate('subcategoryId'); // Populate subcategory details if needed

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products.", error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
};
