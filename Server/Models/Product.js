const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Reference to the Category model
    required:false,
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory", // Reference to the Subcategory model
    required: false,
  },
  image: {
    type: String,
    required: false, // Optional if the image is taken from the category
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
