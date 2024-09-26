const Product = require("../Models/Product");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, categoryId, subcategoryId } = req.body;

    // Log the incoming data for debugging
    console.log("Request Body:", req.body);

    // Ensure categoryId and subcategoryId are provided
    if (!categoryId || !subcategoryId) {
      return res.status(400).json({ message: "Category ID and Subcategory ID are required." });
    }

    const newProduct = new Product({
      name,
      categoryId,
      subcategoryId,
    });

    // Save the product
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product.", error: error.message });
  }
};

// Get products with optional filters for category and subcategory
const getProducts = async (req, res) => {
  console.log("getProducts endpoint hit")
  try {
    const { categoryId, subcategoryId } = req.query;
    
    console.log("Received query parameters:", req.query);

    const filter = {};
    if (categoryId) {
      filter.categoryId = categoryId;
    }
    if (subcategoryId) {
      filter.subcategoryId = subcategoryId;
    }

    console.log("Constructed filter:", filter);

    const products = await Product.find(filter)
      .populate('categoryId')
      .populate('subcategoryId');

    console.log("Fetched products:", products);

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
