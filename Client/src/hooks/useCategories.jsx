// src/hooks/useCategories.js
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      toast.error("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${deleteId}`);
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== deleteId)
        );
        setShowDeleteModal(false);
        fetchCategories();
        toast.success("Category deleted successfully");
      } catch (error) {
        toast.error("Error deleting category");
      }
    }
  };

  return {
    categories,
    loading,
    showDeleteModal,
    setShowDeleteModal,
    setDeleteId,
    fetchCategories,
    confirmDelete,
  };
};

export default useCategories;