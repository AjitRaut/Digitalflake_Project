// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="loader" aria-live="polite" aria-busy="true"></div>
      <p className="text-white mt-4">Wait a moment...</p>
      <style jsx>{`
        .loader {
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-top: 8px solid #00BFFF; /* Change the color here */
          border-radius: 50%;
          width: 80px; /* Size of the loader */
          height: 80px; /* Size of the loader */
          animation: spin 0.8s linear infinite; /* Slightly faster spin */
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
