import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader"; // Import the loader component

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState("inactive");
  const [loading, setLoading] = useState(false); // State to manage loading

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          `http://localhost:5000/api/categories/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }
        const data = await response.json();
        setCategoryName(data.name);
        setImage(data.image);
        setStatus(data.status);
      } catch (error) {
        toast.error("Error fetching category details");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCategory();
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    // Validate image type
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (file && !validTypes.includes(file.type)) {
      toast.error("Please upload a valid image (JPEG, PNG, or GIF).");
      return;
    }

    // Validate image size
    if (file && file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB. Please upload a smaller image.");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("status", status);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === "Category name already exists") {
          toast.error("Category name already exists. Please choose a different name.");
        } else {
          throw new Error(errorData.message || "Failed to update category");
        }
        return;
      }

      toast.success("Category updated successfully!");
      navigate("/app/category");
    } catch (error) {
      toast.error(error.message || "Error updating category. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      {loading && <Loader />} {/* Show loader if loading */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white md:p-[9px] pb-24 p-6 shadow-lg rounded-lg max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-8">Edit Category</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category Name Input */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
              <label htmlFor="file-input" className="cursor-pointer">
                <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center hover:border-purple-500 transition-colors">
                  <p className="text-gray-500 text-sm">Upload an image</p>
                  <p className="text-gray-400 text-xs mt-1">Maximum size: 10MB</p>
                </div>
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Uploaded Image Preview */}
              {image && (
                <div className="mt-4">
                  <img
                    src={image}
                    alt="Category"
                    className="w-24 h-24 object-cover rounded border border-gray-300"
                    onError={(e) => {
                      e.target.onerror = null; // Prevents infinite loop
                      e.target.src = "path_to_placeholder_image"; // Optional placeholder
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Status Selection */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-end mt-8 space-y-4 md:space-y-0 md:space-x-4 sticky bottom-0 bg-white py-4 px-6">
            <button
              type="button"
              onClick={() => navigate("/app/category")}
              className="px-6 py-2 border border-gray-300 rounded-full text-gray-600 w-full md:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-purple-700 text-white rounded-full w-full md:w-auto"
            >
              Save
            </button>
          </div>
        </div>
      </form>

      {/* Responsive Toastify Container */}
      <ToastContainer />
    </>
  );
};

export default EditCategory;
