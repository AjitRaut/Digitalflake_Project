// routes/subcategoryRoutes.js
const express = require("express");
const upload = require("../Middleware/multer"); // Ensure this points to your multer configuration
const subcategoryController = require("../Controllers/SubCategoryController");

// Create an Express router
const router = express.Router();

// Define routes for subcategories
router.post("/", upload.single("image"), subcategoryController.addSubcategory); // Ensure the field name matches
router.get("/", subcategoryController.getSubcategories);
router.get("/:id", subcategoryController.getSubCategoryById);
router.put("/:id", upload.single("image"), subcategoryController.updateSubCategory); // Ensure the field name matches
router.delete("/:id", subcategoryController.deleteSubcategory);

module.exports = router;
