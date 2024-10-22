// hooks/useProducts.js
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://digitalflake-project.onrender.com/api/products");
      setProducts(response.data);
    } catch (error) {
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://digitalflake-project.onrender.com/api/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, fetchProducts, deleteProduct };
};

export default useProducts;