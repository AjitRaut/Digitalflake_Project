import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import RegisterForm from "./RegisterForm"; 

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("isRegistered", "true");
        navigate("/login");
      } else {
        if (data.message === "User already exists") {
          toast.error("User already exists");
        }
      }
    } catch (error) {
      toast.error("Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-normal text-gray-500 text-center mb-4">
          Welcome to Digitalflake admin
        </h2>
        <RegisterForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Register;