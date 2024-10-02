// models/Subcategory.js
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
  image: { type: String, required: true },
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
