const Product = require("../Models/Product");
const Counter = require("../Models/counter");
const cloudinary = require("../Config/cloudinary");
const mongoose = require("mongoose");

// Helper function to capitalize the first letter
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    let { productName, categoryName, subcategoryName } = req.body;

    productName = capitalizeFirstLetter(productName.trim());

    if (!categoryName || !subcategoryName) {
      return res.status(400).json({ message: "Category Name and Subcategory Name are required." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File upload failed. Please provide an image." });
    }

    // Check if the product name already exists
    const existingProduct = await Product.findOne({
      productName: { $regex: new RegExp(`^${productName}$`, "i") },
    });
    if (existingProduct) {
      return res.status(400).json({ message: "Product name already exists." });
    }

    // Use Cloudinary to upload the image
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ error: "Image upload failed" });
        }

        // Counter logic
        const counter = await Counter.findOneAndUpdate(
          {},
          { $inc: { productSeq: 1 } },
          { new: true, upsert: true }
        );

        const newProductId = counter.productSeq;

        // Create new product with the Cloudinary image URL
        const newProduct = new Product({
          id: newProductId,
          productName,
          categoryName,
          subcategoryName,
          image: result.secure_url, // Use the URL from Cloudinary
        });

        await newProduct.save();

        res.status(201).json({
          message: "Product added successfully!",
          product: newProduct,
        });
      }
    );

    // End the upload stream with the file buffer
    uploadStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

// Get product by ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    let { productName, categoryName, subcategoryName, status } = req.body;
    const productId = req.params.id;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    productName = capitalizeFirstLetter(productName.trim());

    // Check for existing product name conflict
    const existingProduct = await Product.findOne({
      productName,
      _id: { $ne: productId },
    });

    if (existingProduct) {
      return res.status(400).json({ message: "Product name already exists" });
    }

    let updateData = { productName, categoryName, subcategoryName, status };

    // Handle image upload if a new file is provided
    if (req.file) {
      // Upload new image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ error: "Image upload failed" });
          }

          updateData.image = result.secure_url; // Set the image URL from Cloudinary

          // Perform the update after the image is uploaded
          const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

          if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
          }

          res.json({
            message: "Product updated successfully!",
            product: updatedProduct,
          });
        }
      );

      // End the upload stream with the file buffer
      uploadResult.end(req.file.buffer);
    } else {
      // If no new image is provided, simply update the other fields
      const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({
        message: "Product updated successfully!",
        product: updatedProduct,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const productToDelete = await Product.findById(productId);
    if (!productToDelete) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    // Decrement the product sequence in the Counter
    await Counter.findOneAndUpdate({}, { $inc: { productSeq: -1 } });

    // Update the IDs of products with a higher sequence number
    await Product.updateMany(
      { id: { $gt: productToDelete.id } },
      { $inc: { id: -1 } }
    );

    res.status(200).json({ message: "Product deleted successfully and sequence updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

