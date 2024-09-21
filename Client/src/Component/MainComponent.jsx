import React from "react";
import dflakelogo from "../assets/digitalflakelogo.png";

function MainContent() {
  return (
    <div className="flex justify-center items-center h-[85vh]">
      <div className="text-center p-10">
        <img
          src={dflakelogo}
          alt="Digitalflake Logo"
          className="mx-auto mb-3"
          style={{ width: "150px" }}
        />
        <h1 className="text-2xl font-semibold">Welcome to Digitalflake admin</h1>
      </div>
    </div>
  );
}

export default MainContent;
