const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const userRoutes = require("./routes/authroute");
const dotenv = require("dotenv");
const categoryRoutes = require("./routes/Category");
const bodyParser = require("body-parser");
const subcategoryRoutes = require("./routes/Subcategory");
const productRoutes = require("./routes/Product");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Use user routes
app.use("/api/users", userRoutes);

// Use category, subcategory, and product routes
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/products", productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
