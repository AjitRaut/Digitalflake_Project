// components/SubcategoryGrid.js
import React, { useEffect, useState, useMemo } from "react";
import useGetSubcategories from "../../../hooks/useGetSubcategories";
import Header from "./Header";
import SubcategoryTable from "./Subcategorytable"; 
import DeleteModal from "./Deletemodel";
import Shimmerui from "../Shimmerui";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";

const SubcategoryGrid = () => {
  const { subcategories, loading } = useGetSubcategories();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filteredSubcategories, setFilteredSubcategories] =
    useState(subcategories); // Local state for filtered subcategories

  useEffect(() => {
    // Update filtered subcategories whenever subcategories or search term changes
    const newFilteredSubcategories = subcategories.filter(
      (subcategory) =>
        subcategory.subcatname &&
        subcategory.subcatname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubcategories(newFilteredSubcategories);
  }, [subcategories, searchTerm]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "SubCategory Name",
        accessor: "subcatname",
      },
      {
        Header: "Category Name",
        accessor: "categoryName",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ value }) => (
          <div className="flex justify-center items-center">
            <img src={value} alt="Product" className="w-10 h-10" />
          </div>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={value === "active" ? "text-green-500" : "text-red-500"}
          >
            {value === "active" ? "Active" : "Inactive"}
          </span>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="flex justify-center">
            <Link to={`/app/editsubcategory/${row.original._id}`}>
              <button className="mr-2 text-gray-500">
                <FiEdit />
              </button>
            </Link>
            <button
              className="text-gray-500"
              onClick={() => {
                setDeleteId(row.original._id);
                setShowDeleteModal(true);
              }}
            >
              <RiDeleteBin5Line />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axios.delete(
          `http://localhost:5000/api/subcategories/${deleteId}`
        );
        toast.success("Subcategory deleted successfully");

        setFilteredSubcategories((prev) =>
          prev.filter((subcategory) => subcategory._id !== deleteId)
        );

        setShowDeleteModal(false);
        setDeleteId(null);
      } catch (error) {
        toast.error("Error deleting subcategory");
      }
    }
  };

  return (
    <div className="p-4">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SubcategoryTable data={filteredSubcategories} columns={columns} loading={loading} />
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default SubcategoryGrid;
