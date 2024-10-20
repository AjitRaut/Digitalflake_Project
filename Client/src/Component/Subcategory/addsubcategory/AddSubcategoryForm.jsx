// AddSubcategoryForm.js
import React, { useState } from "react";
import ImageUpload from "../../../hooks/useImageupload";
import ImageUploadSection from "./ImageUploadSection"; 
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSubcategoryForm = ({ categories, onSubmit }) => {
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const { image, handleImageUpload } = ImageUpload();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!subcategoryName) {
      toast.error("Subcategory name is required.");
      return;
    }
    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }
    if (!imageFile) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("subcatname", subcategoryName);
    formData.append(
      "categoryName",
      categories.find((cat) => cat._id === selectedCategory)?.name
    );
    formData.append("image", imageFile);

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white mt-10 p-4 sm:p-6 shadow-lg rounded-lg max-w-5xl mx-auto w-full flex-1 pb-24 md:pb-6"
    >
      <h2 className="text-xl font-semibold mb-6 sm:mb-8  md:text-left">
        Add Subcategory
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
        <ImageUploadSection
          image={image}
          handleImageUpload={(e) => handleImageUpload(e, setImageFile)} // Pass the function
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-end mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <Link to="/app/subcategory">
          <button
            type="button"
            className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-full text-gray-600"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2 bg-purple-700 text-white rounded-full"
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default AddSubcategoryForm;
