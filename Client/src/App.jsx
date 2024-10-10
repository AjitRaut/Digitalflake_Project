import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./App/store";
import Navbar from "./Component/Home/Navbar";
import MainContent from "./Component/Home/Maincontent";
import Login from "./Component/Auth/Login.jsx";
import Register from "./Component/Auth/Register.jsx";
import CategoryGrid from "./Component/Category/CategoryGrid.jsx";
import AddCategory from "./Component/Category/AddCategory.jsx";
import Products from "./Component/Products/Products.jsx";
import EditCategory from "./Component/Category/EditCategory.jsx";
import SubCategoryGrid from "./Component/Subcategory/SubCategoryGrid.jsx";
import EditSubCategory from "./Component/Subcategory/Editsubcategory.jsx";
import AddSubCategory from "./Component/Subcategory/AddSubCategory.jsx";
import AddProduct from "./Component/Products/AddProduct.jsx";
import EditProduct from "./Component/Products/EditProduct.jsx";
import Home from "./Component/Home/Home.jsx";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/",
    element: (
      <Provider store={store}>
        <Navbar />
        <MainContent />
      </Provider>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "category",
        element: <CategoryGrid />,
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
        path: "products",
        element: <Products />,
      },
      {
        path: "subcategory",
        element: <SubCategoryGrid />,
      },
      {
        path: "addsubcategory",
        element: <AddSubCategory />,
      },
      {
        path: "editsubcategory/:id",
        element: <EditSubCategory />,
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
