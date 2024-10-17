// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-75 z-50">
      <div className="loader-dual-ring" aria-live="polite" aria-busy="true"></div>
      <p className="text-white mt-4 text-lg">Please wait, loading...</p>
      <style jsx>{`
        .loader-dual-ring {
          display: inline-block;
          width: 64px;
          height: 64px;
        }
        .loader-dual-ring:after {
          content: " ";
          display: block;
          width: 48px;
          height: 48px;
          margin: 8px;
          border-radius: 50%;
          border: 6px solid #00BFFF;
          border-color: #00BFFF transparent #00BFFF transparent;
          animation: dual-ring-spin 1.2s linear infinite;
        }
        @keyframes dual-ring-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
