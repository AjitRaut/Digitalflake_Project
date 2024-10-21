const express = require('express');
const upload = require('../Middleware/multer'); 
const { addCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../Controllers/CategoryController');

const router = express.Router();

router.post("/", upload.single("image"), addCategory); 
router.get("/", getCategories);
router.get("/:id", getCategoryById); 
router.put("/:id", upload.single("image"), updateCategory); 
router.delete("/:id", deleteCategory); 

module.exports = router;
