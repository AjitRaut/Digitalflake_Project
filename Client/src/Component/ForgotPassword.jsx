import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Reset link sent successfully. Check your email.");
      } else {
        setMessage("Error: " + data.message);
      }
    } catch (error) {
      setMessage("Failed to send reset link. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">
          Did you forget password?
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Enter your email address and we’ll send you a link to restore your
          password.
        </p>

        {message && (
          <p className="text-center text-green-600 mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-800 hover:bg-purple-700 text-white py-3 rounded-md font-semibold"
          >
            Request reset link
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to={"/login"} className="text-sm text-gray-500 hover:underline">
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
