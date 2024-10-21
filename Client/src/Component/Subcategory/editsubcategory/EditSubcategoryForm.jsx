import React, { useState, useEffect } from "react";
import ImageUploadSection from "./Imaegeupload";
import FormSubmitHandler from "./FormSubmitHandler";

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

  return (
    <form className="flex-1 pb-24 md:pb-1 bg-white mt-9 px-4 sm:p-6 shadow-lg rounded-lg max-w-5xl mx-auto w-full">
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
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          >
            <option value="">Select a category</option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No categories available
              </option>
            )}
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
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <ImageUploadSection
        initialImage={initialData?.image}
        onImageUpload={setImageFile}
      />

      <FormSubmitHandler
        subcategoryName={subcategoryName}
        imageFile={imageFile}
        status={status}
        selectedCategory={selectedCategory}
        onSubmit={onSubmit}
        initialData={initialData}
      />
    </form>
  );
};

export default EditSubcategoryForm;