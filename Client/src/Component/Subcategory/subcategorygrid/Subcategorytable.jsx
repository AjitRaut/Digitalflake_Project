// components/SubcategoryTable.js
import React from "react";
import { useTable, useSortBy } from "react-table";
import sortIcon from "../../../assets/sort.png";
import Shimmerui from "../Shimmerui"; // Import your Shimmer UI component

const SubcategoryTable = ({ data, columns, loading }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <div className="overflow-x-auto mb-16 md:mb-0">
    
        <table className="min-w-full bg-white border border-gray-200" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-yellow-100 text-center">
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="p-2 border text-center">
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
        <Shimmerui />
      ) : (
          <tbody {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="border-b">
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="p-2 border text-center">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-2 text-center">
                  No subcategories available.
                </td>
              </tr>
            )}
          </tbody>
      )}
        </table>
    </div>
  );
};

export default SubcategoryTable;
