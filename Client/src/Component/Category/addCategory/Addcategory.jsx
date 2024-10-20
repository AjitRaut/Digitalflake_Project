import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader/Loader";
import AddCategoryForm from "./AddCategoryForm";
import axios from "axios";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [existingCategories, setExistingCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExistingCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setExistingCategories(response.data); // Set existing categories from API
      } catch (error) {
        toast.error("Error fetching existing categories.");
      }
    };

    fetchExistingCategories();
  }, []);

  const handleSubmit = async (formData) => {
    const categoryName = formData.get("name");

    // Check if the category name already exists
    const categoryExists = existingCategories.some(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (categoryExists) {
      toast.error("Category name already exists.");
      return; // Stop further execution if the category name exists
    }

    setLoading(true); // Show loader when submitting
    try {
      await axios.post("http://localhost:5000/api/categories", formData);
      toast.success("Category added successfully!");
      navigate("/app/category");
    } catch (error) {
      const errorMessage =
        error.response?.status === 400
          ? error.response.data.message
          : "Error adding category. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Hide loader after submission
    }
  };

  return (
    <>
      {loading ? <Loader /> : <AddCategoryForm onSubmit={handleSubmit} />}
      <ToastContainer />
    </>
  );
};

export default AddCategory;
