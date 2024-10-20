import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader/Loader";
import AddSubcategoryForm from "./AddSubcategoryForm";
import axios from "axios";

const AddSubcategory = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [existingSubcategories, setExistingSubcategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, subcategoriesResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/subcategories"),
        ]);
  
        setCategories(categoriesResponse.data);
        setExistingSubcategories(subcategoriesResponse.data);
      } catch (error) {
        toast.error("Error fetching categories or subcategories.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategoriesAndSubcategories();
  }, []);

  const handleSubmit = async (formData) => {
    const subcatname = formData.get("subcatname");
  
    const subcategoryExists = existingSubcategories.some(
      (subcategory) => subcategory.subcatname.toLowerCase() === subcatname.toLowerCase()
    );
  
    if (subcategoryExists) {
      toast.error("Subcategory name already exists.");
      return;
    }
  
    setLoading(true);
    try {
      // Debugging log to ensure formData has the correct data
      await axios.post("http://localhost:5000/api/subcategories", formData);
      toast.success("Subcategory added successfully!");
      navigate("/app/subcategory");
    } catch (error) {
      toast.error("Error adding subcategory. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      {loading ? <Loader /> : <AddSubcategoryForm onSubmit={handleSubmit} categories={categories} />}
      <ToastContainer />
    </>
  );
};

export default AddSubcategory;
