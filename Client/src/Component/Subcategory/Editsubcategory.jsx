import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from '../Loader/Loader'; // Import the Loader component

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
  const [loading, setLoading] = useState(false); // Loader state

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        setLoading(true); // Start loading
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
      } finally {
        setLoading(false); // End loading
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
    setLoading(true); // Show loader when submitting
  
    try {
      // Fetch all subcategories to check if the name already exists
      const response = await fetch("http://localhost:5000/api/subcategories");
      if (!response.ok) throw new Error("Failed to fetch subcategories");
  
      const subcategories = await response.json();
  
      // Simple check for duplicate subcategory name in subcategories
      const isDuplicate = subcategories.some(
        (subcategory) => subcategory.subcatname.toLowerCase() === subcategoryName.toLowerCase() && subcategory._id !== categoryMongoId
      );
  
      if (isDuplicate) {
        toast.error("Subcategory name already exists.");
        setLoading(false); // Hide loader and stop submission
        return;
      }
  
      // Continue with submission if no duplicate found
      const formData = new FormData();
      formData.append("subcatname", subcategoryName);
      formData.append("categoryName", selectedCategory); // Use categoryName
      formData.append("status", status);
  
      if (imageFile) {
        formData.append("image", imageFile);
      }
  
      const updateResponse = await fetch(
        `http://localhost:5000/api/subcategories/${categoryMongoId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
  
      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        toast.error(errorData.message || "Error updating subcategory.");
        return;
      }
  
      toast.success("Subcategory updated successfully!");
      navigate("/app/subcategory");
    } catch (error) {
      toast.error("Error updating subcategory. Please try again.");
    } finally {
      setLoading(false); // Hide loader after submission
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex-1 pb-24 md:pb-1">
      {loading ? (
        <Loader /> // Use the Loader component
      ) : (
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
                  <option key={category._id} value={category.name}>
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

          <div className="flex justify-end mt-6 md:mt-8">
            <Link to="/app/subcategory">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
            >
              Update
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </form>
  );
};

export default EditSubcategory;
