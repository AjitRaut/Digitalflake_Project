import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Loader/Loader";
import AddCategoryForm from "./AddCategoryForm";
import axios from "axios";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/categories",
        formData
      );

      toast.success("Category added successfully!");
      navigate("/app/category");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Error adding category. Please try again.");
        }
      } else {
        toast.error("Error adding category. Please try again.");
      }
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
