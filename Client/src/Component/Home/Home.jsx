import React from 'react';
import dflakelogo from "../../assets/digitalflakelogo.png";

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center h-[85vh] p-4">
        <div className="text-center p-6 sm:p-10">
          <img
            src={dflakelogo}
            alt="Digitalflake Logo"
            className="mx-auto mb-5"
            style={{ width: "150px" }}
          />
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            Welcome to Digitalflake Admin
          </h1>
        </div>
      </div>
    </>
  );
}

export default Home;
