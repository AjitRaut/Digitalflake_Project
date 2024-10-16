const Subcategory = require("../Models/Subcategory");
const Counter = require("../Models/counter");
const mongoose = require("mongoose");
const cloudinary = require("../Config/cloudinary")

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

exports.addSubcategory = async (req, res) => {
  try {
    let { subcatname, categoryName } = req.body;

    subcatname = capitalizeFirstLetter(subcatname.trim());

    // Check for existing subcategory
    const existingSubcategory = await Subcategory.findOne({
      subcatname: { $regex: new RegExp(`^${subcatname}$`, "i") },
    });
    if (existingSubcategory) {
      return res.status(400).json({ message: "Subcategory already exists." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File upload failed. Please provide an image." });
    }

    // Use cloudinary's upload stream method to upload the image
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ error: "Image upload failed" });
        }
        
        // Counter logic
        const counter = await Counter.findOneAndUpdate(
          {},
          { $inc: { subcategorySeq: 1 } },
          { new: true, upsert: true }
        );

        const newSubcategoryId = counter.subcategorySeq;

        // Create new subcategory with the Cloudinary image URL
        const newSubcategory = new Subcategory({
          id: newSubcategoryId,
          subcatname,
          categoryName,
          image: result.secure_url, // Use the URL from Cloudinary
        });

        await newSubcategory.save();

        res.status(201).json({
          message: "Subcategory added successfully!",
          subcategory: newSubcategory,
        });
      }
    );

    // End the upload stream with the file buffer
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

    // Validate subcategory ID
    if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
      return res.status(400).json({ message: "Invalid subcategory ID" });
    }

    subcatname = capitalizeFirstLetter(subcatname.trim());

    // Check for existing subcategory name conflict
    const existingSubcategory = await Subcategory.findOne({
      subcatname,
      _id: { $ne: subcategoryId },
    });

    if (existingSubcategory) {
      return res.status(400).json({ message: "Subcategory name already exists" });
    }

    let updateData = { subcatname, status, categoryName };

    // Handle image upload if a new file is provided
    if (req.file) {
      
      // Upload new image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ error: "Image upload failed" });
          }
          
          updateData.image = result.secure_url; // Set the image URL from Cloudinary

          // Perform the update after the image is uploaded
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

      // End the upload stream with the file buffer
      uploadResult.end(req.file.buffer);
    } else {
      // If no new image is provided, simply update the other fields
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

    const deletedSubcategory = await Subcategory.findByIdAndDelete(id);
    if (!deletedSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subcategory" });
  }
};