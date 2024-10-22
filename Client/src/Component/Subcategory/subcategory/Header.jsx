import React from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import subcategoryicon from "../../../assets/list.png";

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
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
            value={searchTerm}
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
  );
};

export default Header;
