// src/components/DeleteModal.js
import React from "react";

const DeleteModal = ({ showDeleteModal, setShowDeleteModal, confirmDelete }) => {
  if (!showDeleteModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <div className="flex items-center mb-4">
          <svg
            className="w-6 h-6 text-red-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
          <h3 className="text-lg font-semibold">Delete</h3>
        </div>
        <p className="mb-4 text-gray-600">
          Are you sure you want to delete?
        </p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-md"
            onClick={confirmDelete}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
