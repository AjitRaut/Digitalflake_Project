// ImageUploadSection.js
import React from "react";

const ImageUploadSection = ({ image, handleImageUpload, initialImage }) => {
  return (
    <div className="col-span-1 flex flex-col items-center">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Image
      </label>
      <label htmlFor="file-input" className="cursor-pointer">
        <div className="w-40 h-40 sm:w-48 sm:h-48 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center hover:border-purple-500 transition-colors">
          <p className="text-gray-500 text-sm">Upload an image</p>
          <p className="text-gray-400 text-xs mt-1">Maximum size: 10MB</p>
        </div>
      </label>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      {initialImage && !image && (
        <div className="mt-4">
          <img
            src={initialImage} 
            alt="Existing"
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded border border-gray-300"
          />
        </div>
      )}
      {image && (
        <div className="mt-4">
          <img
            src={image}
            alt="Uploaded"
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded border border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadSection;
