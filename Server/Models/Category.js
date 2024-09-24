const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subcategory: { // New field for subcategory
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'inactive', // Set default status to 'inactive'
  },
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
