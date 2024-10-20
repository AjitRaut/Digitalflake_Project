import React, { useState, useEffect } from "react";
import ImageUpload from "../../../hooks/useImageupload";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCategoryForm = ({ onSubmit, initialData, existingCategories }) => {
  const [categoryName, setCategoryName] = useState(initialData?.name || "");
  const [imageFile, setImageFile] = useState(null);
  const { image, handleImageUpload } = ImageUpload(initialData?.image || ""); // Initialize with existing image
  const [status, setStatus] = useState(initialData?.status || "active"); // Initialize status

  useEffect(() => {
    if (initialData?.image) {
      setImageFile(null);
    }
  }, [initialData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!categoryName) {
      toast.error("Category Name is required.");
      return;
    }

    const categoryExists = existingCategories.some(
      (category) =>
        category.name.toLowerCase() === categoryName.toLowerCase() &&
        category.name !== initialData.name
    );

    if (categoryExists) {
      toast.error("Category already exists.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    if (imageFile) {
      formData.append("image", imageFile); 
    }
    formData.append("status", status);
    onSubmit(formData);
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      className="p-4 sm:p-6 md:pb-1 shadow-lg rounded-lg max-w-lg sm:max-w-xl md:max-w-4xl mx-auto w-full pb-24" // Added pb-24 for bottom padding
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 md:mb-8">
        Edit Category
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md"
            placeholder="Enter category name"
          />
        </div>
        <div className="col-span-1 flex flex-col items-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <label htmlFor="file-input" className="cursor-pointer">
            <div className="w-40 h-40 sm:w-48 sm:h-48 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center hover:border-purple-500 transition-colors">
              <p className="text-gray-500 text-sm">Upload an image</p>
              <p className="text-gray-400 text-xs mt-1">Maximum size: 10MB</p>
            </div>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setImageFile)}
            className="hidden"
          />
          {initialData?.image && !image && (
            <div className="mt-4">
              <img
                src={initialData.image} // Use initialData.image to display existing image
                alt="Existing"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded border border-gray-300"
              />
            </div>
          )}
          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="Uploaded"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded border border-gray-300"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row justify-end mt-6 sm:mt-8 space-y-3 sm:space-y-0 sm:space-x-4">
        <Link to={"/app/category"}>
          <button
            type="button"
            className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800"
        >
          Save
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};
export default EditCategoryForm;