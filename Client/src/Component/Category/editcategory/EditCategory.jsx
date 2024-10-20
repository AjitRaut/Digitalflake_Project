import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loader from "../../Loader/Loader";
import EditCategoryForm from "./EditCategoryForm";

const EditCategory = () => {
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);
  const [existingCategories, setExistingCategories] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories/${id}`);
        setInitialData(response.data);
      } catch (error) {
        toast.error("Error fetching category details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchExistingCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/categories`);
        setExistingCategories(response.data); 
      } catch (error) {
        toast.error("Error fetching existing categories.");
      }
    };

    fetchCategory();
    fetchExistingCategories();
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true); 
    try {
      await axios.put(`http://localhost:5000/api/categories/${id}`, formData);
      toast.success("Category updated successfully!");
      navigate("/app/category");
    } catch (error) {
      toast.error("Error updating category. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : initialData ? (
        <EditCategoryForm
          onSubmit={handleSubmit}
          initialData={initialData}
          existingCategories={existingCategories}
        />
      ) : (
        <div className="flex justify-center items-center">
        <p>No category data found.</p>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default EditCategory;
