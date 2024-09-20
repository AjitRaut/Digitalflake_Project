import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from "./Component/Login.jsx";
import ForgotPassword from "./Component/ForgotPassword.jsx";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element:<Login/>,
      },
      {
       path: "/login/forgotpassword",
       element:<ForgotPassword/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={AppRouter} />
);
