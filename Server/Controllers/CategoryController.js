const Category = require("../Models/Category");
const Counter = require("../Models/counter");
const path = require("path");
const mongoose = require("mongoose");

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const addCategory = async (req, res) => {
  try {
    let { name } = req.body;

    // Check if the category already exists
    name = capitalizeFirstLetter(name.trim());

    // Check if the category already exists (case insensitive)
    const existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists." });
    }


    if (!req.file) {
      return res.status(400).json({ message: "File upload failed. Please provide an image." });
    }

    // Adjust the image path to be a valid URL
    const image = `${req.file.path}`;

    // Increment the counter
    const counter = await Counter.findOneAndUpdate(
      {},
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const newCategoryId = counter.seq;

    const newCategory = new Category({
      id: newCategoryId,
      name,
      image: `http://localhost:5000/uploads/${req.file.filename}`,
      status: "inactive",
    });
    await newCategory.save();

    res.status(201).json({ message: "Category added successfully!", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    // const baseUrl = `${req.protocol}://${req.get('host')}`;
    const formattedCategories = categories.map((category, index) => ({
      id: index + 1,
      ...category._doc,
      // image: category.image ? `${baseUrl}${category.image}` : null,
      image: category.image ,
    }));
    res.json(formattedCategories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOne({ _id: id });
    
    return res.status(200).json(category);
   
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, status } = req.body;
    const categoryId = req.params.id;

    // Check for valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Prepare the update data
    let updateData = {};

    // Ensure the name and status are present before updating
    if (name) {
      updateData.name = capitalizeFirstLetter(name.trim()); // Capitalize and trim the name
    }
    if (status) {
      updateData.status = status; // Update status
    }

    // Check if an image file is being uploaded
    if (req.file) {
      // Set the image path if a new file is uploaded
      updateData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    // Perform the update operation
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $set: updateData }, // Use $set to update only the provided fields
      { new: true, runValidators: true } // Return the updated document and validate
    );

    // Check if the category was found and updated
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully!",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndDelete({ _id: id });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
