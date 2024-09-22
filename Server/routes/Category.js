const express = require('express');
const multer = require('multer');
const path = require('path');
const { 
  addCategory, 
  getCategories, 
  getCategoryById, 
  updateCategory 
} = require('../Controllers/CategoryController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), addCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById); // New route to get category by numeric id
router.put('/:id', upload.single('image'), updateCategory);

module.exports = router;