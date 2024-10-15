const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  subcatname: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
}, {
  timestamps: true,
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
