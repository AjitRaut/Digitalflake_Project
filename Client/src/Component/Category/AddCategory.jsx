import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader"; // Make sure to import your Loader component

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
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
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setLoading(true); // Set loading to true before API call

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
      toast.success("Category added successfully!");
      navigate("/app/category");

      // Reset form
      setCategoryName("");
      setImage(null);
      setImageFile(null);
    } catch (error) {
      toast.error("Error adding category. Please try again.");
    } finally {
      setLoading(false); // Reset loading state in finally block
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {loading ? (
          <Loader /> // Use the Loader component
        ) : (
          <div className="bg-white lg:min-h-[85vh] md:min-h-screen p-6 pb-24 shadow-lg rounded-lg max-w-5xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-8">
              Add Category
            </h2>

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
            <div className="flex flex-col md:flex-row justify-end mt-8 space-y-4 md:space-y-0 md:space-x-4 sticky bottom-0 bg-white py-4 px-6 ">
              <Link to={"/app/category"}>
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
        )}
      </form>

      <ToastContainer />
    </>
  );
};

export default AddCategory;
