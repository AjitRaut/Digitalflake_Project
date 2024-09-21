import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="bg-gray-100 min-h-[85vh] max-w-64 p-6">
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/home" className="flex items-center text-lg">
              <span className="mr-2">🏠</span>
              Home
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/category" className="flex items-center text-lg">
              <span className="mr-2">📂</span>
              Category
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/subcategory" className="flex items-center text-lg">
              <span className="mr-2">📋</span>
              Subcategory
            </Link>
          </li>
          <li>
            <Link to="/products" className="flex items-center text-lg">
              <span className="mr-2">📦</span>
              Products
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
