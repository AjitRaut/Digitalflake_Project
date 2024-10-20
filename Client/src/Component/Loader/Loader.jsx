import React from 'react';

const Loader = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-80 z-50">
      <div className="loader-orb" aria-live="polite" aria-busy="true"></div>
      <p className="text-white mt-6 text-lg tracking-wide animate-pulse">
        Please wait, loading...
      </p>

      {/* Tailwind CSS styles for the loader orb */}
      <style>{`
        .loader-orb {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: radial-gradient(circle, #4fd1c5 0%, #2d3748 80%);
          box-shadow: 0 0 15px rgba(79, 209, 197, 0.5), 0 0 30px rgba(79, 209, 197, 0.3), 0 0 45px rgba(79, 209, 197, 0.2);
          animation: pulse 1.5s infinite ease-in-out, glow 1.5s infinite ease-in-out;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes glow {
          0% {
            box-shadow: 0 0 10px rgba(79, 209, 197, 0.5), 0 0 20px rgba(79, 209, 197, 0.4), 0 0 30px rgba(79, 209, 197, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(79, 209, 197, 0.8), 0 0 40px rgba(79, 209, 197, 0.6), 0 0 60px rgba(79, 209, 197, 0.4);
          }
          100% {
            box-shadow: 0 0 10px rgba(79, 209, 197, 0.5), 0 0 20px rgba(79, 209, 197, 0.4), 0 0 30px rgba(79, 209, 197, 0.3);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
