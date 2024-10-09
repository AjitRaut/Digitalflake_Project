import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories.");
      }
    };
    fetchCategories();
  }, []);

  // Fetch all subcategories when component mounts
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/subcategories"
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        toast.error("Error fetching subcategories.");
      }
    };
    fetchSubcategories();
  }, []);

  // Filter subcategories based on selected category
  useEffect(() => {
    if (!selectedCategory) {
      setFilteredSubcategories([]);
      return;
    }

    const filtered = subcategories.filter(
      (subcategory) =>
        subcategory.category && subcategory.category._id === selectedCategory
    );

    setFilteredSubcategories(filtered);
    setSelectedSubcategory(""); // Reset subcategory when category changes
  }, [selectedCategory, subcategories]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image (JPEG, PNG, or GIF).");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB. Please upload a smaller image.");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: productName,
      categoryId: selectedCategory,
      subcategoryId: selectedSubcategory,
      image: imageFile, // This will be sent as FormData
    };

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("categoryId", selectedCategory);
    formData.append("subcategoryId", selectedSubcategory);
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Product added successfully!");
      setProductName("");
      setSelectedCategory("");
      setSelectedSubcategory("");
      setImageFile(null);
      setImagePreview("");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-8 text-center">Add Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subcategory
            </label>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            >
              <option value="" disabled>
                Select a subcategory
              </option>
              {filteredSubcategories.length > 0 ? (
                filteredSubcategories.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.subcatname}
                  </option>
                ))
              ) : (
                <option disabled>
                  No subcategories available for the selected category
                </option>
              )}
            </select>
          </div>
        </div>
        <div className="col-span-2 mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <div className="flex flex-col items-center">
            <label htmlFor="file-input" className="cursor-pointer">
              <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center hover:border-purple-500 transition-colors">
                <p className="text-gray-500 text-sm">Upload an image</p>
                <p className="text-gray-400 text-xs mt-1">Maximum size: 10MB</p>
              </div>
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleImageUpload}
              className="hidden"
              required
            />
          </div>
          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <img
                src={imagePreview}
                alt="Uploaded"
                className="w-24 h-24 object-cover rounded border border-gray-300"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-center md:justify-end mt-8 space-y-4 md:space-y-0 md:space-x-4">
          <Link to="/products">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-full text-gray-600 w-full md:w-auto"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-purple-700 text-white rounded-full w-full md:w-auto"
          >
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default AddProduct;
