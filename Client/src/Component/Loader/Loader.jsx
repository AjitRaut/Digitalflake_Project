// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh] sm:min-h-[75vh] lg:min-h-[85vh]">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-top: 8px solid #00BFFF; /* Change the color here */
          border-radius: 50%;
          width: 80px; /* Size of the loader */
          height: 80px; /* Size of the loader */
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
