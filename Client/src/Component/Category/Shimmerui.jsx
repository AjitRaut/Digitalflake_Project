import React from 'react';

const Shimmerui = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="p-2 border">
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </td>
          <td className="p-2 border">
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </td>
          <td className="p-2 border">
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </td>
          <td className="p-2 border">
            <div className="h-10 bg-gray-300 rounded w-10"></div>
          </td>
          <td className="p-2 border">
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </td>
          <td className="p-2 border">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default Shimmerui;
