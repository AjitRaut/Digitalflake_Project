import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { BiSearch } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

const SubcategoryGrid = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/subcategories");
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : "Phone"; // Default to "Unknown" if not found
  };

  const filteredSubcategories = useMemo(() => {
    return subcategories.filter((subcategory) =>
      subcategory.subcatname && 
      subcategory.subcatname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [subcategories, searchTerm]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axios.delete(`http://localhost:5000/api/subcategories/${deleteId}`);
        setSubcategories((prevSubcategories) =>
          prevSubcategories.filter((subcategory) => subcategory._id !== deleteId)
        );
        setShowDeleteModal(false);
      } catch (error) {
        console.error("Error deleting subcategory:", error);
      }
    }
  };

  const data = useMemo(() => {
    return filteredSubcategories.map((subcategory) => ({
      ...subcategory,
      categoryName: getCategoryName(subcategory.categoryId), // Get the category name using the helper function
    }));
  }, [filteredSubcategories, categories]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Subcategory Name",
        accessor: "subcatname",
      },
      {
        Header: "Category Name",
        accessor: "categoryName", // Use the new accessor
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ value }) => (
          <img src={value} alt="Subcategory" className="w-10 h-10" />
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span className={value === "active" ? "text-green-500" : "text-red-500"}>
            {value === "active" ? "Active" : "Inactive"}
          </span>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div>
            <Link to={`/editsubcategory/${row.original._id}`}>
              <button className="mr-2 text-gray-500">
                <FiEdit />
              </button>
            </Link>
            <button
              className="text-gray-500"
              onClick={() => handleDelete(row.original._id)}
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Subcategory</h1>
        <div className="flex items-center">
          <div className="relative">
            <BiSearch className="absolute left-3 top-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <Link to="/addsubcategory">
            <button className="bg-purple-700 text-white px-4 py-2 rounded ml-4">
              Add New
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-yellow-100">
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="p-2 border">
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-2 border">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-xl">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-red-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              <h3 className="text-lg font-semibold">Delete</h3>
            </div>
            <p className="mb-4 text-gray-600">
              Are you sure you want to delete?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-md"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubcategoryGrid;
