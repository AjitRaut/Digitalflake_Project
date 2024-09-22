const Category = require("../Models/Category");
const Counter = require("../Models/counter");
const path = require('path');
const mongoose = require('mongoose');


const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "File upload failed. Please provide an image." });
    }

    // Adjust the image path to be a valid URL
    const image = `http://localhost:5000/${req.file.path.replace(/\\/g, "/")}`;

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
      image,
      status: "inactive",
    });
    await newCategory.save();

    res
      .status(201)
      .json({ message: "Category added successfully!", category: newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    const formattedCategories = categories.map((category, index) => ({
      id: index + 1, // Convert index to a simple integer ID
      ...category._doc, // Include all other category fields
    }));
    res.json(formattedCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCategoryById = async (req, res) => {
    try {
      const id = req.params.id;
      const category = await Category.findOne({ _id:id });
      console.log("cat id",id);
      return res.status(200).json(category)
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  const updateCategory = async (req, res) => {
    try {
      const { name, status } = req.body;
      const categoryId = req.params.id;
      console.log( categoryId)
  
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
  
      let updateData = { name, status };
  
      if (req.file) {
        const imagePath = path.join('uploads', req.file.filename);
        updateData.image = `http://localhost:5000/${imagePath.replace(/\\/g, "/")}`;
      }
  
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        updateData,
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.json({ message: "Category updated successfully!", category: updatedCategory });
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

module.exports = { 
  addCategory, 
  getCategories, 
  getCategoryById, 
  updateCategory 
};
