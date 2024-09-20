import React, { useState } from "react";
import logo from "../assets/digitalflakelogo.png"; // Add your logo file path
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Digitalflake Logo" className="h-16" />
          <h2 className="text-xl font-normal text-gray-500 text-center mb-4">
            Welcome to Digitalflake admin
          </h2>
        </div>

        <form className="mt-6">
          <div className="mb-4 relative">
            <label
              className="absolute -top-3 left-3 bg-white px-1 text-gray-700 text-sm"
              htmlFor="email"
            >
              Email-id
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 pt-4 pb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6 relative">
            <label
              className="absolute -top-3 left-3 bg-white px-1 text-gray-700 text-sm"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 pt-4 pb-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-5 text-gray-600"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          <div className="flex justify-end mb-4">
            <a
              href="#"
              className="text-purple-950 hover:text-purple-950 text-sm text-right"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-950 hover:bg-purple-950 text-white font-bold py-2 px-4 rounded-md"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
