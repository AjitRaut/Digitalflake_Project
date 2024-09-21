import React, { useState } from "react";

const EditCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Edit Category</h2>

      <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0 md:space-x-8">
        {/* Category Name with Label Inside Input Border */}
        <div className="relative w-full md:w-1/4">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder=" "
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-gray-600 text-sm">
            Category Name
          </label>
        </div>

        {/* Image Upload Section */}
        <div className="flex space-x-4">
          {image && (
            <div className="border border-gray-300 w-24 h-24 flex items-center justify-center">
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-col items-center">
            <label htmlFor="file-input" className="cursor-pointer">
              <div className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center rounded hover:border-purple-500 transition-colors">
                {!image ? (
                  <div className="text-center">
                    <svg
                      className="w-10 h-10 text-gray-400 mb-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 16v-1a4 4 0 014-4h1m4 0h1a4 4 0 014 4v1m-4-5l-4-4m0 0l-4 4m4-4v12"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm">Upload an image</p>
                    <p className="text-gray-400 text-xs">Maximum size: 10MB</p>
                  </div>
                ) : (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded border border-gray-300"
                  />
                )}
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
        </div>

        {/* Status Dropdown */}
        <div className="relative w-full md:w-1/4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-gray-600 text-sm">
            Status
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-8 space-x-4">
        <button className="px-6 py-2 border border-gray-300 rounded-full text-gray-600">Cancel</button>
        <button className="px-6 py-2 bg-purple-700 text-white rounded-full">Save</button>
      </div>
    </div>
  );
};

export default EditCategory;
