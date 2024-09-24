const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');
const userRoutes = require('./routes/authroute');
const dotenv = require('dotenv');
const categoryRoutes = require("./routes/Category");
const bodyParser = require('body-parser');
const path = require('path'); // Add this line to import the path module
const subcategoryRoutes = require('./routes/Subcategory');
const productRoutes = require("./routes/Product")

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Connect to MongoDB
connectDB();
// Use user routes
app.use('/api/users', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve uploaded images
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
