const Subcategory = require('../Models/Subcategory');
const Counter = require('../Models/counter'); // Assuming you have a counter model
const path = require('path');

// Utility function to capitalize the first letter
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Controller for adding a new subcategory
exports.addSubcategory = async (req, res) =>{ try {
  let { subcatname, categoryId } = req.body;

  subcatname = capitalizeFirstLetter(subcatname.trim());

  const existingSubcategory = await Subcategory.findOne({ subcatname: { $regex: new RegExp(`^${subcatname}$`, 'i') } });
  if (existingSubcategory) {
    return res.status(400).json({ message: "Subcategory already exists." });
  }

  if (!req.file) {
    return res.status(400).json({ message: "File upload failed. Please provide an image." });
  }

  // Increment the counter for subcategories
  const counter = await Counter.findOneAndUpdate(
    {},
    { $inc: { subcategorySeq: 1 } },
    { new: true, upsert: true }
  );

  const newSubcategoryId = counter.subcategorySeq;
  console.log(newSubcategoryId)

  const newSubcategory = new Subcategory({
    id: newSubcategoryId,
    subcatname,
    category: categoryId,
    image: `http://localhost:5000/uploads/${req.file.filename}`,
  });

  await newSubcategory.save();

  res.status(201).json({ message: "Subcategory added successfully!", subcategory: newSubcategory });
} catch (error) {
  console.error('Error creating subcategory:', error);
  res.status(500).json({ error: 'Failed to create subcategory' });
}
};

// Controller for fetching all subcategories
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category', 'name');
    res.status(200).json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
};

exports.getSubCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const subcategory = await Subcategory.findOne({ _id: id });
    console.log("subcatid", id);
    return res.status(200).json(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateSubCategory = async (req, res) => {
  try {
    const { name, status } = req.body;
    const SubcategoryId = req.params.id;
    console.log(SubcategoryId);

    if (!mongoose.Types.ObjectId.isValid(SubcategoryId)) {
      return res.status(400).json({ message: "Invalid subcategory ID" });
    }

    let updateData = { subcatname: name, status };

    if (req.file) {
      const imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
      updateData.image = imagePath;
    }

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      SubcategoryId,
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
    console.error("Error updating subcategory:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller for deleting a subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the subcategory
    const deletedSubcategory = await Subcategory.findByIdAndDelete(id);
    if (!deletedSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    res.status(500).json({ error: 'Failed to delete subcategory' });
  }
};
