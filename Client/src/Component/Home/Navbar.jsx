import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/Authslice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      navigate("/login");
    }
  };

  const isLoggedIn = !!localStorage.getItem("token");
  const username = localStorage.getItem("username");
 
  return (
    <nav className="bg-customPurple p-2 sm:p-4 text-white flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to="/app/home">
          <img
            className="h-auto w-20 sm:w-28 md:w-32 cursor-pointer lg:w-40"
            src="/images/digitalflake.png"
            alt="Digital Flake Logo"
          />
        </Link>
      </div>

      {/* Links Section */}
      <div className="items-center space-x-4 ">
        {isLoggedIn ? (
          <>
            {/* Username Display */}
            <span className="text-white font-semibold text-sm sm:text-base">{username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 sm:px-4 rounded transition duration-200 text-xs sm:text-sm"
              title="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-2 sm:px-4 rounded transition duration-200 text-xs sm:text-sm">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
