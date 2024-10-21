import React, { useMemo, useState } from "react";
import useProducts from "../../../hooks/useProducts";
import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";
import DeleteModal from "./DeleteModel";
import producticon from "../../../assets/product.png";
import { Link } from "react-router-dom";

const ProductGrid = () => {
  const { products, loading, deleteProduct, fetchProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await deleteProduct(deleteId);
      setShowDeleteModal(false);
      fetchProducts();
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.productName &&
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <img src={producticon} alt="category" className="w-5 h-5" />
          <h1 className="text-xl md:text-2xl font-bold">Products</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="flex justify-center md:w-auto">
            <Link to="/app/addproduct" className="w-full md:w-auto">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition duration-200 w-full md:w-auto">
                Add New
              </button>
            </Link>
          </div>
        </div>
      </div>

      <ProductTable
        products={filteredProducts}
        handleDelete={handleDelete}
        loading={loading}
      />
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default ProductGrid;