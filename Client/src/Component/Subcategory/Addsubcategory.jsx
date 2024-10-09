import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSubcategory = () => {
  const [subcategoryName, setSubcategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        toast.error("Error fetching categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subcatname", subcategoryName);
    formData.append("categoryId", selectedCategory);

    const selectedCategoryObject = categories.find(
      (cat) => cat._id === selectedCategory
    );
    if (selectedCategoryObject) {
      formData.append("categoryName", selectedCategoryObject.name);
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:5000/api/subcategories", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === "Subcategory already exists.") {
          toast.error("Subcategory name already exists.");
        } else {
          toast.error(errorData.message || "Error adding subcategory.");
        }
        return;
      }

      const data = await response.json();
      toast.success("Subcategory added successfully!");
      setSubcategoryName("");
      setImage(null);
      setImageFile(null);
      setSelectedCategory("");
    } catch (error) {
      toast.error("Error adding subcategory. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-8">Add Subcategory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory Name
            </label>
            <input
              type="text"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter subcategory name"
              required
            />
          </div>
          <div>
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
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <div className="flex flex-col items-center">
              <label htmlFor="file-input" className="cursor-pointer">
                <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center hover:border-purple-500 transition-colors">
                  <p className="text-gray-500 text-sm">Upload an image</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Maximum size: 10MB
                  </p>
                </div>
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {image && (
              <div className="mt-4">
                <img
                  src={image}
                  alt="Uploaded"
                  className="w-24 h-24 object-cover rounded border border-gray-300"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-8 space-x-4">
          <Link to="/subcategory">
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

export default AddSubcategory;
