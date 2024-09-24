// controllers/subcategoryController.js
const Subcategory = require('../Models/Subcategory');
const path = require('path');

// Controller for adding a new subcategory
exports.addSubcategory = async (req, res) => {
  try {
    const { subcatname, categoryId } = req.body; // Update here

    // Create a new subcategory object
    const newSubcategory = new Subcategory({
      subcatname, // Update here
      category: categoryId, // Link the subcategory to a category
      image: req.file ? req.file.path : null, // Save the image file path
    });

    // Save the subcategory in the database
    await newSubcategory.save();

    res.status(201).json(newSubcategory);
  } catch (error) {
    console.error('Error creating subcategory:', error);
    res.status(500).json({ error: 'Failed to create subcategory' });
  }
};

// Controller for fetching all subcategories
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category', 'name'); // Populate category details
    res.status(200).json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
};

// Controller for deleting a subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the subcategory
    await Subcategory.findByIdAndDelete(id);

    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    res.status(500).json({ error: 'Failed to delete subcategory' });
  }
};
