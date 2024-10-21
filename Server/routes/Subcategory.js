const express = require("express");
const upload = require("../Middleware/multer"); 
const subcategoryController = require("../Controllers/SubCategoryController");

const router = express.Router();

router.post("/", upload.single("image"), subcategoryController.addSubcategory); 
router.get("/", subcategoryController.getSubcategories);
router.get("/:id", subcategoryController.getSubCategoryById);
router.put("/:id", upload.single("image"), subcategoryController.updateSubCategory); 
router.delete("/:id", subcategoryController.deleteSubcategory);

module.exports = router;
