import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { BiSearch } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import ShimmerUI from "./Shimmerui";
import producticon from "../../assets/product.png";
import sortIcon from "../../assets/sort.png";
import { toast } from "react-toastify";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching products");
        setLoading(false);
      });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => 
      product.productName && 
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);
  

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${deleteId}`);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== deleteId)
        );
        setShowDeleteModal(false);
        fetchProducts();
      } catch (error) {
        toast.error("Error deleting product");
      }
    }
  };

  const data = useMemo(() => filteredProducts, [filteredProducts]);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Product Name",
        accessor: "productName",
      },
      {
        Header: "Category Name",
        accessor: "categoryName",
        Cell: ({ value }) => value || "Unknown",
      },
      {
        Header: "SubCategory Name",
        accessor: "subcategoryName" ,
        Cell: ({ value }) => value || "Unknown",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ value }) => (
          <div className="flex justify-center items-center">
            <img src={value} alt="Product" className="w-10 h-10 object-cover" />
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
          <div>
            <Link to={`/app/editproduct/${row.original._id}`}>
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <img src={producticon} alt="category" className="w-5 h-5" />
          <h1 className="text-xl md:text-2xl font-bold">Products</h1>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <BiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 w-full md:w-80 p-2 pl-10 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <Link to="/app/addproduct">
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
                    className="p-2 border text-center sm:text-center"
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
          {loading ? (
            <ShimmerUI />
          ) : (
            <tbody {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="border-b">
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="p-2 border text-center sm:text-center"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center p-4">
                    {searchTerm ? "Product not found" : "Products is empty"}
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-xl w-11/12 sm:w-96">
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

export default ProductGrid;
