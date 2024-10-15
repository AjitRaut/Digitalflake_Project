const Subcategory = require("../Models/Subcategory");
const Counter = require("../Models/counter");
const mongoose = require("mongoose");

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

exports.addSubcategory = async (req, res) => {
  try {
    let { subcatname, categoryName } = req.body;

    subcatname = capitalizeFirstLetter(subcatname.trim());

    const existingSubcategory = await Subcategory.findOne({
      subcatname: { $regex: new RegExp(`^${subcatname}$`, "i") },
    });
    if (existingSubcategory) {
      return res.status(400).json({ message: "Subcategory already exists." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File upload failed. Please provide an image." });
    }

    const counter = await Counter.findOneAndUpdate(
      {},
      { $inc: { subcategorySeq: 1 } },
      { new: true, upsert: true }
    );

    const newSubcategoryId = counter.subcategorySeq;

    const newSubcategory = new Subcategory({
      id: newSubcategoryId,
      subcatname,
      categoryName,
      image: `http://localhost:5000/uploads/${req.file.filename}`,
    });

    await newSubcategory.save();

    res.status(201).json({
      message: "Subcategory added successfully!",
      subcategory: newSubcategory,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create subcategory" });
  }
};

exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
};

exports.getSubCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const subcategory = await Subcategory.findOne({ _id: id });

    return res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    let { subcatname, status, categoryName } = req.body;
    const subcategoryId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
      return res.status(400).json({ message: "Invalid subcategory ID" });
    }

    subcatname = capitalizeFirstLetter(subcatname.trim());

    const existingSubcategory = await Subcategory.findOne({
      subcatname: subcatname,
      _id: { $ne: subcategoryId },
    });

    if (existingSubcategory) {
      return res.status(400).json({ message: "Subcategory name already exists" });
    }

    let updateData = { subcatname, status, categoryName };

    if (req.file) {
      const imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
      updateData.image = imagePath;
    }

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      updateData,
      { new: true }
    );

    if (!updatedSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json({
      message: "Subcategory updated successfully!",
      subcategory: updatedSubcategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubcategory = await Subcategory.findByIdAndDelete(id);
    if (!deletedSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subcategory" });
  }
};
