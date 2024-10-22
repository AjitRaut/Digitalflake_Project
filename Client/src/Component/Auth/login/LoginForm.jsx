import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={(e) => handleLogin(e, email, password)} className="mt-6">
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-5 text-gray-600"
        >
          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </button>
      </div>

      <div className="flex justify-center mb-4 flex-col sm:flex-row">
        <p className="text-sm text-gray-600">Don't have an account? </p>
        <Link
          to={"/register"}
          className="text-purple-950 hover:text-purple-700 text-sm mt-1 sm:mt-0 sm:ml-1"
        >
          Sign Up
        </Link>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-950 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;