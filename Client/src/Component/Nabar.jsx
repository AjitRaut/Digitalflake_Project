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
    <nav className="bg-purple-950 p-4 text-white flex justify-between items-center">
    {/* Left Side: Brand/Logo */}
    <div className="flex items-center">
      <img 
        className="h-8 w-auto" 
        src="/images/digitalflake.png" 
        alt="Digital Flake Logo" 
      />
    </div>

    {/* Right Side: User/Logout section */}
    <div className="flex items-center">
      <button 
        onClick={handleLogout} 
        className="flex items-center space-x-2 text-white hover:text-gray-300"
      >
        <img 
          className="h-8 w-8" 
          src="/images/userlogo.png" 
          alt="User Profile" 
        />
      </button>
    </div>
  </nav>
  );
};

export default Navbar;
