import React from "react";
import { useDispatch } from "react-redux";
// import { logout } from "../features/userSlice";
// import { useNavigate } from "react-router-dom";

const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(logout());
    localStorage.removeItem("token");
    // navigate("/login");
  };

  return (
    <nav className="bg-customPurple p-4 text-white flex justify-between items-center">
      <div className="flex items-center">
        <img 
          className="h-auto w-24 sm:w-28 md:w-32 lg:w-40" 
          src="/images/digitalflake.png" 
          alt="Digital Flake Logo" 
        />
      </div>

      <div className="flex items-center">
        <button 
          onClick={handleLogout} 
          className="flex items-center space-x-2 text-white hover:text-gray-300"
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
