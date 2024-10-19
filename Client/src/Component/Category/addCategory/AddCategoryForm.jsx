import React, { useState } from "react";
import ImageUpload from "../../../hooks/useImageupload"; // Custom hook for image upload
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategoryForm = ({ onSubmit }) => {
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const { image, handleImageUpload } = ImageUpload(); // Use the custom hook

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!categoryName) {
      toast.error("Category Name is required.");
      return;
    }
    if (!imageFile) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", imageFile);

    toast.success("Category added successfully!");

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="p-4 sm:p-6 md:pb-24 shadow-lg rounded-lg max-w-lg sm:max-w-xl md:max-w-4xl mx-auto"
    >
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 md:mb-8">
        Add Category
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
        {/* Upload Image Here  */}
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
          {/* Uploade Image  is Visible Here */}
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

      {/* cancel & Save Button */}
      <div className="flex justify-end mt-6 sm:mt-8 space-x-3 sm:space-x-4">
        <Link to={"/app/category"}>
          <button
            type="button"
            className="px-4 py-2 sm:px-6 sm:py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="px-4 py-2 sm:px-6 sm:py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800"
        >
          Save
        </button>
      </div>

      <ToastContainer />
    </form>
  );
};

export default AddCategoryForm;
