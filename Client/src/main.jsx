import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
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
    element: <Navigate to="/login" />, // Redirect to home or login based on auth logic
  },

  {
    path: "/",
    element: <App />,
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={AppRouter} />
);
