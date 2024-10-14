import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login as loginAction } from "../../App/Authslice"; // Update this import as per your file structure
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa"; // Import eye icons
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/app/home");
    }
  }, [isLoggedIn, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (isLoggedIn) return;
  
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", `${data.firstName} ${data.lastName}`); // Store username
          dispatch(loginAction());
          navigate("/app/home");
        } else {
          toast.error(data.message || "Login failed. Please try again.");
        }
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-normal text-gray-500 text-center mb-4">
          Welcome to Digitalflake admin
        </h2>
        <form onSubmit={handleLogin} className="mt-6">
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

          <div className="flex justify-center mb-4">
            <p className="text-sm text-gray-600">Don't have an account? </p>
            <Link
              to={"/register"}
              className="text-purple-950 hover:text-purple-700 text-sm ml-1"
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
      </div>
    </div>
  );
};

export default Login;
