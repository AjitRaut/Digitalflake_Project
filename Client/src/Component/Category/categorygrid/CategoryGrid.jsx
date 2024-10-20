import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import categoryIcon from "../../../assets/group.png";
import DeleteModal from "./DeleteModel"; 
import SearchBar from "./SearchBar"; 
import CategoryTable from "./CategoryTable"; 
import useCategories from "../../../hooks/useCategories";

const CategoryGrid = () => {
  const {categories,loading,showDeleteModal,setShowDeleteModal,setDeleteId,fetchCategories,confirmDelete,} = useCategories();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const data = useMemo(() => filteredCategories, [filteredCategories]);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Category Name",
        accessor: "name",
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
            <Link to={`/app/editcategory/${row.original._id}`}>
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <img src={categoryIcon} alt="category" className="w-5 h-5" />
          <h1 className="text-xl md:text-2xl font-bold">Category</h1>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <SearchBar setSearchTerm={setSearchTerm} />
          <Link to="/app/addcategory">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition duration-200 w-full md:w-auto">
              Add New
            </button>
          </Link>
        </div>
      </div>

      <CategoryTable
        loading={loading}
        getTableProps={getTableProps}
        getTableBodyProps={getTableBodyProps}
        headerGroups={headerGroups}
        rows={rows}
        prepareRow={prepareRow}
        columns={columns}
        filteredCategories={filteredCategories}
        searchTerm={searchTerm}
      />
      <DeleteModal showDeleteModal={showDeleteModal}  setShowDeleteModal={setShowDeleteModal} confirmDelete={confirmDelete}/>
    </div>
  );
};

export default CategoryGrid;