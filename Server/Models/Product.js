const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true, 
  },
  productName: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  subcategoryName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
}, {
  timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
