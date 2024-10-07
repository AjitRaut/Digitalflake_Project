import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditSubcategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subcategoryName, setSubcategoryName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState("active");
  const [categories, setCategories] = useState([]);
  const [categoryMongoId, setCategoryMongoId] = useState(null);

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/subcategories/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch subcategory");
        const data = await response.json();
        setSubcategoryName(data.subcatname);
        setCategory(data.categoryName); // Assuming this is the correct field from your API
        setImage(data.image);
        setStatus(data.status);
        setCategoryMongoId(data._id);
      } catch (error) {
        console.error("Error fetching subcategory:", error);
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
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      }
    };

    fetchSubcategory();
    fetchCategories();
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image (JPEG, PNG, or GIF).");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast.error("File size exceeds 10MB. Please upload a smaller image.");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subcatname", subcategoryName);
    formData.append("status", status);
    formData.append("categoryName", category); // Ensure category is included
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
        throw new Error(errorData.message || "Failed to update subcategory");
      }
      const data = await response.json();
      console.log(data);
      toast.success("Subcategory updated successfully!");
      navigate("/subcategory");
    } catch (error) {
      console.error("Error updating subcategory:", error);
      toast.error(
        error.message || "Error updating subcategory. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow overflow-hidden sm:rounded-lg p-6"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subcategory Name
                </label>
                <input
                  type="text"
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter subcategory name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Select a Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <div className="mt-1 flex items-center">
                  {image ? (
                    <img
                      src={image}
                      alt="Subcategory"
                      className="h-32 w-32 object-cover rounded-md"
                    />
                  ) : (
                    <div className="h-32 w-32 border-2 border-gray-300 border-dashed rounded-md flex items-center justify-center text-gray-400">
                      {/* Placeholder for image */}
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/subcategory")}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditSubcategory;
