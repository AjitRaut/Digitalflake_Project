const express = require('express');
const multer = require('multer');
const path = require('path'); // Add this line to import the path module
const { addCategory , getCategories} = require('../Controllers/CategoryController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '../uploads');
      console.log('Upload path:', uploadPath); // Log the path
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  

const upload = multer({ storage });

router.post('/', upload.single('image'), addCategory);
router.get('/', getCategories); // Ensure 'image' matches your form input name

module.exports = router;
