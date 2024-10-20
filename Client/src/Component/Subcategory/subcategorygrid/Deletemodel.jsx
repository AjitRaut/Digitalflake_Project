// components/DeleteModal.js
import React from "react";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const DeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-sm w-full mx-2">
        <div className="flex items-center mb-4">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-500 mr-2" />
          <h3 className="text-lg font-semibold">Delete</h3>
        </div>
        <p className="mb-4 text-gray-600">Are you sure you want to delete?</p>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
