import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../Loader/Loader";
import EditProductForm from "./EditProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProductData(response.data);
      } catch (error) {
        toast.error("Error fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        toast.error("Error fetching categories.");
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/subcategories"
        );
        setSubcategories(response.data);
      } catch (error) {
        toast.error("Error fetching subcategories.");
      }
    };

    fetchProductData();
    fetchCategories();
    fetchSubcategories();
  }, [id]);

  const handleUpdateProduct = async (formData) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData);
      toast.success("Product updated successfully!");
      navigate("/app/products");
    } catch (error) {
      toast.error("Error updating product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <EditProductForm
          initialData={productData}
          categories={categories}
          subcategories={subcategories}
          onSubmit={handleUpdateProduct}
        />
      )}
    </>
  );
};

export default EditProduct;