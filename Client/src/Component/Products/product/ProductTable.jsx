import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import sortIcon from "../../../assets/Sort.png";
import ShimmerUI from "../Shimmerui";

const ProductTable = ({ products, handleDelete, loading }) => {
  const data = useMemo(() => products, [products]);

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
        accessor: "subcategoryName",
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
            <Link to={`/app/editproduct/${row.original._id}`}>
              <button className="mr-2 text-gray-500">
                <FiEdit />
              </button>
            </Link>
            <button className="text-gray-500" onClick={() => handleDelete(row.original._id)}>
              <RiDeleteBin5Line />
            </button>
          </div>
        ),
      },
    ],
    [handleDelete]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <div className="overflow-x-auto"> {/* Added scrollable container */}
      <table className="min-w-full bg-white border border-gray-200" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-yellow-100 text-center">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="p-2 border text-center sm:text-center"
                >
                  {column.render("Header")}
                  <span className="inline-block ml-1">
                    <img src={sortIcon} alt="sort" className="w-3 h-3 inline" />
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
                      <td {...cell.getCellProps()} className="p-2 border text-center sm:text-center">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-2 text-center">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ProductTable;
