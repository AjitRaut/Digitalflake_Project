const Category = require("../Models/Category");
const Counter = require("../Models/counter");
const mongoose = require("mongoose");
const cloudinary = require("../Config/cloudinary"); // Import Cloudinary config
const { PassThrough } = require("stream");

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Add Category with Cloudinary Upload
// Add Category with Cloudinary Upload
const addCategory = async (req, res) => {
  try {
    let { name } = req.body;
    name = capitalizeFirstLetter(name.trim());

    const existingCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please provide an image." });
    }

    // Upload image to Cloudinary directly from buffer
    const uploadResult = await cloudinary.uploader.upload_stream(
      {
        folder: "categories",
      },
      async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({
              message: "Error uploading image to Cloudinary",
              error: error.message,
            });
        }

        // Increment the category sequence in the Counter
        const counter = await Counter.findOneAndUpdate(
          {},
          { $inc: { categorySeq: 1 } }, // Increment the categorySeq
          { new: true, upsert: true }
        );
        const newCategoryId = counter.categorySeq; // Get the incremented categorySeq

        const newCategory = new Category({
          id: newCategoryId, // Set the id to newCategoryId
          name,
          image: result.secure_url,
          status: "inactive",
        });

        await newCategory.save();
        res
          .status(201)
          .json({
            message: "Category added successfully!",
            category: newCategory,
          });
      }
    );

    // Create a stream from the buffer
    const bufferStream = new PassThrough();
    bufferStream.end(req.file.buffer);
    bufferStream.pipe(uploadResult);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Category by ID
const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOne({ _id: id });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Category with Cloudinary Upload
const updateCategory = async (req, res) => {
  try {
    const { name, status } = req.body;
    const categoryId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    let updateData = {};

    if (name) {
      const trimmedName = capitalizeFirstLetter(name.trim());
      const existingCategory = await Category.findOne({
        name: trimmedName,
        _id: { $ne: categoryId },
      });
      if (existingCategory) {
        return res
          .status(400)
          .json({ message: "Category name already exists" });
      }
      updateData.name = trimmedName;
    }

    if (status) {
      updateData.status = status;
    }

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload_stream(
        {
          folder: "categories",
        },
        async (error, result) => {
          if (error) {
            return res
              .status(500)
              .json({
                message: "Error uploading image to Cloudinary",
                error: error.message,
              });
          }

          updateData.image = result.secure_url;

          const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { $set: updateData },
            { new: true, runValidators: true }
          );

          if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
          }

          res.status(200).json({
            message: "Category updated successfully!",
            category: updatedCategory,
          });
        }
      );

      const bufferStream = new PassThrough();
      bufferStream.end(req.file.buffer);
      bufferStream.pipe(uploadResult);
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.status(200).json({
        message: "Category updated successfully!",
        category: updatedCategory,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Category
// Delete Category and update sequence
const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryToDelete = await Category.findById(id);

    if (!categoryToDelete) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete the category
    await Category.findByIdAndDelete(id);

    // Decrement the category sequence in the Counter
    await Counter.findOneAndUpdate({}, { $inc: { categorySeq: -1 } });

    // Update the id of categories with a higher sequence number
    await Category.updateMany(
      { id: { $gt: categoryToDelete.id } },
      { $inc: { id: -1 } }
    );

    res.json({ message: "Category deleted successfully and sequence updated" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error: error.message });
  }
};


module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
