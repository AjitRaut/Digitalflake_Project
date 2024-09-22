const Category = require('../Models/Category');
const Counter = require('../Models/counter');

const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'File upload failed. Please provide an image.' });
        }
        
        // Adjust the image path to be a valid URL
        const image = `http://localhost:5000/${req.file.path.replace(/\\/g, '/')}`;

        // Increment the counter
        const counter = await Counter.findOneAndUpdate(
            {},
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const newCategoryId = counter.seq;

        const newCategory = new Category({
            id: newCategoryId,
            name,
            image,
            status: 'inactive'
        });
        await newCategory.save();

        res.status(201).json({ message: 'Category added successfully!', category: newCategory });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        const formattedCategories = categories.map((category, index) => ({
            id: index + 1, // Convert index to a simple integer ID
            ...category._doc // Include all other category fields
        }));
        res.json(formattedCategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = { addCategory, getCategories };
