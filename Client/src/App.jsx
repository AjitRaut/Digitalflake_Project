import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Login from "./Component/Auth/Login.jsx";
import Register from "./Component/Auth/Register.jsx";
import Home from "./Component/Home/Home.jsx";
import AppLayout from "./Component/Home/AppLayout.jsx";
import AddCategory from "./Component/Category/AddCategory/Addcategory.jsx";
import EditCategory from "./Component/Category/editcategory/EditCategory.jsx";
import CategoryGrid from "./Component/Category/categorygrid/CategoryGrid.jsx";
import AddSubcategory from "./Component/Subcategory/addsubcategory/AddSubcategory.jsx";
import EditSubcategory from "./Component/Subcategory/editsubcategory/EditSubcategory.jsx";
import SubcategoryGrid from "./Component/Subcategory/subcategorygrid/Subcategory.jsx";
import AddProduct from "./Component/Products/addproduct/AddProduct.jsx";
import EditProduct from "./Component/Products/editproduct/EditProduct.jsx";
import ProductGrid from "./Component/Products/product/ProductGrid.jsx";

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
        path: "subcategory",
        element: <SubcategoryGrid />,
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
        element: <ProductGrid />,
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
