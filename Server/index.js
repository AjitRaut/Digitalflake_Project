const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
// const authRoutes = require('./routes/authRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
// const subcategoryRoutes = require('./routes/subcategoryRoutes');
// const productRoutes = require('./routes/productRoutes');

// app.use('/api/auth', authRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/subcategories', subcategoryRoutes);
// app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
