// routes/subcategoryRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const subcategoryController = require("../Controllers/SubCategoryController");

// Create an Express router
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./uploads";
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Define routes for subcategories
router.post("/", upload.single("image"), subcategoryController.addSubcategory);
router.get("/", subcategoryController.getSubcategories);
router.delete("/:id", subcategoryController.deleteSubcategory);

module.exports = router;
