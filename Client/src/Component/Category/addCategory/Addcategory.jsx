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
        const response = await axios.get(
          "https://digitalflake-project.onrender.com/api/categories"
        );
        setExistingCategories(response.data);
      } catch (error) {
        toast.error("Error fetching existing categories.");
      }
    };

    fetchExistingCategories();
  }, []);

  const handleSubmit = async (formData) => {
    const categoryName = formData.get("name");

    const categoryExists = existingCategories.some(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (categoryExists) {
      toast.error("Category name already exists.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://digitalflake-project.onrender.com/api/categories", formData);
      navigate("/app/category");
    } catch (error) {
      toast.error("Error adding category. Please try again.");
    } finally {
      setLoading(false); 
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
