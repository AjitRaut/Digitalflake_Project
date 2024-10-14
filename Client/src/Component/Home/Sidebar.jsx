import React, { useState } from "react";
import { Link } from "react-router-dom";
import home from "../../assets/home.png";
import category from "../../assets/group.png";
import list from "../../assets/list.png";
import product from "../../assets/product.png";
import { VscTriangleRight } from "react-icons/vsc";

function Sidebar() {
  const [active, setActive] = useState("");

  const handleClick = (item) => {
    setActive(item);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed bottom-0 w-full lg:w-[200px] lg:top-16 lg:left-0 bg-gray-100 p-[17px] z-40 transition-transform transform
          lg:translate-x-0 lg:translate-y-0 lg:block
        `}
      >
        <nav className="lg:flex lg:flex-col">
          <ul className="lg:block flex justify-around">
            <li className="mb-6 flex items-center lg:mb-4">
              <Link
                to="/app/home"
                className={`flex items-center text-lg w-full justify-center lg:justify-start ${
                  active === "home" ? "bg-yellow-200" : ""
                }`}
                onClick={() => handleClick("home")}
              >
                <img src={home} alt="home" className="w-5 h-5 mr-0 lg:mr-2" />
                <span className="lg:flex-grow hidden lg:block">Home</span>
                <VscTriangleRight className="ml-2 hidden lg:block" />
              </Link>
            </li>
            <li className="mb-6 flex items-center lg:mb-4">
              <Link
                to="/app/category"
                className={`flex items-center text-lg w-full justify-center lg:justify-start ${
                  active === "category" ? "bg-yellow-200" : ""
                }`}
                onClick={() => handleClick("category")}
              >
                <img
                  src={category}
                  alt="category"
                  className="w-5 h-5 mr-0 lg:mr-2"
                />
                <span className="lg:flex-grow hidden lg:block">Category</span>
                <VscTriangleRight className="ml-2 hidden lg:block" />
              </Link>
            </li>
            <li className="mb-6 flex items-center lg:mb-4">
              <Link
                to="/app/subcategory"
                className={`flex items-center text-lg w-full justify-center lg:justify-start ${
                  active === "subcategory" ? "bg-yellow-200" : ""
                }`}
                onClick={() => handleClick("subcategory")}
              >
                <img src={list} alt="subcategory" className="w-5 h-5 mr-0 lg:mr-2" />
                <span className="lg:flex-grow hidden lg:block">Subcategory</span>
                <VscTriangleRight className="ml-2 hidden lg:block" />
              </Link>
            </li>
            <li className="mb-6 flex items-center lg:mb-4">
              <Link
                to="/app/products"
                className={`flex items-center text-lg w-full justify-center lg:justify-start ${
                  active === "products" ? "bg-yellow-200" : ""
                }`}
                onClick={() => handleClick("products")}
              >
                <img
                  src={product}
                  alt="products"
                  className="w-5 h-5 mr-0 lg:mr-2"
                />
                <span className="lg:flex-grow hidden lg:block">Products</span>
                <VscTriangleRight className="ml-2 hidden lg:block" />
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
