import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronDown, FaUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        console.log(data);
        setProductName(data.name);
        setSubcategory(data.subcategoryId.subcatname
        );
        setCategory(data.categoryId.name);
        setStatus(data.categoryId.status);
        setImage(data.categoryId.image);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error fetching product details");
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
    formData.append("name", productName);
    formData.append("subcategory", subcategory);
    formData.append("category", category);
    formData.append("status", status);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      const data = await response.json();
      console.log(data);
      toast.success("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.message || "Error updating product. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-6">
        <FaChevronLeft className="w-5 h-5 mr-2" />
        <h1 className="text-xl font-semibold">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
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
            <label
              htmlFor="subcategory"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subcategory
            </label>
            <input
              type="text"
              id="subcategory"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                className="w-full p-2 border border-gray-300 rounded-md appearance-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select category</option>
                {/* Add your category options here */}
              </select>
              <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <div className="relative">
              <select
                id="status"
                className="w-full p-2 border border-gray-300 rounded-md appearance-none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <div className="border border-dashed border-gray-300 rounded-md p-4">
              <div className="flex items-center justify-center">
                {image ? (
                  <img
                    src={image}
                    alt="Product"
                    className="w-24 h-28 object-cover mr-4"
                  />
                ) : (
                  <div className="w-24 h-28 bg-gray-200 mr-4 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                <div className="text-center">
                  <label htmlFor="file-input" className="cursor-pointer">
                    <FaUpload className="mx-auto w-8 h-8 text-gray-400" />
                    <p className="text-xs text-gray-500 mt-1">
                      Upload Maximum allowed file size is 10MB
                    </p>
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
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-700 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditProduct;
