import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditSubcategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subcategoryName, setSubcategoryName] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryMongoId, setCategoryMongoId] = useState(null);

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/subcategories/${id}`);
        if (!response.ok) throw new Error("Failed to fetch subcategory");
        const data = await response.json();
        setSubcategoryName(data.subcatname);
        setImage(data.image);
        setImageFile(null); // Reset image file
        setSelectedCategory(data.categoryName); // Updated to use categoryName
        setCategoryMongoId(data._id);
        setStatus(data.status);
      } catch (error) {
        toast.error("Error fetching subcategory details");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        toast.error("Error fetching categories");
      }
    };

    fetchSubcategory();
    fetchCategories();
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subcatname", subcategoryName);
    formData.append("categoryName", selectedCategory); // Use categoryName
    formData.append("status", status);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/subcategories/${categoryMongoId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Error updating subcategory.");
        return;
      }

      toast.success("Subcategory updated successfully!");
      navigate("/app/subcategory");
    } catch (error) {
      toast.error("Error updating subcategory. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 pb-24 md:pb-1">
      <div className="bg-white mt-9 px-4 sm:p-6 shadow-lg rounded-lg max-w-5xl mx-auto w-full">
        <h2 className="text-xl font-semibold mb-6 sm:mb-8 text-center md:text-left">
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
              {categories.map((category) => (
                <option key={category._id} value={category.name}> {/* Changed to use category name */}
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col gap-2 md:flex-row items-center sm:items-center">
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="w-28 h-36 object-cover mb-2 sm:mb-0 sm:mr-4"
              />
            ) : (
              <div className="w-28 h-36 bg-gray-200 mb-2 sm:mb-0 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            <div className="text-center flex-1">
              <label
                htmlFor="file-input"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-40 h-40 sm:w-48 sm:h-48 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center hover:border-purple-500 transition-colors">
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
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/app/subcategory">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-full text-gray-600"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-purple-700 text-white rounded-full"
          >
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default EditSubcategory;
