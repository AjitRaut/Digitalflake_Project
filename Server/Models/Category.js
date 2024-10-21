
const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true, 
  },
  name: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'inactive', 
  },
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
