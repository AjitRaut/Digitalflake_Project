const express = require('express');
const upload = require('../Middleware/multer'); // Adjust for multer middleware setup
const { addCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../Controllers/CategoryController');

const router = express.Router();

router.post("/", upload.single("image"), addCategory); // Add category with image upload
router.get("/", getCategories); // Get all categories
router.get("/:id", getCategoryById); // Get category by ID
router.put("/:id", upload.single("image"), updateCategory); // Update category with image upload
router.delete("/:id", deleteCategory); // Delete category

module.exports = router;
