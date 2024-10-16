import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loader from "../Loader/Loader"; // Import your Loader component

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [categoryName, setcategoryName] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProductName(data.productName);
        setSubcategoryName(data.subcategoryName);
        setcategoryName(data.categoryName);
        setStatus(data.status);
        setImage(data.image);
      } catch (error) {
        toast.error("Error fetching product details");
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (error) {
        toast.error("Error fetching categories");
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/subcategories`);
        setSubcategories(response.data);
      } catch (error) {
        toast.error("Error fetching subcategories");
      }
    };

    fetchProduct();
    fetchCategories();
    fetchSubcategories();
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
  
    // Validation: Ensure product name is provided
    if (!productName) {
      toast.error("Product name is required.");
      return;
    }
  
    try {
      // Fetch existing products to check for duplicates
      const response = await axios.get("http://localhost:5000/api/products");
      const productNames = response.data
        .filter(product => product._id !== id) // Exclude current product
        .map(product => product.productName.toLowerCase());
  
      if (productNames.includes(productName.toLowerCase())) {
        toast.error("Product name already exists.");
        return;
      }
  
      // Proceed with updating the product
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("subcategoryName", subcategoryName);
      formData.append("categoryName", categoryName);
      formData.append("status", status);
      if (imageFile) {
        formData.append("image", imageFile);
      }
  
      setLoading(true); // Start loading before API call
      const updateResponse = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });
  
      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.message || "Failed to update product");
      }
  
      toast.success("Product updated successfully!");
      navigate("/app/products");
    } catch (error) {
      toast.error(error.message || "Error updating product. Please try again.");
    } finally {
      setLoading(false); // Stop loading after the operation
    }
  };
  

  if (loading) {
    return <Loader />; // Show loader while fetching data
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm max-w-4xl mx-auto mt-4 md:mt-10 mb-20">
      <h1 className="text-xl font-semibold mb-4 md:mb-6 text-left">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="w-full p-2 border border-gray-300 rounded-md"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
              required
            >
              <option value="">Select subcategory</option>
              {subcategories.map((subcat) => (
                <option key={subcat._id} value={subcat.subcatname}>
                  {subcat.subcatname}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={categoryName}
              onChange={(e) => setcategoryName(e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
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
              className="w-full p-2 border border-gray-300 rounded-md"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col md:flex-row items-center">
              {image ? (
                <img src={image} alt="Product" className="w-24 h-28 object-cover mb-2 md:mb-0 md:mr-4" />
              ) : (
                <div className="w-24 h-28 bg-gray-200 mb-2 md:mb-0 md:mr-4 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <div className="text-center flex-1">
                <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center">
                  <p className="text-xs text-gray-500 mt-1">Upload Maximum allowed file size is 10MB</p>
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
        </div>

        <div className="flex justify-end mt-6 md:mt-8">
          <button
            type="button"
            onClick={() => navigate("/app/products")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
          >
            Update
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default EditProduct;
