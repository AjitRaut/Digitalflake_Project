const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  subcatname: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  categoryName: {
    type: String,
    required: false, // Make this required if you want to enforce it
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // Restricting to specific values
    default: "active", // Default value
  },
}, {
  timestamps: true, // Automatically create createdAt and updatedAt fields
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
