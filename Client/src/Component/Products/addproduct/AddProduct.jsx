import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loader from "../../Loader/Loader";
import AddProductForm from "./AddProductForm";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
    fetchCategories();
  }, []);

  useEffect(() => {
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
    fetchSubcategories();
  }, []);

  useEffect(() => {
    const filtered = subcategories.filter(
      (subcategory) => subcategory.categoryName === selectedCategory
    );
    setFilteredSubcategories(filtered);
    setSelectedSubcategory("");
  }, [selectedCategory, subcategories]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      const productNames = response.data.map((product) =>
        product.productName.toLowerCase()
      );

      if (productNames.includes(productName.toLowerCase())) {
        toast.error("Product name already exists.");
        setLoading(false);
        return;
      }

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added successfully!");
      navigate("/app/products");
    } catch (error) {
      toast.error("Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <AddProductForm
          productName={productName}
          setProductName={setProductName}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          subcategories={filteredSubcategories}
          selectedSubcategory={selectedSubcategory}
          setSelectedSubcategory={setSelectedSubcategory}
          imageFile={imageFile}
          setImageFile={setImageFile}
          onSubmit={handleSubmit}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default AddProduct;