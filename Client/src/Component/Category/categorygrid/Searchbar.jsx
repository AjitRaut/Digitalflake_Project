import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ setSearchTerm }) => {
  return (
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
    </div>
  );
};

export default SearchBar;
