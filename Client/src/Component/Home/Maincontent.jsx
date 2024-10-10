// src/Component/MainContent.jsx
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "../../App/Authslice"; // Adjust the path as necessary
import Sidebar from "./Sidebar";

const MainContent = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn)
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    if (loggedInStatus) {
      dispatch(login()); // Set Redux state if user is logged in
    }
  }, [dispatch]);

  return (
    <div className="container flex">
      {isLoggedIn ? (
        <>
          <Sidebar />
          <div className="ml-52 mt-20 flex-grow">
            <Outlet />
          </div>
        </>
      ) : (
        <div className="mt-16 flex-grow">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MainContent;
