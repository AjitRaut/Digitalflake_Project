const Subcategory = require("../Models/Subcategory");
const Counter = require("../Models/counter");
const mongoose = require("mongoose");
const cloudinary = require("../Config/cloudinary");

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
      return res
        .status(400)
        .json({ message: "File upload failed. Please provide an image." });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ error: "Image upload failed" });
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
          image: result.secure_url,
        });

        await newSubcategory.save();

        res.status(201).json({
          message: "Subcategory added successfully!",
          subcategory: newSubcategory,
        });
      }
    );

    uploadStream.end(req.file.buffer);
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
      subcatname,
      _id: { $ne: subcategoryId },
    });

    if (existingSubcategory) {
      return res
        .status(400)
        .json({ message: "Subcategory name already exists" });
    }

    let updateData = { subcatname, status, categoryName };

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ error: "Image upload failed" });
          }

          updateData.image = result.secure_url;

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
        }
      );

      uploadResult.end(req.file.buffer);
    } else {
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
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategoryToDelete = await Subcategory.findById(id);
    if (!subcategoryToDelete) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    await Subcategory.findByIdAndDelete(id);

    await Counter.findOneAndUpdate({}, { $inc: { subcategorySeq: -1 } });

    await Subcategory.updateMany(
      { id: { $gt: subcategoryToDelete.id } },
      { $inc: { id: -1 } }
    );

    res
      .status(200)
      .json({
        message: "Subcategory deleted successfully and sequence updated",
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete subcategory", message: error.message });
  }
};