import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Editsubcategory = () => {
    const { id } = useParams(); // This will be the numeric id
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState("");
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [status, setStatus] = useState("inactive");
    const [categoryMongoId, setCategoryMongoId] = useState(null);
  
    useEffect(() => {
      const fetchCategory = async () => {
        try {
          // Use the numeric id to fetch the category
          const response = await fetch(`http://localhost:5000/api/categories/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch category");
          }
          const data = await response.json();
          setCategoryName(data.name);
          setImage(data.image);
          setStatus(data.status);
          setCategoryMongoId(data._id); // Store the MongoDB _id
        } catch (error) {
          console.error("Error fetching category:", error);
          toast.error("Error fetching category details");
        }
      };
  
      fetchCategory();
    }, [id]);
  
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      
      if (file) {
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(file.type)) {
          toast.error("Please upload a valid image (JPEG, PNG, or GIF).");
          return;
        }
    
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
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
      formData.append("name", categoryName);
      formData.append("status", status);
      if (imageFile) {
        formData.append("image", imageFile);
      }
  
      try {
        // Use the MongoDB _id for the update operation
        const response = await fetch(`http://localhost:5000/api/categories/${categoryMongoId}`, {
          method: "PUT",
          body: formData,
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update category");
        }
  
        const data = await response.json();
        console.log(data);
        toast.success("Category updated successfully!");
        navigate("/category");
      } catch (error) {
        console.error("Error updating category:", error);
        toast.error(error.message || "Error updating category. Please try again.");
      }
    };
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-6 shadow-lg rounded-lg max-w-5xl mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-8">Edit Category</h2>
  
            <div className="grid grid-cols-2 gap-8">
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
  
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <div className="flex flex-col items-center">
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
                </div>
  
                {image && (
                  <div className="mt-4">
                    <img
                      src={image}
                      alt="Category"
                      className="w-24 h-24 object-cover rounded border border-gray-300"
                    />
                  </div>
                )}
              </div>
            </div>
  
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
  
            <div className="flex justify-end mt-8 space-x-4">
              <button
                type="button"
                onClick={() => navigate("/category")}
                className="px-6 py-2 border border-gray-300 rounded-full text-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-700 text-white rounded-full"
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

export default Editsubcategory
