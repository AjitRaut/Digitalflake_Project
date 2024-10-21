// FormSubmitHandler.js
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FormSubmitHandler = ({
  productName,
  subcategoryName,
  categoryName,
  status,
  imageFile,
  initialData,
  onSubmit,
  navigate,
}) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!productName) {
      toast.error("Product name is required.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/products");
      const productNames = response.data
        .filter((product) => product._id !== initialData._id)
        .map((product) => product.productName.toLowerCase());

      if (productNames.includes(productName.toLowerCase())) {
        toast.error("Product name already exists.");
        return;
      }
    } catch (error) {
      console.error("Error fetching product names:", error);
      toast.error("Failed to check product names. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("subcategoryName", subcategoryName);
    formData.append("categoryName", categoryName);
    formData.append("status", status);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col md:flex-row justify-end mt-6 md:mt-8 space-y-2 md:space-y-0 md:space-x-4">
      <button
        type="button"
        onClick={() => navigate("/app/products")}
        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleFormSubmit}
        className="w-full md:w-auto ml-0 md:ml-4 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
      >
        Update
      </button>
    </div>
  );
};

export default FormSubmitHandler;