import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", categoryName);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        body: formData,
      });

      if (response.status === 400) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return;
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      toast.success("Category added successfully!");

      setCategoryName("");
      setImage(null);
      setImageFile(null);
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Error adding category. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 shadow-lg rounded-lg max-w-5xl mx-auto mt-10">
          <h2 className="text-xl font-semibold mb-8">Add Category</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category Name Input */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter category name"
              />
            </div>

            {/* Image Upload with Design */}
            <div className="col-span-1 flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <label htmlFor="file-input" className="cursor-pointer">
                <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center hover:border-purple-500 transition-colors">
                  <svg
                    className="w-12 h-12 text-gray-400 mb-2"
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
                  <p className="text-gray-400 text-xs mt-1">
                    Maximum size: 10MB
                  </p>
                </div>
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Uploaded Image Preview Below */}
              {image && (
                <div className="mt-4">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-24 h-24 object-cover rounded border border-gray-300"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-end mt-8 space-y-4 md:space-y-0 md:space-x-4">
            <Link to={"/category"}>
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
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddCategory;
