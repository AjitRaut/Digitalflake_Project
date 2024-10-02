import { createBrowserRouter, RouterProvider , Navigate } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./Component/Login.jsx";
import ForgotPassword from "./Component/ForgotPassword.jsx";
import MainContent from "./Component/MainComponent.jsx";
import Register from "./Component/Register.jsx";
import CategoryGrid from "./Component/Category/CategoryGrid.jsx";
import AddCategory from "./Component/Category/AddCategory.jsx";
import Products from "./Component/Products/Products.jsx";
import EditCategory from "./Component/Category/Editcategory.jsx";
import SubCategoryGrid from "./Component/Subcategory/SubCategoryGrid.jsx";
import Editsubcategory from "./Component/Subcategory/Editsubcategory.jsx";
import Addsubcategory from "./Component/Subcategory/Addsubcategory.jsx";
import AddProduct from "./Component/Products/AddProduct.jsx";
import EditProduct from "./Component/Products/EditProduct.jsx";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/home",
        element: <MainContent />,
      },
      {
        path: "/category",
        element: <CategoryGrid />,
      },
      {
        path: "/addcategory",
        element: <AddCategory />,
      },
      {
        path: "/editcategory/:id",
        element: <EditCategory/>
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path : "Subcategory",
        element : <SubCategoryGrid/>
      },
      {
        path: "/addsubcategory",
        element: <Addsubcategory/>
      },
      {
        path: "/editsubcategory/:id",
        element:<Editsubcategory/>
      },
      {
        path:"/addproduct",
        element : <AddProduct/>
      },
      {
        path : "/editproduct/:id",
        element : <EditProduct/>
      },
      {
        path: "/", // Catch-all route for undefined paths
        element: <Navigate to="/login" />, // Redirect to login for undefined routes
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={AppRouter} />
);
