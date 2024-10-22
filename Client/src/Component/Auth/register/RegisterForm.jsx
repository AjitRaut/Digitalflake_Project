import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa"; 

const RegisterForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-6 space-y-4">
          <div className="mb-4 relative">
            <label
              className="absolute -top-3 left-3 bg-white px-1 text-gray-700 text-sm"
              htmlFor="firstName"
            >
              First Name
            </label>
            <Field
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter your first name"
              className="w-full px-4 pt-4 pb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <ErrorMessage name="firstName" component="div" className="text-red-600 text-sm" />
          </div>
          <div className="mb-4 relative">
            <label
              className="absolute -top-3 left-3 bg-white px-1 text-gray-700 text-sm"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <Field
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter your last name"
              className="w-full px-4 pt-4 pb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <ErrorMessage name="lastName" component="div" className="text-red-600 text-sm" />
          </div>
          <div className="mb-4 relative">
            <label
              className="absolute -top-3 left-3 bg-white px-1 text-gray-700 text-sm"
              htmlFor="email"
            >
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 pt-4 pb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
          </div>
          <div className="mb-4 relative">
            <label
              className="absolute -top-3 left-3 bg-white px-1 text-gray-700 text-sm"
              htmlFor="password"
            >
              Password
            </label>
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 pt-4 pb-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-5 text-gray-600"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
            <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
          </div>
          <div className="mb-6 relative">
            <label
              className="absolute -top-3 left-3 bg-white px-1 text-gray-700 text-sm"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <Field
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-4 pt-4 pb-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-5 text-gray-600"
            >
              {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
            <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm" />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-950 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md"
            disabled={isSubmitting}
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;