import React, { useState, useEffect } from "react";
import ImageUploadSection from "./ImageUploadSection";
import { useNavigate } from "react-router-dom";
import FormSubmitHandler from "./FormSubmithandler"; 
import { ToastContainer } from "react-toastify";

const EditProductForm = ({ initialData, categories, subcategories, onSubmit }) => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState(initialData?.productName || "");
  const [subcategoryName, setSubcategoryName] = useState(initialData?.subcategoryName || "");
  const [categoryName, setCategoryName] = useState(initialData?.categoryName || "");
  const [status, setStatus] = useState(initialData?.status || "active");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (initialData?.image) {
      setImageFile(null);
    }
  }, [initialData]);

  return (
    <div className="bg-white p-4 md:mb-0 rounded-lg shadow-lg max-w-4xl mx-auto mt-4 mb-20">
      <h1 className="text-xl font-semibold mb-4 md:mb-6 text-left">Edit Product</h1>
      <form className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div>
  <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
    Subcategory
  </label>
  <select
    id="subcategory"
    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    value={subcategoryName}
    onChange={(e) => setSubcategoryName(e.target.value)}
    required
  >
    <option value="">Select subcategory</option>
    {subcategories.length > 0 ? (
      subcategories.map((subcat) => (
        <option key={subcat._id} value={subcat.subcatname}>
          {subcat.subcatname}
        </option>
      ))
    ) : (
      <option value="" disabled>
        No subcategories available
      </option>
    )}
  </select>
</div>

<div>
  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
    Category
  </label>
  <select
    id="category"
    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    value={categoryName}
    onChange={(e) => setCategoryName(e.target.value)}
    required
  >
    <option value="">Select category</option>
    {categories.length > 0 ? (
      categories.map((cat) => (
        <option key={cat._id} value={cat.name}>
          {cat.name}
        </option>
      ))
    ) : (
      <option value="" disabled>
        No categories available
      </option>
    )}
  </select>
</div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <ImageUploadSection initialImage={initialData?.image} onImageUpload={setImageFile} />
        </div>

        <FormSubmitHandler 
          productName={productName} 
          subcategoryName={subcategoryName} 
          categoryName={categoryName} 
          status={status} 
          imageFile={imageFile} 
          initialData={initialData} 
          onSubmit={onSubmit} 
          navigate={navigate} 
        />
        <ToastContainer />
      </form>
    </div>
  );
};

export default EditProductForm;
