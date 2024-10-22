import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as loginAction } from "../../../store/Authslice"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from "./LoginForm"; 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/app/home");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e, email, password) => {
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
          localStorage.setItem("username", `${data.firstName} ${data.lastName}`); 
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-normal text-gray-500 text-center mb-4">
          Welcome to Digitalflake admin
        </h2>
        <LoginForm handleLogin={handleLogin} /> 
      </div>
    </div>
  );
};

export default Login;