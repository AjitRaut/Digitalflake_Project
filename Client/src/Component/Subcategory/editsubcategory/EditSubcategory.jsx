import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader/Loader";
import EditSubcategoryForm from "./EditSubcategoryForm";
import axios from "axios";

const EditSubcategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchSubcategory = async () => {
      try {
        const response = await axios.get(
          `https://digitalflake-project.onrender.com/api/subcategories/${id}`
        );
        setInitialData(response.data);
      } catch (error) {
        toast.error("Error fetching subcategory details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://digitalflake-project.onrender.com/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        toast.error("Error fetching categories.");
      }
    };

    fetchSubcategory();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await axios.put(
        `https://digitalflake-project.onrender.com/api/subcategories/${id}`,
        formData
      );
      navigate("/app/subcategory");
    } catch (error) {
      toast.error("Error updating subcategory. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : initialData ? (
        <EditSubcategoryForm
          onSubmit={handleSubmit}
          initialData={initialData}
          categories={categories}
        />
      ) : (
        <div className="flex justify-center items-center">
          <p>No subcategory data found.</p>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default EditSubcategory;