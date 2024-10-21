// hooks/useGetSubcategories.js
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useGetSubcategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/subcategories"
      );
      setSubcategories(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching subcategories");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  return { subcategories, loading , fetchSubcategories};
};

export default useGetSubcategories;
