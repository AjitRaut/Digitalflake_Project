import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { BiSearch } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import ShimmerUI from "./Shimmerui";
import subcategoryicon from "../../assets/list.png";
import sortIcon from "../../assets/sort.png";
import { toast } from "react-toastify";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const SubcategoryGrid = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
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
      toast.error("Error fetching categories",);
    }
  };

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

  const filteredSubcategories = useMemo(() => {
    return subcategories.filter(
      (subcategory) =>
        subcategory.subcatname &&
        subcategory.subcatname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [subcategories, searchTerm]);

  const getCategoryName = (subcategory) => {
    return subcategory.categoryName|| "Unknown";
  };

  const data = useMemo(() => {
    return filteredSubcategories.map((subcategory) => ({
      ...subcategory,
      categoryName: getCategoryName(subcategory),
    }));
  }, [filteredSubcategories]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axios.delete(
          `http://localhost:5000/api/subcategories/${deleteId}`
        );
        setSubcategories((prevSubcategories) =>
          prevSubcategories.filter(
            (subcategory) => subcategory._id !== deleteId
          )
        );
        setShowDeleteModal(false);
        fetchSubcategories();
      } catch (error) {
        toast.error("Error deleting subcategory");
      }
    }
  };

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
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-2">
          <img src={subcategoryicon} alt="subcategory" className="w-5 h-5" />
          <h1 className="text-2xl font-bold">SubCategory</h1>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <BiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 w-full p-2 pl-10 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <Link to="/app/addsubcategory">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition duration-200 w-full md:w-auto">
              Add New
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table
          className="min-w-full bg-white border border-gray-200"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-yellow-100 text-center"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="p-2 border text-center"
                  >
                    {column.render("Header")}
                    <span className="inline-block ml-1">
                      <img
                        src={sortIcon}
                        alt="sort"
                        className="w-3 h-3 inline"
                      />
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {loading ? (
              <ShimmerUI />
            ) : (
              <>
                {rows.length > 0 ? (
                  rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="border-b">
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className="p-2 border text-center"
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="p-2 text-center">
                      {searchTerm ? "No subcategories found." : "No subcategories available."}
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-xl max-w-sm w-full mx-2">
            <div className="flex items-center mb-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-500 mr-2" />
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
