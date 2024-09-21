import React from "react";
import { Link } from "react-router-dom";
import home from "../assets/home.png";
import category from "../assets/group.png";
import list from "../assets/list.png";
import product from "../assets/product.png";
import { VscTriangleRight } from "react-icons/vsc";

function Sidebar() {
  return (
    <aside className="bg-gray-100 min-h-[85vh] max-w-64 p-6">
      <nav>
        <ul>
          <li className="mb-6 flex items-center">
            <Link to="/home" className="flex items-center text-lg w-full">
              <img src={home} alt="home" className="w-5 h-5 mr-2" />
              <span className="flex-grow">Home</span>
              <VscTriangleRight className="ml-2" style={{ marginLeft: "10px" }} />
            </Link>
          </li>
          <li className="mb-6 flex items-center">
            <Link to="/category" className="flex items-center text-lg w-full">
              <img src={category} alt="category" className="w-5 h-5 mr-2" />
              <span className="flex-grow">Category</span>
              <VscTriangleRight className="ml-2" style={{ marginLeft: "10px" }} />
            </Link>
          </li>
          <li className="mb-6 flex items-center">
            <Link to="/subcategory" className="flex items-center text-lg w-full">
              <img src={list} alt="subcategory" className="w-5 h-5 mr-2" />
              <span className="flex-grow">Subcategory</span>
              <VscTriangleRight className="ml-2" style={{ marginLeft: "10px" }} />
            </Link>
          </li>
          <li className="flex items-center">
            <Link to="/products" className="flex items-center text-lg w-full">
              <img src={product} alt="products" className="w-5 h-5 mr-2" />
              <span className="flex-grow">Products</span>
              <VscTriangleRight className="ml-2" style={{ marginLeft: "10px" }} />
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
