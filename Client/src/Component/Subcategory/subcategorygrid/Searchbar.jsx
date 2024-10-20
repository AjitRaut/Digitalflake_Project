// components/SearchBar.js
import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
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
  );
};

export default SearchBar;
