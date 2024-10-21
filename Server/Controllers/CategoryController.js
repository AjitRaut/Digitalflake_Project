const Category = require("../Models/Category");
const Counter = require("../Models/counter");
const mongoose = require("mongoose");
const cloudinary = require("../Config/cloudinary");
const { PassThrough } = require("stream");

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

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

    const uploadResult = await cloudinary.uploader.upload_stream(
      {
        folder: "categories",
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            message: "Error uploading image to Cloudinary",
            error: error.message,
          });
        }

        const counter = await Counter.findOneAndUpdate(
          {},
          { $inc: { categorySeq: 1 } },
          { new: true, upsert: true }
        );
        const newCategoryId = counter.categorySeq;

        const newCategory = new Category({
          id: newCategoryId,
          name,
          image: result.secure_url,
          status: "inactive",
        });

        await newCategory.save();
        res.status(201).json({
          message: "Category added successfully!",
          category: newCategory,
        });
      }
    );

    const bufferStream = new PassThrough();
    bufferStream.end(req.file.buffer);
    bufferStream.pipe(uploadResult);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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
            return res.status(500).json({
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

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryToDelete = await Category.findById(id);

    if (!categoryToDelete) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.findByIdAndDelete(id);

    await Counter.findOneAndUpdate({}, { $inc: { categorySeq: -1 } });

    await Category.updateMany(
      { id: { $gt: categoryToDelete.id } },
      { $inc: { id: -1 } }
    );

    res.json({ message: "Category deleted successfully and sequence updated" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
