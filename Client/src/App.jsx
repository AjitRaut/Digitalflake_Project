import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar";
import { Provider } from "react-redux";
import { store } from "./App/store";
import Sidebar from "./Component/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "./Features/Authslice";

const MainContent = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    if (loggedInStatus) {
      dispatch(login()); // Set Redux state if user is logged in
    }
  }, [dispatch]);

  return (
    <div className="container flex">
      {isLoggedIn && <Sidebar />} {/* Show Sidebar only if logged in */}
      <div className="ml-64 mt-16 flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <MainContent />
    </Provider>
  );
}

export default App;
