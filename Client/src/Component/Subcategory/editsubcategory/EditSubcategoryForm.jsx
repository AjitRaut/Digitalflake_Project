import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUploadSection from "./Imaegeupload"; 

const EditSubcategoryForm = ({ onSubmit, initialData, categories }) => {
  const [subcategoryName, setSubcategoryName] = useState(
    initialData?.subcatname || ""
  );
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState(initialData?.status || "active");
  const [selectedCategory, setSelectedCategory] = useState(
    initialData?.categoryName || ""
  );

  useEffect(() => {
    if (initialData?.image) {
      setImageFile(null);
    }
  }, [initialData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!subcategoryName) {
      toast.error("Subcategory Name is required.");
      return;
    }

    const formData = new FormData();
    formData.append("subcatname", subcategoryName);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("status", status);
    formData.append("categoryName", selectedCategory);
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex-1 pb-24 md:pb-1 bg-white mt-9 px-4 sm:p-6 shadow-lg rounded-lg max-w-5xl mx-auto w-full"
    >
      <h2 className="text-xl font-semibold mb-6 sm:mb-8 md:text-left">
        Edit Subcategory
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
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
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status
          </label>
          <select
            id="status"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <ImageUploadSection initialImage={initialData?.image} onImageUpload={setImageFile} />

      <div className="flex flex-col sm:flex-row justify-end mt-6 md:mt-8">
        <Link to="/app/subcategory" className="w-full sm:w-auto">
          <button
            type="button"
            className="w-full px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-200"
        >
          Update
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default EditSubcategoryForm;
