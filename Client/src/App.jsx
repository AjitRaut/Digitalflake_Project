import React from "react";
import {createBrowserRouter,Navigate,RouterProvider}from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Login from "./Component/Auth/login/Login.jsx";
import Register from "./Component/Auth/register/Register.jsx";
import Home from "./Component/Home/Home.jsx";
import AppLayout from "./Component/Home/AppLayout.jsx";
import Category from "./Component/Category/category/Category.jsx";
import AddCategory from "./Component/Category/addCategory/Addcategory.jsx";
import EditCategory from "./Component/Category/editcategory/EditCategory.jsx";
import Subcategory from "./Component/Subcategory/subcategory/Subcategory.jsx";
import AddSubcategory from "./Component/Subcategory/addsubcategory/AddSubcategory.jsx";
import EditSubcategory from "./Component/Subcategory/editsubcategory/EditSubcategory.jsx";
import Product from "./Component/Products/product/Product.jsx";
import AddProduct from "./Component/Products/addproduct/AddProduct.jsx";
import EditProduct from "./Component/Products/editproduct/EditProduct.jsx";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: (
      <Provider store={store}>
        <Login />
      </Provider>
    ),
  },
  {
    path: "/register",
    element: (
      <Provider store={store}>
        <Register />
      </Provider>
    ),
  },
  {
    path: "/app",
    element: (
      <Provider store={store}>
        <AppLayout />
      </Provider>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "addcategory",
        element: <AddCategory />,
      },
      {
        path: "editcategory/:id",
        element: <EditCategory />,
      },
      {
        path: "subcategory",
        element: <Subcategory />,
      },
      {
        path: "addsubcategory",
        element: <AddSubcategory />,
      },
      {
        path: "editsubcategory/:id",
        element: <EditSubcategory />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "editproduct/:id",
        element: <EditProduct />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={AppRouter} />;
}

export default App;