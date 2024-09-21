import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return categories.length === 0 ? (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Category</h1>
        <Link to="/addcategory">
          <button className="bg-purple-700 text-white px-4 py-2 rounded">
            Add New
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center h-[30vh]">
        <h1 className="text-2xl font-bold text-gray-600 bg-yellow-100 py-2 px-4 rounded-lg shadow-md">
          No Data Available
        </h1>
      </div>
    </div>
  ) : (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Category</h1>
        <Link to="/addcategory">
          <button className="bg-purple-700 text-white px-4 py-2 rounded">
            Add New
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-yellow-100">
              <th className="p-2 border">Id</th>
              <th className="p-2 border">Category Name</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              console.log(category.image); // Log the image URL
              return (
                <tr key={category.id} className="border-b">
                  <td className="p-2 border">{category.id}</td>
                  <td className="p-2 border">{category.name}</td>
                  <td className="p-2 border">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-10 h-10"
                    />
                  </td>
                  <td className="p-2 border">
                    {category.status === "active" ? (
                      <span className="text-green-500">Active</span>
                    ) : (
                      <span className="text-red-500">Inactive</span>
                    )}
                  </td>
                  <td className="p-2 border">
                    <Link to="/editcategory">
                      <button className="mr-2 text-blue-500">✏️</button>
                    </Link>
                    <button className="text-red-500">🗑️</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryGrid;
