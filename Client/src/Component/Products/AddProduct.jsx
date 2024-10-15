import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories.");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/subcategories");
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        toast.error("Error fetching subcategories.");
      }
    };
    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredSubcategories([]);
      return;
    }

    const filtered = subcategories.filter(
      (subcategory) => subcategory.categoryName === selectedCategory
    );

    setFilteredSubcategories(filtered);
    setSelectedSubcategory("");
  }, [selectedCategory, subcategories]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!productName) {
      toast.error("Product name is required.");
      return;
    }
    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }
    if (!selectedSubcategory) {
      toast.error("Please select a subcategory.");
      return;
    }
    if (!imageFile) {
      toast.error("Please upload an image.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/products");
      const productNames = response.data.map(product => product.productName);

      if (productNames.includes(productName)) {
        toast.error("Product name already exists.");
        return;
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("categoryName", selectedCategory);
      formData.append("subcategoryName", selectedSubcategory);
      formData.append("image", imageFile);

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully!");
      navigate("/app/products");
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
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-white min-h-screen lg:min-h-[85vh] p-4 md:p-6 pb-24 shadow-lg rounded-lg max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">Add Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Subcategory</label>
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              >
                <option value="" disabled>Select a subcategory</option>
                {filteredSubcategories.length > 0 ? (
                  filteredSubcategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory.subcatname}>{subcategory.subcatname}</option>
                  ))
                ) : (
                  <option disabled>No subcategories available for the selected category</option>
                )}
              </select>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
              <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col md:flex-row items-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Uploaded" className="w-24 h-28 object-cover mb-2 md:mb-0 md:mr-4" />
                ) : (
                  <div className="w-24 h-28 bg-gray-200 mb-2 md:mb-0 md:mr-4 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                <div className="text-center flex-1">
                  <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center">
                    <p className="text-gray-500 text-sm">Upload an image</p>
                    <p className="text-gray-400 text-xs mt-1">Maximum size: 10MB</p>
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-end mt-8 space-y-4 md:space-y-0 md:space-x-4 sticky bottom-0 bg-white px-6">
            <Link to="/app/products" className="w-full md:w-auto">
              <button type="button" className="px-6 py-2 border border-gray-300 rounded-full text-gray-600 w-full">
                Cancel
              </button>
            </Link>
            <button type="submit" className="px-6 py-2 bg-purple-700 text-white rounded-full w-full md:w-auto">
              Save
            </button>
          </div>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default AddProduct;
