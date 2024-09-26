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

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log(categories);
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
        setSubcategories(response.data); // Set fetched subcategories to state
        console.log(subcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        toast.error("Error fetching subcategories.");
      }
    };
    fetchSubcategories();
  }, []);

  // Filter subcategories based on selected category
  // Filter subcategories based on selected category
  // Filter subcategories based on selected category
  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
    console.log("Subcategories:", subcategories);

    if (!selectedCategory) {
      setFilteredSubcategories([]);
      return;
    }

    const filtered = subcategories.filter(
      (subcategory) =>
        subcategory.category && subcategory.category._id === selectedCategory
    );

    console.log("Filtered Subcategories:", filtered);

    setFilteredSubcategories(filtered);
    setSelectedSubcategory(""); // Reset subcategory when category changes
  }, [selectedCategory, subcategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: productName,
      categoryId: selectedCategory,
      subcategoryId: selectedSubcategory,
    };

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      toast.success("Product added successfully!");
      setProductName("");
      setSelectedCategory("");
      setSelectedSubcategory("");
    } catch (error) {
      toast.error("Error adding product. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-8">Add Product</h2>
        <div className="grid grid-cols-2 gap-8">
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
        <div className="flex justify-end mt-8 space-x-4">
          <Link to="/products">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-full text-gray-600"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-purple-700 text-white rounded-full"
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
