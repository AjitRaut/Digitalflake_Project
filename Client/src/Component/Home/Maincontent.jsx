import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "../../App/Authslice"; // Adjust the path as necessary
import Sidebar from "./Sidebar";

const MainContent = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    if (loggedInStatus) {
      dispatch(login()); 
    }
  }, [dispatch]);

  return (
    <div className="container flex">
      {isLoggedIn ? (
        <>
          {/* Sidebar will take full width on mobile and fixed width on larger screens */}
          <Sidebar />
          {/* On large screens, give margin-left to the content for sidebar spacing */}
          <div className="mt-20 flex-grow lg:ml-64 md:ml-0">
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
