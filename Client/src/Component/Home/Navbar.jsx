import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../App/Authslice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout()); // Dispatch the logout action
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <nav className="bg-customPurple p-4 text-white flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <div className="flex items-center">
        <img
          className="h-auto w-24 sm:w-28 md:w-32 cursor-pointer lg:w-40"
          src="/images/digitalflake.png"
          alt="Digital Flake Logo"
        />
      </div>

      <div className="flex items-center">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-white hover:text-gray-300"
          title="Logout"
        >
          <img
            className="h-auto w-8 sm:w-10 md:w-12 lg:w-10"
            src="/images/userlogo.png"
            alt="User Profile"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
