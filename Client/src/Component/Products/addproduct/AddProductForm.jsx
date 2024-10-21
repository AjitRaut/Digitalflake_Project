import React from "react";
import ImageUploadSection from "./ImageUploadSection";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AddProductForm = ({productName,setProductName,categories,selectedCategory, setSelectedCategory,subcategories,selectedSubcategory,setSelectedSubcategory,
  imageFile,
  setImageFile,
  onSubmit,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

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

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("categoryName", selectedCategory);
    formData.append("subcategoryName", selectedSubcategory);
    formData.append("image", imageFile);

    onSubmit(formData); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white min-h-[85vh] p-4 md:p-4 pb-24 shadow-lg rounded-lg max-w-5xl mx-auto"
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">
        Add Product
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div>
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
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>
        </div>

        <div>
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
            {subcategories.length > 0 ? (
              subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory.subcatname}>
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
        <div className="col-span-1 md:col-span-2">
          <ImageUploadSection setImageFile={setImageFile} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-end mt-8 space-y-4 md:space-y-0 md:space-x-4 sticky bottom-0 bg-white px-6 md:relative md:px-0">
        <Link to="/app/products" className="w-full md:w-auto">
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
    </form>
  );
};

export default AddProductForm;