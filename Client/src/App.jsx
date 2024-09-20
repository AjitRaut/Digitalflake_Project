import { Outlet } from "react-router-dom";
import "./App.css";
import Login from "./Component/Login";
import Navbar from "./Component/Navbar";

function App() {
  return <>
  <Navbar/>
  <Outlet/>
  </>;
}

export default App;
