import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const FormSubmitHandler = ({
  subcategoryName,
  imageFile,
  status,
  selectedCategory,
  onSubmit,
  initialData,
}) => {
  const checkSubcategoryExists = async (name) => {
    try {
      const response = await axios.get("https://digitalflake-project.onrender.com/api/subcategories");
      const subcategoryNames = response.data
        .filter(subcat => subcat._id !== initialData._id) 
        .map(subcat => subcat.subcatname.toLowerCase());

      return subcategoryNames.includes(name.toLowerCase());
    } catch (error) {
      toast.error("Failed to check subcategory names. Please try again.");
      return false;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!subcategoryName) {
      toast.error("Subcategory Name is required.");
      return;
    }

    const exists = await checkSubcategoryExists(subcategoryName);
    if (exists) {
      toast.error("Subcategory name already exists.");
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
        onClick={handleFormSubmit}
        className="mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-200"
      >
        Update
      </button>
      <ToastContainer />
    </div>
  );
};

export default FormSubmitHandler;